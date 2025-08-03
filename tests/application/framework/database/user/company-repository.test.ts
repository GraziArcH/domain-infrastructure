import { IdValueObject } from "@/domain/shared";
import { DatabaseHelper, MockUserDatabase, CompanyRepository } from "@/application/framework";
import { CNPJValueObject, CompanyAggregateModel } from "@/domain/user";

describe("CompanyRepository", () => {
	const databaseHelper = new DatabaseHelper("user");
	const mockUserDatabase = new MockUserDatabase(databaseHelper);

	beforeEach(async () => {
		mockUserDatabase.createMocks();
	});

	afterEach(async () => {
		await mockUserDatabase.clearTables();
		await databaseHelper.disconnect();
	});

	describe("create", () => {
		it("should create a new company", async () => {
			const companyRepository = new CompanyRepository(databaseHelper);
			const company = CompanyAggregateModel.create(
				{
					companyId: 1,
					agentTypeId: 1,
					companyName: "Update Company",
					companyLegalName: "Legal Name",
					companyUrl: "Url",
					cnpj: "32705806000171",
					active: true
				}
			) as CompanyAggregateModel;

			const result = await companyRepository.create(company);

			expect(result).toBeInstanceOf(CompanyAggregateModel);
		});
	});

	describe("getCompanyById", () => {
		it("should get company by id", async () => {
			const companyRepository = new CompanyRepository(databaseHelper);
			const companyId = IdValueObject.create(1) as IdValueObject;

			const result = await companyRepository.getCompanyById(companyId);

			expect(result).toBeInstanceOf(CompanyAggregateModel);
			expect(result.companyId.value).toEqual(companyId.value);
		});
	});

	describe("getCompanyByCNPJ", () => {
		it("should get company by CNPJ", async () => {
			const companyRepository = new CompanyRepository(databaseHelper);
			const cnpj = CNPJValueObject.create("60638328000160") as CNPJValueObject;

			const result = await companyRepository.getCompanyByCNPJ(cnpj);

			expect(result).toBeInstanceOf(CompanyAggregateModel);
			expect(result.cnpj.value).toEqual(cnpj.value);
		});
	});

	describe("getAll", () => {
		it("should get all companies", async () => {
			const companyRepository = new CompanyRepository(databaseHelper);

			const result = await companyRepository.getAll();

			expect(result).toBeInstanceOf(Array);
			expect(result.every((item) => item instanceof CompanyAggregateModel)).toBeTruthy();
		});
	});


	describe("update", () => {
		it("should update company", async () => {
			const companyRepository = new CompanyRepository(databaseHelper);
			const companyId = IdValueObject.create(1) as IdValueObject;
			const updatedCompanyData = CompanyAggregateModel.create(
				{
					companyId: 1,
					agentTypeId: 1,
					companyName: "Update Company",
					companyLegalName: "Legal Name",
					companyUrl: "Url",
					cnpj: "32705806000171",
					active: true
				}
			) as CompanyAggregateModel;

			const result = await companyRepository.update(updatedCompanyData);

			expect(result).toBeInstanceOf(CompanyAggregateModel);
			expect(result.companyId.value).toEqual(companyId.value);
			expect(result.agentTypeId.value).toEqual(updatedCompanyData.agentTypeId.value);
			expect(result.companyName.value).toEqual(updatedCompanyData.companyName.value);
			expect(result.cnpj.value).toEqual(updatedCompanyData.cnpj.value);
		});
	});

	describe("delete", () => {
		it("should delete company", async () => {
			const companyRepository = new CompanyRepository(databaseHelper);

			const companyId = IdValueObject.create(1) as IdValueObject;
			const result = await companyRepository.delete(companyId);

			expect(result).toBeInstanceOf(CompanyAggregateModel);
			expect(result.companyId.value).toEqual(companyId.value);
		});
	});
});