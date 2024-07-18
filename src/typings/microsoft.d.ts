interface OneDriveSharing {
	id: string;
	createdBy: string;
	parentId: string;
	name: string;
	lastModifiedDateTime: string;
	createdDateTime: string;
	size: string;
	type: "file" | "folder";
	downloadUrl: string | null;
}
