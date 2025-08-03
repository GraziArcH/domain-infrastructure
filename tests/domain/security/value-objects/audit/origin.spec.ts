import { InvalidOriginValueObjectError, OriginValueObject } from "@/domain/security";

describe("OriginValueObject", () => {
	it("should return InvalidOriginValueObjectError for an invalid origin (null)", () => {
		const invalidOrigin = null;

		const sut = () => OriginValueObject.create(invalidOrigin);

		expect(sut).toThrow(InvalidOriginValueObjectError);
	});

	it("should return InvalidOriginValueObjectError for an invalid origin (non-string)", () => {
		const invalidOrigin = 123;

		const sut = () => OriginValueObject.create(invalidOrigin as unknown as string);

		expect(sut).toThrow(InvalidOriginValueObjectError);
	});

	it("should return InvalidOriginValueObjectError for an invalid origin (length 0)", () => {
		const invalidOrigin = "";

		const sut = () => OriginValueObject.create(invalidOrigin);

		expect(sut).toThrow(InvalidOriginValueObjectError);
	});

	it("should return InvalidOriginValueObjectError for an invalid origin (length greater than 255)", () => {
		const invalidOrigin = "c".repeat(256);

		const sut = () => OriginValueObject.create(invalidOrigin);

		expect(sut).toThrow(InvalidOriginValueObjectError);
	});

	it("should create an OriginValueObject instance with a valid origin", () => {
		const validOrigin = "Valid Origin";

		const sut = OriginValueObject.create(validOrigin);

		expect(sut).toBeInstanceOf(OriginValueObject);
	});
});