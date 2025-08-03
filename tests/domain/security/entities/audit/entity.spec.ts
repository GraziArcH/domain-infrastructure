import { IAuditRepository, AuditEntity, AuditEntityModel } from "@/domain/security";

describe("AuditEntity", () => {
	let mockRepository: IAuditRepository;
	let auditEntity: AuditEntity;

	beforeEach(() => {
		mockRepository = {
			create: jest.fn(),
		};

		auditEntity = new AuditEntity(mockRepository);
	});

	describe("create", () => {
		it("should return InvalidAuditEntityModelError for an invalid audit entity model", async () => {
			const invalidAction = "";
			const invalidDate = new Date("invalid");
			const invalidDetails = "";
			const invalidIdentity = "";
			const invalidOrigin = "";
			const invalidStatus = "";

			const result = auditEntity.create(
				{
					action: invalidAction,
					date: invalidDate,
					details: invalidDetails,
					identity: invalidIdentity,
					origin: invalidOrigin,
					status: invalidStatus
				}
			);

			expect(result).rejects.toThrow(Error);
		});

		it("should create audit", async () => {
			const action = "Action";
			const date = new Date();
			const details = "Details";
			const identity = "Identity";
			const origin = "Origin";
			const status = "sucesso";

			const mockAuditEntityModel = AuditEntityModel.create(
				{
					auditId: 1,
					action,
					date,
					details,
					identity,
					origin,
					status,
				}
			);

			jest.spyOn(mockRepository, "create").mockReturnValueOnce(Promise.resolve(mockAuditEntityModel as AuditEntityModel));

			const result = await auditEntity.create(
				{
					action,
					date,
					details,
					identity,
					origin,
					status,
				}
			);

			expect(result).toEqual(mockAuditEntityModel);
		});
	});
});