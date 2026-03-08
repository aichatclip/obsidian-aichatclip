import { type App, TFile, requestUrl } from "obsidian";
import type { AIChatClipSettings } from "./types";

interface FolderEntry {
	path: string;
	description: string;
}

export async function scanFolders(
	app: App,
	scanRoot: string,
	markerFilename: string,
): Promise<FolderEntry[]> {
	const entries: FolderEntry[] = [];
	const marker = markerFilename || "README";

	const markerFiles = app.vault
		.getFiles()
		.filter((f) => {
			if (f.basename !== marker) return false;
			if (scanRoot === "") return true;
			return f.path.startsWith(`${scanRoot}/`);
		});

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

	return entries;
}

export async function syncFoldersToApi(
	settings: AIChatClipSettings,
	folders: FolderEntry[],
): Promise<void> {
	const res = await requestUrl({
		url: `${settings.apiBaseUrl}/api/folders`,
		method: "PUT",
		headers: {
			Authorization: `Bearer ${settings.token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ folders }),
	});

	if (res.status !== 200) {
		throw new Error(`Failed to sync folders: ${res.status}`);
	}
}
