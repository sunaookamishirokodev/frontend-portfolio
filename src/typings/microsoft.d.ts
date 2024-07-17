interface OneDriveSharing {
	id: string;
	parentId: string;
	name: string;
	lastModifiedDateTime: string;
	size: string;
	type: "file" | "folder";
	downloadUrl: string | null;
}
