import { Secrets } from "@/application/framework";

describe("Secrets", () => {
	it("should return the secret value if it exists", () => {
		process.env.SOME_SECRET = "mySecretValue";
		const result = Secrets.getSecret("SOME_SECRET");
		expect(result).toBe("mySecretValue");
	});

	it("should return undefined for a non-existing secret", () => {
		const result = Secrets.getSecret("NON_EXISTING_SECRET");
		expect(result).toBeUndefined();
	});

	it("should return the secret value if it exists", () => {
		process.env.SOME_SECRET = "mySecretValue";
		const result = Secrets.getSecretRequered("SOME_SECRET");
		expect(result).toBe("mySecretValue");
	});

	it("should throw an error for a non-existing secret", () => {
		expect(() => Secrets.getSecretRequered("NON_EXISTING_SECRET")).toThrowError("A secret NON_EXISTING_SECRET is null");
	});
});