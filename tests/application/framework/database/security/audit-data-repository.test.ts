import { DatabaseHelper, AuditRepository, MockSecurityDatabase } from "@/application/framework";
import { AuditEntityModel } from "@/domain/security";

describe("AuditRepository", () => {
	const databaseHelper = new DatabaseHelper("security");
	const mockSecurityDatabase = new MockSecurityDatabase(databaseHelper);



	afterEach(async () => {
		await mockSecurityDatabase.clearTables();
		await databaseHelper.disconnect();
	});

	describe("create", () => {
		it("should create a new audit", async () => {
			const auditRepository = new AuditRepository(databaseHelper);
			const auditData = AuditEntityModel.create({
				auditId: 1,
				action: "Login",
				date: new Date(),
				details: "User Login",
				identity: "admin",
				origin: "web",
				status: "sucesso"
			}) as AuditEntityModel;

			const result = await auditRepository.create(auditData);

			expect(result).toBeInstanceOf(AuditEntityModel);
			expect(result.action.value).toEqual(auditData.action.value);
			expect(result.details.value).toEqual(auditData.details.value);
			expect(result.identity.value).toEqual(auditData.identity.value);
			expect(result.origin.value).toEqual(auditData.origin.value);
			expect(result.status.value).toEqual(auditData.status.value);
		});
	});
});