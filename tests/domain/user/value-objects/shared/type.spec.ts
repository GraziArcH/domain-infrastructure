import { InvalidTypeValueObjectError, TypeValueObject } from "@/domain/user";

describe("TypeValueObject", () => {
	it("should return InvalidTypeValueObjectError for an invalid type", () => {
		const invalidType = "invalid";

		const sut = () => TypeValueObject.create(invalidType);

		expect(sut).toThrow(InvalidTypeValueObjectError);
	});

	it("should return an instance of TypeValueObject with a valid type (comercial)", () => {
		const validType = "comercial";

		const sut = TypeValueObject.create(validType);

		expect(sut).toBeInstanceOf(TypeValueObject);
	});

	it("should return an instance of TypeValueObject with a valid type (pessoal)", () => {
		const validType = "pessoal";

		const sut = TypeValueObject.create(validType);

		expect(sut).toBeInstanceOf(TypeValueObject);
	});
});
