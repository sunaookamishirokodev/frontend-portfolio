type Presence = {
	user: {
		username?: string;
		avatar?: string;
		displayName?: string;
		banner?: string;
		status?: {
			type?: "online" | "dnd" | "idle" | "offline";
			devices?: string;
		};
	};
	customStatus?: {
		state?: string;
		emoji?: {
			name?: string;
			url?: string;
		};
	};
	activity?: {
		name?: string;
		url?: string;
		details?: string;
		state?: string;
		assets?: {
			smallText?: string;
			smallImage?: string;
			largeText?: string;
			largeImage?: string;
		};
		timestamps?: {
			start?: null | number;
			end?: null | number;
		};
		createdTimestamp?: number;
	};
};
