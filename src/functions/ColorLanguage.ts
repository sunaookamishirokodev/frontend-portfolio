export default function ColorLanguage(language: string) {
	const colors = {
		TypeScript: "#3178C6",
		JavaScript: "#F1E05A",
		Vue: "#41B883",
		EJS: "#A91E50",
		SCSS: "#C6538C",
		HTML: "#E34C26",
		CSS: "#563D7C",
		Handlebars: "#F7931E",
		"C++": "#F34B7D",
		"C#": "#178600",
		C: "#5686A5",
		Lua: "#000080",
		GLSL: "#5686A5",
		HLSL: "#AACE60",
		Python: "#3572A5",
		Shell: "#89E051",
		Go: "#00ADD8",
		Jsonnet: "#0064BD",
		Rust: "#DEA584",
		Java: "#B07219",
		ANTLR: "#9DC3FF",
		XSLT: "#EB8CEB",
		Clojure: "#DB5855",
		MDX: "#FCB32C",
		Mustache: "#724B3B",
		Dockerfile: "#384D54",
		"Objective-C++": "#6866FB",
		"Objective-C": "#438EFF",
		PowerShell: "#012456",
		"Visual Basic .NET": "#945DB7",
		"Jupyter Notebook": "#DA5B0B",
		"F#": "#B845FC",
		BatchFile: "#C1F12E",
		MakeFile: "#427819",
		Elixir: "#6E4A7E",
		Ruby: "#701516",
		Dart: "#00B4AB",
		CMake: "#DA3434",
		Groovy: "#0D1117",
		Kotlin: "#A97BFF",
	};

	const otherColor = "#EDEDED";

	// @ts-expect-error
	return colors?.[language] || otherColor;
}
