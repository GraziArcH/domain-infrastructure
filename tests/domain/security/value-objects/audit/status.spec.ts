import { InvalidStatusValueObjectError, StatusValueObject } from "@/domain/security";

describe("StatusValueObject", () => {
	it("should return InvalidStatusValueObjectError for an invalid status (null)", () => {
		const invalidStatus = null;

		const sut = () => StatusValueObject.create(invalidStatus);

		expect(sut).toThrow(InvalidStatusValueObjectError);
	});

	it("should return InvalidStatusValueObjectError for an invalid status (non-string)", () => {
		const invalidStatus = 123;

		const sut = () => StatusValueObject.create(invalidStatus as unknown as string);

		expect(sut).toThrow(InvalidStatusValueObjectError);
	});

	it("should return InvalidStatusValueObjectError for an invalid status (empty string)", () => {
		const invalidStatus = "";

		const sut = () => StatusValueObject.create(invalidStatus);

		expect(sut).toThrow(InvalidStatusValueObjectError);
	});

	it("should return InvalidStatusValueObjectError for an invalid status (length greater than 255)", () => {
		const invalidStatus = "Invalid Status";

		const sut = () => StatusValueObject.create(invalidStatus);

		expect(sut).toThrow(InvalidStatusValueObjectError);
	});

	it("should return InvalidStatusValueObjectError for an invalid status (not 'sucesso', 'falha', or 'erro')", () => {
		const invalidStatus = "invalid";

		const sut = () => StatusValueObject.create(invalidStatus);

		expect(sut).toThrow(InvalidStatusValueObjectError);
	});

	it("should create a StatusValueObject instance with a valid status", () => {
		const validStatus = "sucesso";

		const sut = StatusValueObject.create(validStatus);

		if (!(sut instanceof Error)) expect(sut.value).toBe(validStatus);
		expect(sut).toBeInstanceOf(StatusValueObject);
	});
});
