import { InvalidIdentityValueObjectError, IdentityValueObject } from "@/domain/security";

describe("IdentityValueObject", () => {
	it("should return InvalidIdentityValueObjectError for an invalid identity (null)", () => {
		const invalidIdentity = null;

		const sut = () => IdentityValueObject.create(invalidIdentity);

		expect(sut).toThrow(InvalidIdentityValueObjectError);
	});

	it("should return InvalidIdentityValueObjectError for an invalid identity (non-string)", () => {
		const invalidIdentity = 123;

		const sut = () => IdentityValueObject.create(invalidIdentity as unknown as string);

		expect(sut).toThrow(InvalidIdentityValueObjectError);
	});

	it("should return InvalidIdentityValueObjectError for an invalid identity (length 0)", () => {
		const invalidIdentity = "";

		const sut = () => IdentityValueObject.create(invalidIdentity);

		expect(sut).toThrow(InvalidIdentityValueObjectError);
	});

	it("should return InvalidIdentityValueObjectError for an invalid identity (length greater than 100)", () => {
		const invalidIdentity = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel justo nec urna cursus ullamcorper.";

		const sut = () => IdentityValueObject.create(invalidIdentity);

		expect(sut).toThrow(InvalidIdentityValueObjectError);
	});

	it("should create an IdentityValueObject instance with a valid identity", () => {
		const validIdentity = "Valid Identity";

		const sut = IdentityValueObject.create(validIdentity);

		expect(sut).toBeInstanceOf(IdentityValueObject);
	});
});