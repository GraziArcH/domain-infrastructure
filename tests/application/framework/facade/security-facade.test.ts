import { databaseSecurityHelper, securityFacade } from "@/application/factories";
import { MockSecurityDatabase } from "@/application/framework";
import { AuditEntityModel } from "@/domain/security";

describe("SecurityFacade", () => {
	const mockSecurityDatabase = new MockSecurityDatabase(databaseSecurityHelper);

	afterEach(async () => {
		await mockSecurityDatabase.clearTables();
		await databaseSecurityHelper.disconnect();
	});

	describe("createAudit", () => {
		it("should create a new audit", async () => {
			const action = "Login";
			const date = new Date();
			const details = "User Login";
			const identity = "admin";
			const origin = "web";
			const status = "sucesso";
	
			const result = await securityFacade.createAudit({
				action, 
				date, 
				details, 
				identity, 
				origin, 
				status
			});
	
			expect(result).toBeInstanceOf(AuditEntityModel);
		});
	});
});