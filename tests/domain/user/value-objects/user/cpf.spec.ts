import { CPFValueObject, InvalidCPFValueObjectError } from "@/domain/user";

describe("CPFValueObject", () => {
	it("should return InvalidCPFValueObjectError for an invalid CPF", () => {
		const invalidCPF = "invalid";

		const sut = () => CPFValueObject.create(invalidCPF);

		expect(sut).toThrow(InvalidCPFValueObjectError);
	});

	it("should return InvalidCPFValueObjectError, because cpf has more than 11 characters", () => {
		const invalidCPF = "11111111111";

		const sut = () => CPFValueObject.create(invalidCPF);

		expect(sut).toThrow(InvalidCPFValueObjectError);
	});

	it("should return false when digitOne validation fails", () => {
		const validCPF = "123.456.789-09";
		const cpfWithInvalidDigitOne = validCPF.replace("9", "8");

		const sut = () => CPFValueObject.create(cpfWithInvalidDigitOne);

		expect(sut).toThrow(InvalidCPFValueObjectError);
	});

	it("should return false when digitTwo validation fails", () => {
		const validCPF = "123.456.789-09";
		const cpfWithInvalidDigitTwo = validCPF.slice(0, -1) + "8";

		const sut = () => CPFValueObject.create(cpfWithInvalidDigitTwo);

		expect(sut).toThrow(InvalidCPFValueObjectError);
	});

	it("should create a CPFValueObject instance with a valid CPF", () => {
		const validCPF = "123.456.789-09";
		const sut = CPFValueObject.create(validCPF);

		expect(sut).toBeInstanceOf(CPFValueObject);
	});
});