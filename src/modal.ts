/** Folder Manager Modal — bulk create/delete marker files with AI description generation */
import { type App, Modal, Notice, TFile } from "obsidian";
import { apiPost } from "./api";
import {
	type FolderEntry,
	getExistingMarkerContent,
	getFoldersWithMarker,
	getVaultFolders,
	scanFolders,
	syncFoldersToApi,
} from "./folders";
import { type PluginLang, t, tReplace } from "./i18n";
import type { AIChatClipSettings } from "./types";

type TabMode = "create" | "delete";

interface FolderState {
	selected: boolean;
	description: string;
	hasExisting: boolean;
}

export class FolderManagerModal extends Modal {
	private settings: AIChatClipSettings;
	private lang: PluginLang;
	private onComplete: () => Promise<void>;
	private mode: TabMode = "create";
	private folderStates = new Map<string, FolderState>();
	private deleteItems: { folderPath: string; markerPath: string; selected: boolean }[] = [];
	private descriptionLanguage = "auto";

	constructor(
		app: App,
		settings: AIChatClipSettings,
		lang: PluginLang,
		onComplete: () => Promise<void>,
	) {
		super(app);
		this.settings = settings;
		this.lang = lang;
		this.onComplete = onComplete;
	}

	async onOpen() {
		this.modalEl.addClass("aichatclip-folder-modal");
		await this.render();
	}

	onClose() {
		this.contentEl.empty();
	}

	private async render() {
		const { contentEl } = this;
		const l = this.lang;
		contentEl.empty();

		// Title
		contentEl.createEl("h2", { text: t("modal.title", l) });

		// Tab header
		const tabBar = contentEl.createDiv({ cls: "aichatclip-modal-tabs" });
		const createTab = tabBar.createEl("button", {
			text: t("modal.tabCreate", l),
			cls: `aichatclip-modal-tab${this.mode === "create" ? " is-active" : ""}`,
		});
		const deleteTab = tabBar.createEl("button", {
			text: t("modal.tabDelete", l),
			cls: `aichatclip-modal-tab${this.mode === "delete" ? " is-active" : ""}`,
		});

		createTab.addEventListener("click", () => {
			this.mode = "create";
			this.render();
		});
		deleteTab.addEventListener("click", () => {
			this.mode = "delete";
			this.render();
		});

		if (this.mode === "create") {
			await this.renderCreateMode(contentEl);
		} else {
			await this.renderDeleteMode(contentEl);
		}
	}

