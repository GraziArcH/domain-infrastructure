import { EmailValueObject, InvalidEmailValueObjectError } from "@/domain/user";

describe("EmailValueObject", () => {
	it("should return InvalidEmailValueObjectError for an invalid email address", () => {
		const invalidEmail = "invalid";

		const sut = () => EmailValueObject.create(invalidEmail);

		expect(sut).toThrow(InvalidEmailValueObjectError);
	});

	it("should return InvalidEmailValueObjectError for an email address with length greater than 256", () => {
		const longEmail = "a".repeat(257) + "@example.com";

		const sut = () => EmailValueObject.create(longEmail);

		expect(sut).toThrow(InvalidEmailValueObjectError);
	});

	it("should return InvalidEmailValueObjectError for an email address with invalid format", () => {
		const invalidFormatEmail = "invalid@.com";

		const sut = () => EmailValueObject.create(invalidFormatEmail);

		expect(sut).toThrow(InvalidEmailValueObjectError);
	});

	it("should return InvalidEmailValueObjectError for an email address with account or domain length greater than 64", () => {
		const longAccountEmail = "a".repeat(65) + "@example.com";
		const longDomainEmail = "valid@" + "a".repeat(65) + ".com";

		const sutOne = () => EmailValueObject.create(longAccountEmail);
		const sutTwo = () => EmailValueObject.create(longDomainEmail);

		expect(sutOne).toThrow(InvalidEmailValueObjectError);
		expect(sutTwo).toThrow(InvalidEmailValueObjectError);
	});

	it("should create an EmailValueObject instance with a valid email address", () => {
		const validEmail = "valid@example.com";
		const sut = EmailValueObject.create(validEmail);
		
		if(!(sut instanceof Error)) expect(sut.value).toBe(validEmail);
		expect(sut).toBeInstanceOf(EmailValueObject);
	});
});