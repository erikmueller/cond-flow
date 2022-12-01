import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		exclude: [...configDefaults.exclude, "build"],
		coverage: {
			reporter: ["text", "html", "cobertura"],
		},
	},
});
