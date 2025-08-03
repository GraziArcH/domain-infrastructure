import { AuditEntityModel } from "@/domain/security";

describe("AuditEntityModel", () => {
	it("should return an error if auditId is invalid", () => {
		const invalidAuditId = -1;
		const validAction = "read";
		const validDate = new Date();
		const validDetails = "Read operation details";
		const validIdentity = "user123";
		const validOrigin = "web";
		const validStatus = "success";

		const sut = () => AuditEntityModel.create(
			{
				auditId: invalidAuditId,
				action: validAction,
				date: validDate,
				details: validDetails,
				identity: validIdentity,
				origin: validOrigin,
				status: validStatus
			}
		);

		expect(sut).toThrow(Error);
	});

	it("should return an error if action is invalid", () => {
		const validAuditId = 1;
		const invalidAction = "c".repeat(100);
		const validDate = new Date();
		const validDetails = "Read operation details";
		const validIdentity = "user123";
		const validOrigin = "web";
		const validStatus = "sucesso";

		const sut = () => AuditEntityModel.create(
			{
				auditId: validAuditId,
				action: invalidAction,
				date: validDate,
				details: validDetails,
				identity: validIdentity,
				origin: validOrigin,
				status: validStatus
			}
		);

		expect(sut).toThrow(Error);
	});

	it("should return an error if details is invalid", () => {
		const validAuditId = 1;
		const validAction = "read";
		const validDate = new Date();
		const invalidDetails = "c".repeat(256);
		const validIdentity = "user123";
		const validOrigin = "web";
		const validStatus = "sucesso";

		const sut = () => AuditEntityModel.create(
			{
				auditId: validAuditId,
				action: validAction,
				date: validDate,
				details: invalidDetails,
				identity: validIdentity,
				origin: validOrigin,
				status: validStatus
			}
		);

		expect(sut).toThrow(Error);
	});

	it("should return an error if identity is invalid", () => {
		const validAuditId = 1;
		const validAction = "read";
		const validDate = new Date();
		const validDetails = "Read operation details";
		const invalidIdentity = "c".repeat(256);
		const validOrigin = "web";
		const validStatus = "sucesso";

		const sut = () => AuditEntityModel.create(
			{
				auditId: validAuditId,
				action: validAction,
				date: validDate,
				details: validDetails,
				identity: invalidIdentity,
				origin: validOrigin,
				status: validStatus
			}
		);

		expect(sut).toThrow(Error);
	});

	it("should return an error if origin is invalid", () => {
		const validAuditId = 1;
		const validAction = "read";
		const validDate = new Date();
		const validDetails = "Read operation details";
		const validIdentity = "user123";
		const invalidOrigin = "c".repeat(256);
		const validStatus = "sucesso";

		const sut = () => AuditEntityModel.create(
			{
				auditId: validAuditId,
				action: validAction,
				date: validDate,
				details: validDetails,
				identity: validIdentity,
				origin: invalidOrigin,
				status: validStatus
			}
		);

		expect(sut).toThrow(Error);
	});

	it("should return an error if status is invalid", () => {
		const validAuditId = 1;
		const validAction = "read";
		const validDate = new Date();
		const validDetails = "Read operation details";
		const validIdentity = "user123";
		const validOrigin = "web";
		const invalidStatus = "sucess";

		const sut = () => AuditEntityModel.create(
			{
				auditId: validAuditId,
				action: validAction,
				date: validDate,
				details: validDetails,
				identity: validIdentity,
				origin: validOrigin,
				status: invalidStatus
			}
		);

		expect(sut).toThrow(Error);
	});
    
	it("should create an AuditEntityModel instance with valid inputs", () => {
		const validAuditId = 1;
		const validAction = "read";
		const validDate = new Date();
		const validDetails = "Read operation details";
		const validIdentity = "user123";
		const validOrigin = "web";
		const validStatus = "sucesso";

		const sut = AuditEntityModel.create(
			{
				auditId: validAuditId,
				action: validAction,
				date: validDate,
				details: validDetails,
				identity: validIdentity,
				origin: validOrigin,
				status: validStatus
			}
		);

		expect(sut).toBeInstanceOf(AuditEntityModel);
	});
});