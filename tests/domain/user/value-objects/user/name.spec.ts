import { NameValueObject, InvalidNameValueObjectError } from "@/domain/user";

describe("NameValueObject", () => {
	it("should return InvalidNameValueObjectError for an invalid name", () => {
		const invalidName = "";

		const sut = () => NameValueObject.create(invalidName);

		expect(sut).toThrow(InvalidNameValueObjectError);
	});

	it("should return InvalidNameValueObjectError because name is not string", () => {
		const invalidName = null;

		const sut = () => NameValueObject.create(invalidName);

		expect(sut).toThrow(InvalidNameValueObjectError);
	});

	it("should return InvalidNameValueObjectError for an invalid name", () => {
		const invalidName = "c".repeat(51);

		const sut = () => NameValueObject.create(invalidName);
		
		expect(sut).toThrow(InvalidNameValueObjectError);
	});

	it("should create a NameValueObject instance with a valid name", () => {
		const validName = "John Doe";

		const sut = NameValueObject.create(validName);

		expect(sut).toBeInstanceOf(NameValueObject);
	});
});