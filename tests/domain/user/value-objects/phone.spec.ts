import { PhoneValueObject, InvalidPhoneValueObjectError } from "@/domain/user";

describe("PhoneValueObject", () => {
	it("should return InvalidPhoneValueObjectError for an invalid phone number", () => {
		const invalidPhoneNumber = "15850";

		const sut = () => PhoneValueObject.create(invalidPhoneNumber);

		expect(sut).toThrow(InvalidPhoneValueObjectError);
	});

	it("should create a PhoneValueObject instance with a valid phone number", () => {
		const validPhoneNumber = "1234567890";

		const sut = PhoneValueObject.create(validPhoneNumber);

		if(!(sut instanceof Error)) expect(sut.value).toBe(validPhoneNumber);
		expect(sut).toBeInstanceOf(PhoneValueObject);
	});
});