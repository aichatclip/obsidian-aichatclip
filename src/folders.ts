/** Vault folder scanning and server synchronization for smart folder placement */
import type { App, TFolder } from "obsidian";
import { apiPut } from "./api";
import type { AIChatClipSettings } from "./types";

export interface FolderEntry {
	path: string;
	description: string;
}

const EXCLUDED_FOLDER_PREFIXES = [".obsidian", "node_modules"];

function isExcludedFolder(path: string): boolean {
	const first = path.split("/")[0];
	return first.startsWith(".") || EXCLUDED_FOLDER_PREFIXES.includes(first);
}

/** Get all vault folders under scanRoot, excluding hidden/system folders */
export function getVaultFolders(app: App, scanRoot: string): TFolder[] {
	const root = scanRoot
		? app.vault.getFolderByPath(scanRoot)
		: app.vault.getRoot();
	if (!root) return [];

	const result: TFolder[] = [];
	const collect = (folder: TFolder) => {
		for (const child of folder.children) {
			// TFolder has a `children` property; TFile does not
			if (!("children" in child)) continue;
			const f = child as TFolder;
			if (!isExcludedFolder(f.path)) {
				result.push(f);
				collect(f);
			}
		}
	};
	collect(root);
	return result;
}

/** Read existing marker file content, or null if not found */
export async function getExistingMarkerContent(
	app: App,
	folderPath: string,
	markerFilename: string,
): Promise<string | null> {
	const stem = markerFilename || "README";
	const ext = stem.includes(".") ? "" : ".md";
	const filePath = `${folderPath}/${stem}${ext}`;
	const file = app.vault.getFileByPath(filePath);
	if (!file) return null;
	return app.vault.read(file);
}

/** Get folder paths that have a marker file (for delete mode) */
export async function getFoldersWithMarker(
	app: App,
	scanRoot: string,
	markerFilename: string,
): Promise<{ folderPath: string; markerPath: string }[]> {
	const marker = markerFilename || "README";
	const markerFiles = app.vault.getFiles().filter((f) => {
		if (f.basename !== marker) return false;
		if (scanRoot === "") return true;
		return f.path.startsWith(`${scanRoot}/`);
	});
	return markerFiles
		.filter((f) => f.parent)
		.map((f) => ({ folderPath: f.parent!.path, markerPath: f.path }));
}

let lastFoldersMtime = 0;

export async function scanFolders(
	app: App,
	scanRoot: string,
	markerFilename: string,
): Promise<FolderEntry[] | null> {
	const marker = markerFilename || "README";

	const markerFiles = app.vault
		.getFiles()
		.filter((f) => {
			if (f.basename !== marker) return false;
			if (scanRoot === "") return true;
			return f.path.startsWith(`${scanRoot}/`);
		});

	const maxMtime = markerFiles.reduce((max, f) => Math.max(max, f.stat.mtime), 0);
	if (maxMtime > 0 && maxMtime === lastFoldersMtime) return null;

	const entries: FolderEntry[] = [];
	for (const file of markerFiles) {
		const content = await app.vault.read(file);
		const dir = file.parent?.path;
		if (!dir) continue;

		const relativePath =
			scanRoot === ""
				? dir
				: dir.startsWith(`${scanRoot}/`)
					? dir.slice(scanRoot.length + 1)
					: dir;

		if (relativePath) {
			entries.push({ path: relativePath, description: content.slice(0, 3000) });
		}
	}

	lastFoldersMtime = maxMtime;
	return entries;
}

export async function syncFoldersToApi(
	settings: AIChatClipSettings,
	folders: FolderEntry[],
): Promise<void> {
	const res = await apiPut(settings, "/api/folders", { folders });
	if (res.status !== 200) {
		throw new Error(`Failed to sync folders: ${res.status}`);
	}
}
