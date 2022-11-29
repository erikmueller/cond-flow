import { expect, it } from "vitest";
import cond from "./index.js";

it("returns the first value for which the predicate evaluates to true", () => {
	const value = cond([
		[false, "false"],
		[true, "true"],
		[true, "true but too late"],
	]);

	expect(value).toBe("true");
});

it("returns undefined if no predicate evaluates to true", () => {
	const value = cond([[false, "false"]]);

	expect(value).toBeUndefined();
});

it("returns provided fallback if no predicate evaluates to true", () => {
	const value = cond([[false, "false"]], {
		fallback: () => "fallback",
	});

	expect(value).toBe("fallback");
});

it("Accepts functions as value for lazy evaluation", () => {
	const value = cond<string>([
		[
			false,
			() => {
				throw new Error("duh!");
			},
		],
		[true, () => "true"],
	]);

	expect(value).toBe("true");
});
