import { databaseUserHelper, companyFacade } from "@/application/factories";
import { MockUserDatabase } from "@/application/framework";
import { 
	CompanyAggregateModel, 
	InvalidCNPJValueObjectError, 
	InvalidCPFValueObjectError, 
	UserAggregateModel 
} from "@/domain/user";

describe("CompanyFacade", () => {
	const mockUserDatabase = new MockUserDatabase(databaseUserHelper);

	beforeEach(async () => {
		await mockUserDatabase.createMocks();
	});

	afterEach(async () => {
		await mockUserDatabase.clearTables();
		await databaseUserHelper.disconnect();
	});

	describe("create", () => {
		it("should return an error when agent type does not exist", async () => {
			const agentTypeId = 999;
			const companyName = "Example Company";
			const companyLegalName = "Legal Example Company";
			const companyUrl = "Url";
			const cnpj = "06353395000192";
			const idpUserId = "1";
			const name = "User One";
			const surname = "User One";
			const cpf = "06353395000192";
			const userTypeId = 1;
			const email = "email@test.com";
			const phones = [{ phone: "11952878015", type: "comercial" }];

    
			const result = companyFacade.create(
				{
					agentTypeId,
					companyName,
					companyLegalName,
					companyUrl,
					cnpj,
					idpUserId,
					name,
					surname,
					cpf,
					userTypeId,
					email,
					phones
				}
			);
    
			await expect(result).rejects.toThrow(Error);
		});
    
		it("should return an error because invalid company model", async () => {
			const agentTypeId = 1;
			const companyName = "Example Company";
			const companyLegalName = "Legal Example Company";
			const companyUrl = "Url";
			const cnpj = "06353395000193";
			const idpUserId = "1";
			const name = "User One";
			const surname = "User One";
			const cpf = "06353395000192";
			const userTypeId = 1;
			const email = "email@test.com";
			const phones = [{ phone: "11952878015", type: "comercial" }];

    
			const result = companyFacade.create(
				{
					agentTypeId,
					companyName,
					companyLegalName,
					companyUrl,
					cnpj,
					idpUserId,
					name,
					surname,
					cpf,
					userTypeId,
					email,
					phones
				}
			);
    
			await expect(result).rejects.toThrow(InvalidCNPJValueObjectError);
		});
    
		it("should return an error because invalid user model", async () => {
			const agentTypeId = 1;
			const companyName = "Example Company";
			const companyLegalName = "Legal Example Company";
			const companyUrl = "Url";
			const cnpj = "06353395000192";
			const idpUserId = "1";
			const name = "User One";
			const surname = "User One";
			const cpf = "06353395000193";
			const userTypeId = 1;
			const email = "email@test.com";
			const phones = [{ phone: "11952878015", type: "comercial" }];

    
			const result = companyFacade.create(
				{
					agentTypeId,
					companyName,
					companyLegalName,
					companyUrl,
					cnpj,
					idpUserId,
					name,
					surname,
					cpf,
					userTypeId,
					email,
					phones
				}
			);
    
			await expect(result).rejects.toThrow(InvalidCPFValueObjectError);
		});
    
		it("should create company", async () => {
			const agentTypeId = 1;
			const companyName = "Example Company";
			const companyLegalName = "Legal Example Company";
			const companyUrl = "Url";
			const cnpj = "06353395000192";
			const idpUserId = "1";
			const name = "User One";
			const surname = "User One";
			const cpf = "37594810007";
			const userTypeId = 1;
			const email = "email@test.com";
			const phones = [{ phone: "11952878015", type: "comercial" }];

    
			const result = await companyFacade.create(
				{
					agentTypeId,
					companyName,
					companyLegalName,
					companyUrl,
					cnpj,
					idpUserId,
					name,
					surname,
					cpf,
					userTypeId,
					email,
					phones
				}
			);
    
			expect(result).toBeInstanceOf(CompanyAggregateModel);
		});
	});

	describe("getAll", () => {
		it("should return all companies", async () => {
			const result = await companyFacade.getAll();
    
			expect(result).toBeInstanceOf(Array);
			expect(result.every((item) => item instanceof CompanyAggregateModel)).toBeTruthy();
		});
	});

	describe("createSimpleUserWithPhones", () => {
		it("should return an error because phone is invalid", async () => {
			const companyId = 1;
			const idpUserId = "1";
			const name = "User One";
			const surname = "User One";
			const cpf = "94692501090";
			const userTypeId = 1;
			const email = "email@test.com";
			const phones = [{ phone: "123456", type: "comercial" }];
			const active = true;

			const result = companyFacade.createSimpleUserWithPhones(
				{
					idpUserId,
					companyId,
					name,
					surname,
					cpf,
					userTypeId,
					email,
					phones,
					active
				}
			);
    
			await expect(result).rejects.toThrow(Error);
		});

		it("should return an error because companyId is invalid", async () => {
			const companyId = -1;
			const idpUserId = "1";
			const name = "User One";
			const surname = "User One";
			const cpf = "06353395000192";
			const userTypeId = 1;
			const email = "email@test.com";
			const phones = [{ phone: "11952878015", type: "comercial" }];
			const active = true;
            
			const result = companyFacade.createSimpleUserWithPhones(
				{
					idpUserId,
					companyId,
					name,
					surname,
					cpf,
					userTypeId,
					email,
					phones,
					active
				}
			);
    
			await expect(result).rejects.toThrow(Error);
		});

		it("should return an error because company is not exists", async () => {
			const companyId = 999;
			const idpUserId = "1";
			const name = "User One";
			const surname = "User One";
			const cpf = "29177924002";
			const userTypeId = 1;
			const email = "email@test.com";
			const phones = [{ phone: "11952878015", type: "comercial" }];
			const active = true;
            
			const result = companyFacade.createSimpleUserWithPhones(
				{
					idpUserId,
					companyId,
					name,
					surname,
					cpf,
					userTypeId,
					email,
					phones,
					active
				}
			);

			await expect(result).rejects.toThrow(Error);
		});

		it("should return an error because invalid user model", async () => {
			const companyId = 1;
			const idpUserId = "1";
			const name = "User One";
			const surname = "User One";
			const cpf = "063533950001";
			const userTypeId = 1;
			const email = "email@test.com";
			const phones = [{ phone: "11952878015", type: "comercial" }];
			const active = true;
            
			const result = companyFacade.createSimpleUserWithPhones(
				{
					idpUserId,
					companyId,
					name,
					surname,
					cpf,
					userTypeId,
					email,
					phones,
					active
				}
			);
    
			await expect(result).rejects.toThrow(InvalidCPFValueObjectError);
		});

		it("should create simple user with phone", async () => {
			const companyId = 1;
			const idpUserId = "1";
			const name = "User One";
			const surname = "User One";
			const cpf = "37594810007";
			const userTypeId = 1;
			const email = "email1234@test.com";
			const phones = [{ phone: "11952878015", type: "comercial" }];
			const active = true;
            
			const result = await companyFacade.createSimpleUserWithPhones(
				{
					idpUserId,
					companyId,
					name,
					surname,
					cpf,
					userTypeId,
					email,
					phones,
					active
				}
			);
    
			expect(result).toBeInstanceOf(UserAggregateModel);
		});
	});
});