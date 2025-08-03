import { InvalidIdValueObjectError, IdValueObject } from "@/domain/shared";

describe("IdValueObject", () => {
	it("should return InvalidIdValueObjectError for an invalid ID (null)", () => {
		const invalidId = null;

		const sut = () => IdValueObject.create(invalidId);

		expect(sut).toThrow(InvalidIdValueObjectError);
	});

	it("should return InvalidIdValueObjectError for an invalid ID (string)", () => {
		const invalidId = "invalid";

		const sut = () => IdValueObject.create(invalidId as unknown as number);

		expect(sut).toThrow(InvalidIdValueObjectError);
	});

	it("should return InvalidIdValueObjectError for an invalid ID (zero)", () => {
		const invalidId = 0;

		const sut = () => IdValueObject.create(invalidId);

		expect(sut).toThrow(InvalidIdValueObjectError);
	});

	it("should return InvalidIdValueObjectError for an invalid ID (negative number)", () => {
		const invalidId = -1;

		const sut = () => IdValueObject.create(invalidId);

		expect(sut).toThrow(InvalidIdValueObjectError);
	});

	it("should create an IdValueObject instance with a valid ID", () => {
		const validId = 1;

		const sut = IdValueObject.create(validId);

		expect(sut).toBeInstanceOf(IdValueObject);
	});
});
