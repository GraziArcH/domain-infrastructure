import { InvalidCNPJValueObjectError, CNPJValueObject } from "@/domain/user";

describe("CNPJValueObject", () => {
	it("should return InvalidCNPJValueObjectError for an invalid CNPJ (null)", () => {
		const invalidCNPJ = null;

		const sut = () => CNPJValueObject.create(invalidCNPJ);

		expect(sut).toThrow(InvalidCNPJValueObjectError);
	});

	it("should return InvalidCNPJValueObjectError for an invalid CNPJ (non-string)", () => {
		const invalidCNPJ = 12345678901234;

		const sut = () => CNPJValueObject.create(invalidCNPJ as unknown as string);

		expect(sut).toThrow(InvalidCNPJValueObjectError);
	});

	it("should return InvalidCNPJValueObjectError for an invalid CNPJ (length less than 14)", () => {
		const invalidCNPJ = "1234567890123";

		const sut = () => CNPJValueObject.create(invalidCNPJ);

		expect(sut).toThrow(InvalidCNPJValueObjectError);
	});

	it("should return InvalidCNPJValueObjectError for an invalid CNPJ (length greater than 14)", () => {
		const invalidCNPJ = "123456789012345";

		const sut = () => CNPJValueObject.create(invalidCNPJ);

		expect(sut).toThrow(InvalidCNPJValueObjectError);
	});

	it("should return InvalidCNPJValueObjectError for an invalid CNPJ (invalid digits)", () => {
		const invalidCNPJ = "12345678901233";

		const sut = () => CNPJValueObject.create(invalidCNPJ);

		expect(sut).toThrow(InvalidCNPJValueObjectError);
	});

	it("should return CNPJValueObject with digitOne set to 0 for CNPJ with digitOne greater than 9", () => {
		const cnpjWithDigitOneGreaterThan9 = "00000000000001"; 

		const sut = () => CNPJValueObject.create(cnpjWithDigitOneGreaterThan9);

		expect(sut).toThrow(InvalidCNPJValueObjectError);
	});

	it("should create a CNPJValueObject instance with a valid CNPJ", () => {
		const validCNPJ = "09035531000194";

		const sut = CNPJValueObject.create(validCNPJ);

		if (!(sut instanceof Error)) expect(sut.value).toBe(validCNPJ);
		expect(sut).toBeInstanceOf(CNPJValueObject);
	});
});