import { InvalidDetailsValueObjectError, DetailsValueObject } from "@/domain/security";

describe("DetailsValueObject", () => {
	it("should return InvalidDetailsValueObjectError for an invalid details (null)", () => {
		const invalidDetails = null;

		const sut = () => DetailsValueObject.create(invalidDetails);

		expect(sut).toThrow(InvalidDetailsValueObjectError);
	});

	it("should return InvalidDetailsValueObjectError for an invalid details (non-string)", () => {
		const invalidDetails = 123;

		const sut = () => DetailsValueObject.create(invalidDetails as unknown as string);

		expect(sut).toThrow(InvalidDetailsValueObjectError);
	});

	it("should return InvalidDetailsValueObjectError for an invalid details (length 0)", () => {
		const invalidDetails = "";

		const sut = () => DetailsValueObject.create(invalidDetails);

		expect(sut).toThrow(InvalidDetailsValueObjectError);
	});

	it("should return InvalidDetailsValueObjectError for an invalid details (length greater than 255)", () => {
		const invalidDetails = "c".repeat(256);

		const sut = () => DetailsValueObject.create(invalidDetails);

		expect(sut).toThrow(InvalidDetailsValueObjectError);
	});

	it("should create a DetailsValueObject instance with valid details", () => {
		const validDetails = "Valid Details";

		const sut = DetailsValueObject.create(validDetails);

		expect(sut).toBeInstanceOf(DetailsValueObject);
	});
});
