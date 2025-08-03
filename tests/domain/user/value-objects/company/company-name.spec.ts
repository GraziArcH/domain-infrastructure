import { InvalidCompanyNameValueObjectError, CompanyNameValueObject } from "@/domain/user";

describe("CompanyNameValueObject", () => {
	it("should return InvalidCompanyNameValueObjectError for an invalid company name (null)", () => {
		const invalidCompanyName = null;

		const sut = () => CompanyNameValueObject.create(invalidCompanyName);

		expect(sut).toThrow(InvalidCompanyNameValueObjectError);
	});

	it("should return InvalidCompanyNameValueObjectError for an invalid company name (non-string)", () => {
		const invalidCompanyName = 123;

		const sut = () => CompanyNameValueObject.create(invalidCompanyName as unknown as string);

		expect(sut).toThrow(InvalidCompanyNameValueObjectError);
	});

	it("should return InvalidCompanyNameValueObjectError for an invalid company name (length 0)", () => {
		const invalidCompanyName = "";

		const sut = () => CompanyNameValueObject.create(invalidCompanyName);

		expect(sut).toThrow(InvalidCompanyNameValueObjectError);
	});

	it("should return InvalidCompanyNameValueObjectError for an invalid company name (length greater than 50)", () => {
		const invalidCompanyName = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel justo nec urna cursus ullamcorper. Nulla facilisi.";

		const sut = () => CompanyNameValueObject.create(invalidCompanyName);

		expect(sut).toThrow(InvalidCompanyNameValueObjectError);
	});

	it("should create a CompanyNameValueObject instance with a valid company name", () => {
		const validCompanyName = "Valid Company Name";

		const sut = CompanyNameValueObject.create(validCompanyName);

		if (!(sut instanceof Error)) expect(sut.value).toBe(validCompanyName);
		expect(sut).toBeInstanceOf(CompanyNameValueObject);
	});
});