	private async renderCreateMode(container: HTMLElement) {
		const l = this.lang;
		const { scanRoot, markerFilename } = this.settings;
		const marker = markerFilename || "README";

		// Language dropdown
		const langRow = container.createDiv({ cls: "aichatclip-modal-actions" });
		const langLabel = langRow.createEl("label", { text: t("modal.descLanguage", l) });
		const langSelect = langLabel.createEl("select");
		for (const [val, label] of [
			["auto", t("lang.auto", l)],
			["en", "English"],
			["ja", "日本語"],
			["zh", "中文"],
			["ko", "한국어"],
			["es", "Español"],
			["fr", "Français"],
			["de", "Deutsch"],
		]) {
			const opt = langSelect.createEl("option", { text: label, value: val });
			if (val === this.descriptionLanguage) opt.selected = true;
		}
		langSelect.addEventListener("change", () => {
			this.descriptionLanguage = langSelect.value;
		});

		// Select all / deselect all
		const toolbar = container.createDiv({ cls: "aichatclip-modal-actions" });
		const selectAllBtn = toolbar.createEl("button", { text: t("modal.selectAll", l) });
		const deselectAllBtn = toolbar.createEl("button", { text: t("modal.deselectAll", l) });

		// Build folder list
		const folders = getVaultFolders(this.app, scanRoot);
		if (folders.length === 0) {
			container.createEl("p", {
				text: t("modal.noFolders", l),
				cls: "aichatclip-modal-empty",
			});
			return;
		}

		// Initialize states for folders not yet tracked
		for (const folder of folders) {
			if (!this.folderStates.has(folder.path)) {
				const existing = await getExistingMarkerContent(this.app, folder.path, marker);
				const folderTitle = folder.path.split("/").pop() ?? folder.path;
				const defaultDesc = `# ${folderTitle}\n\n`;
				this.folderStates.set(folder.path, {
					selected: existing !== null,
					description: existing ?? defaultDesc,
					hasExisting: existing !== null,
				});
			}
		}

		const listEl = container.createDiv({ cls: "aichatclip-folder-list" });

		for (const folder of folders) {
			const state = this.folderStates.get(folder.path)!;
			const item = listEl.createDiv({ cls: "aichatclip-folder-item" });

			// Checkbox + folder name
			const header = item.createDiv({ cls: "aichatclip-folder-item-header" });
			const checkbox = header.createEl("input", { type: "checkbox" }) as HTMLInputElement;
			checkbox.checked = state.selected;
			checkbox.addEventListener("change", () => {
				state.selected = checkbox.checked;
			});

			const label = header.createEl("span", { text: folder.path, cls: "aichatclip-folder-name" });
			if (state.hasExisting) {
				label.createEl("span", {
					text: t("modal.existingMarker", l),
					cls: "aichatclip-existing-badge",
				});
			}

			// Description textarea
			const textarea = item.createEl("textarea", {
				cls: "aichatclip-folder-desc",
				placeholder: t("modal.descPlaceholder", l),
			});
			textarea.value = state.description;
			textarea.rows = 5;
			textarea.addEventListener("input", () => {
				state.description = textarea.value;
				updateRefineBtn();
			});

			// Button row (AI生成 + AI校正)
			const btnRow = item.createDiv({ cls: "aichatclip-folder-btn-row" });
			const genBtn = btnRow.createEl("button", {
				text: t("modal.generate", l),
				cls: "aichatclip-generate-btn",
			});
			const refineBtn = btnRow.createEl("button", {
				text: t("modal.refine", l),
				cls: "aichatclip-refine-btn",
			});

			const getDescriptionBody = (): string => {
				const text = textarea.value.trim();
				// Strip leading "# Title" line if present
				const match = text.match(/^#[^\n]+\n*([\s\S]*)$/);
				return match ? match[1].trim() : text;
			};

			const updateRefineBtn = () => {
				refineBtn.disabled = getDescriptionBody().length === 0;
			};
			updateRefineBtn();

			genBtn.addEventListener("click", async () => {
				genBtn.disabled = true;
				genBtn.textContent = t("modal.generating", l);
				try {
					const excerpts = await this.getNoteExcerpts(folder.path, marker);
					const res = await apiPost(this.settings, "/api/folders/generate-description", {
						folderName: folder.path,
						noteExcerpts: excerpts.length > 0 ? excerpts : undefined,
						language: this.descriptionLanguage !== "auto" ? this.descriptionLanguage : undefined,
					});
					if (res.status === 429) {
						new Notice(`AIChatClip: ${t("notice.quotaExceeded", l)}`);
					} else if (res.status === 200) {
						const data = res.json as { description: string; remaining: number };
						const folderTitle = folder.path.split("/").pop() ?? folder.path;
						const content = `# ${folderTitle}\n\n${data.description}`;
						textarea.value = content;
						state.description = content;
						state.selected = true;
						checkbox.checked = true;
						updateRefineBtn();
					} else {
						new Notice(`AIChatClip: ${t("notice.generateFailed", l)}`);
					}
				} catch {
					new Notice(`AIChatClip: ${t("notice.generateFailed", l)}`);
				} finally {
					genBtn.disabled = false;
					genBtn.textContent = t("modal.generate", l);
				}
			});

			refineBtn.addEventListener("click", async () => {
				const body = getDescriptionBody();
				if (body.length === 0) return;
				refineBtn.disabled = true;
				refineBtn.textContent = t("modal.refining", l);
				try {
					const res = await apiPost(this.settings, "/api/folders/generate-description", {
						folderName: folder.path,
						draftText: body,
						language: this.descriptionLanguage !== "auto" ? this.descriptionLanguage : undefined,
					});
					if (res.status === 429) {
						new Notice(`AIChatClip: ${t("notice.quotaExceeded", l)}`);
					} else if (res.status === 200) {
						const data = res.json as { description: string; remaining: number };
						const folderTitle = folder.path.split("/").pop() ?? folder.path;
						const content = `# ${folderTitle}\n\n${data.description}`;
						textarea.value = content;
						state.description = content;
						state.selected = true;
						checkbox.checked = true;
						updateRefineBtn();
					} else {
						new Notice(`AIChatClip: ${t("notice.generateFailed", l)}`);
					}
				} catch {
					new Notice(`AIChatClip: ${t("notice.generateFailed", l)}`);
				} finally {
					refineBtn.disabled = false;
					refineBtn.textContent = t("modal.refine", l);
					updateRefineBtn();
				}
			});
		}

		selectAllBtn.addEventListener("click", () => {
			for (const state of this.folderStates.values()) state.selected = true;
			listEl.querySelectorAll<HTMLInputElement>("input[type=checkbox]").forEach((cb) => {
				cb.checked = true;
			});
		});
		deselectAllBtn.addEventListener("click", () => {
			for (const state of this.folderStates.values()) state.selected = false;
			listEl.querySelectorAll<HTMLInputElement>("input[type=checkbox]").forEach((cb) => {
				cb.checked = false;
			});
		});

		// Footer: create & sync button
		const footer = container.createDiv({ cls: "aichatclip-modal-footer" });
		const createBtn = footer.createEl("button", {
			text: t("modal.createAndSync", l),
			cls: "mod-cta",
		});
		createBtn.addEventListener("click", async () => {
			await this.handleCreate(marker);
		});
	}

	private async handleCreate(marker: string) {
		const l = this.lang;
		const selected = [...this.folderStates.entries()].filter(
			([, s]) => s.selected && s.description.trim() !== "",
		);
		if (selected.length === 0) return;

		// Check for overwrites
		const overwrites = selected.filter(([, s]) => s.hasExisting);
		if (overwrites.length > 0) {
			const confirmed = confirm(
				tReplace("modal.confirmOverwrite", l, { count: overwrites.length }),
			);
			if (!confirmed) return;
		}

		const ext = marker.includes(".") ? "" : ".md";

		for (const [folderPath, state] of selected) {
			const filePath = `${folderPath}/${marker}${ext}`;
			const existing = this.app.vault.getFileByPath(filePath);
			if (existing) {
				await this.app.vault.modify(existing, state.description);
			} else {
				// Ensure parent folder exists
				const folder = this.app.vault.getFolderByPath(folderPath);
				if (!folder) {
					await this.app.vault.createFolder(folderPath);
				}
				await this.app.vault.create(filePath, state.description);
			}
		}

		// Sync to API
		try {
			const folders = await scanFolders(
				this.app,
				this.settings.scanRoot,
				this.settings.markerFilename,
			);
			if (folders) {
				await syncFoldersToApi(this.settings, folders);
			}
			new Notice(
				`AIChatClip: ${tReplace("notice.markersCreated", l, { count: selected.length })}`,
			);
		} catch {
			new Notice(`AIChatClip: ${t("notice.syncAfterCreateFailed", l)}`);
		}

		await this.onComplete();
		this.close();
	}

	private async renderDeleteMode(container: HTMLElement) {
		const l = this.lang;
		const { scanRoot, markerFilename } = this.settings;

		const markers = await getFoldersWithMarker(this.app, scanRoot, markerFilename);

		if (markers.length === 0) {
			container.createEl("p", {
				text: t("modal.noMarkers", l),
				cls: "aichatclip-modal-empty",
			});
			return;
		}

		// Toolbar
		const toolbar = container.createDiv({ cls: "aichatclip-modal-actions" });
		toolbar.createEl("p", { text: t("modal.markersFound", l) });
		const selectAllBtn = toolbar.createEl("button", { text: t("modal.selectAll", l) });
		const deselectAllBtn = toolbar.createEl("button", { text: t("modal.deselectAll", l) });

		// Initialize delete items
		this.deleteItems = markers.map((m) => ({ ...m, selected: true }));

		const listEl = container.createDiv({ cls: "aichatclip-folder-list" });

		for (const item of this.deleteItems) {
			const row = listEl.createDiv({ cls: "aichatclip-delete-item" });
			const checkbox = row.createEl("input", { type: "checkbox" }) as HTMLInputElement;
			checkbox.checked = item.selected;
			checkbox.addEventListener("change", () => {
				item.selected = checkbox.checked;
			});
			row.createEl("span", { text: item.markerPath });
		}

		selectAllBtn.addEventListener("click", () => {
			for (const item of this.deleteItems) item.selected = true;
			listEl.querySelectorAll<HTMLInputElement>("input[type=checkbox]").forEach((cb) => {
				cb.checked = true;
			});
		});
		deselectAllBtn.addEventListener("click", () => {
			for (const item of this.deleteItems) item.selected = false;
			listEl.querySelectorAll<HTMLInputElement>("input[type=checkbox]").forEach((cb) => {
				cb.checked = false;
			});
		});

		// Footer
		const footer = container.createDiv({ cls: "aichatclip-modal-footer" });
		const deleteBtn = footer.createEl("button", {
			text: t("modal.deleteAndSync", l),
			cls: "mod-warning",
		});
		deleteBtn.addEventListener("click", async () => {
			await this.handleDelete();
		});
	}

	private async handleDelete() {
		const l = this.lang;
		const toDelete = this.deleteItems.filter((i) => i.selected);
		if (toDelete.length === 0) return;

		for (const item of toDelete) {
			const file = this.app.vault.getFileByPath(item.markerPath);
			if (file) {
				await this.app.vault.delete(file);
			}
		}

		// Sync to API
		try {
			const folders = await scanFolders(
				this.app,
				this.settings.scanRoot,
				this.settings.markerFilename,
			);
			if (folders) {
				await syncFoldersToApi(this.settings, folders);
			}
			new Notice(
				`AIChatClip: ${tReplace("notice.markersDeleted", l, { count: toDelete.length })}`,
			);
		} catch {
			new Notice(`AIChatClip: ${t("notice.syncAfterDeleteFailed", l)}`);
		}

		await this.onComplete();
		this.close();
	}

	private async getNoteExcerpts(folderPath: string, markerBasename: string): Promise<string[]> {
		const files = this.app.vault
			.getFiles()
			.filter(
				(f) =>
					f.parent?.path === folderPath &&
					f.extension === "md" &&
					f.basename !== markerBasename,
			)
			.slice(0, 5);

		const excerpts: string[] = [];
		for (const file of files) {
			const content = await this.app.vault.read(file);
			excerpts.push(content.slice(0, 500));
		}
		return excerpts;
	}
}
