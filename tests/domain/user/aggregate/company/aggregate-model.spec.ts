import { CompanyAggregateModel } from "@/domain/user";

describe("CompanyAggregateModel", () => {
	it("should return an error if companyId is invalid", () => {
		const active = true;
		const invalidCompanyId = 0;

		const sut = () => CompanyAggregateModel.create(
			{
				companyId:invalidCompanyId,
				agentTypeId: 2,
				companyName: "ABC Inc.",
				companyLegalName: "Legal",
				companyUrl: "Url",
				cnpj: "05.709.784/0001-45",
				active
			}
		);

		expect(sut).toThrow(Error);
	});

	it("should return an error if agentTypeId is invalid", () => {
		const validCompanyId = 1;
		const active = true;
		const invalidAgentTypeId = 0; 

		const sut = () => CompanyAggregateModel.create(
			{
				companyId: validCompanyId,
				agentTypeId: invalidAgentTypeId,
				companyName: "ABC Inc.",
				companyLegalName: "Legal",
				companyUrl: "Url",
				cnpj: "05.709.784/0001-45",
				active: active
			}
		);

		expect(sut).toThrow(Error);
	});

	it("should return an error if companyName is invalid", () => {
		const validCompanyId = 1;
		const validAgentTypeId = 2;
		const active = true;
		const invalidCompanyName = "c".repeat(100);

		const sut = () => CompanyAggregateModel.create(
			{
				companyId: validCompanyId,
				agentTypeId: validAgentTypeId,
				companyName: invalidCompanyName,
				companyLegalName: "Legal",
				companyUrl: "Url",
				cnpj: "05.709.784/0001-45",
				active: active
			}
		);

		expect(sut).toThrow(Error);
	});

	it("should return an error if companyLegalName is invalid", () => {
		const validCompanyId = 1;
		const validAgentTypeId = 2;
		const active = true;
		const companyName = "Name";
		const invalidCompanyName = "c".repeat(100);

		const sut = () => CompanyAggregateModel.create(
			{
				companyId: validCompanyId,
				agentTypeId: validAgentTypeId,
				companyName: companyName,
				companyLegalName: invalidCompanyName,
				companyUrl: "Url",
				cnpj: "05.709.784/0001-45",
				active: active
			}
		);

		expect(sut).toThrow(Error);
	});

	it("should return an error if companyUrl is invalid", () => {
		const validCompanyId = 1;
		const validAgentTypeId = 2;
		const active = true;
		const companyName = "Name";
		const companyLegalName = "Legal Name";
		const invalidCompanyUrl = "c".repeat(100);

		const sut = () => CompanyAggregateModel.create(
			{
				companyId: validCompanyId,
				agentTypeId: validAgentTypeId,
				companyName: companyName,
				companyLegalName: companyLegalName,
				companyUrl: invalidCompanyUrl,
				cnpj: "05.709.784/0001-45",
				active: active
			}
		);

		expect(sut).toThrow(Error);
	});

	it("should return an error if cnpj is invalid", () => {
		const validCompanyId = 1;
		const validAgentTypeId = 2;
		const validCompanyName = "ABC Inc.";
		const validCompanyLegalName = "Legal";
		const validCompanyUrlName = "Url";
		const active = true;
		const invalidCnpj = "0.";

		const sut = () => CompanyAggregateModel.create(
			{
				companyId: validCompanyId,
				agentTypeId: validAgentTypeId,
				companyName: validCompanyName,
				companyLegalName: validCompanyLegalName,
				companyUrl: validCompanyUrlName,
				cnpj: invalidCnpj,
				active: active
			}
		);

		expect(sut).toThrow(Error);
	});

	it("should create a CompanyAggregateModel instance with valid inputs", () => {
		const validCompanyId = 1;
		const validAgentTypeId = 2;
		const validCompanyName = "ABC Inc.";
		const validCompanyLegalName = "Legal";
		const validCompanyUrlName = "Url";
		const validCnpj = "05.709.784/0001-45";
		const active = true;

		const sut = CompanyAggregateModel.create(
			{
				companyId: validCompanyId,
				agentTypeId: validAgentTypeId,
				companyName: validCompanyName,
				companyLegalName: validCompanyLegalName,
				companyUrl: validCompanyUrlName,
				cnpj: validCnpj,
				active: active
			}
		);

		expect(sut).toBeInstanceOf(CompanyAggregateModel);
	});
});