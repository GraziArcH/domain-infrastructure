import { IUserPhoneRepository, UserPhoneEntity, UserPhoneEntityModel } from "@/domain/user";

describe("UserPhoneEntity", () => {
	let mockRepository: IUserPhoneRepository;
	let userPhoneEntity: UserPhoneEntity;
	const mockPhoneEntityModel = UserPhoneEntityModel.create({
		phoneId: 1, userId: 1, phone: "11958547879", whatsapp: true, telegram: true, type: "comercial"
	});

	beforeEach(() => {
		mockRepository = {
			create: jest.fn(),
			getPhoneByPhone: jest.fn(),
			getPhoneByUserId: jest.fn(),
			update: jest.fn(),
			getPhoneById: jest.fn(),
			delete: jest.fn(),
			deleteByUserId: jest.fn()
		};

		userPhoneEntity = new UserPhoneEntity(mockRepository);
	});

	describe("create", () => {
		it("should return InvalidUserPhoneEntityModelError for an invalid phone entity model", async () => {
			const invalidPhone = "invalid";
			const invalidType = "invalid";
			const userId = 1;

			const result = userPhoneEntity.create({ userId, phone: invalidPhone, whatsapp: true, telegram: true, type: invalidType });

			expect(result).rejects.toThrow(Error);
		});

		it("should return Error for an existing phone", async () => {
			const userId = 1;
			jest.spyOn(mockRepository, "getPhoneByPhone").mockReturnValueOnce(Promise.resolve(mockPhoneEntityModel as UserPhoneEntityModel));

			const result = userPhoneEntity.create({ userId, phone: "11958547879", whatsapp: true, telegram: true, type: "comercial" });

			expect(result).rejects.toThrow(Error);
		});

		it("should create phone", async () => {
			const userId = 1;
			jest.spyOn(mockRepository, "getPhoneByPhone").mockReturnValueOnce(null);
			jest.spyOn(mockRepository, "create").mockReturnValueOnce(Promise.resolve(mockPhoneEntityModel as UserPhoneEntityModel));

			const result = await userPhoneEntity.create({ userId, phone: "11958547879", whatsapp: true, telegram: true, type: "comercial" });

			expect(result).toEqual(mockPhoneEntityModel);
		});
	});

	describe("getByUserIdId", () => {
		it("should return InvalidIdValueObjectError for an invalid user id", async () => {
			const invalidUserId = 0;

			const result = userPhoneEntity.getByUserId(invalidUserId);

			expect(result).rejects.toThrow(Error);
		});

		it("should return user phones", async () => {
			const userId = 1;
			jest.spyOn(mockRepository, "getPhoneByUserId").mockReturnValueOnce(
				Promise.resolve([mockPhoneEntityModel as UserPhoneEntityModel])
			);

			const result = await userPhoneEntity.getByUserId(userId);

			expect(result).toEqual([mockPhoneEntityModel]);
		});
	});

	describe("update", () => {
		it("should return InvalidUserPhoneEntityModelError for an invalid phone entity model", async () => {
			const userId = 1;
			const phoneId = 1;
			const invalidPhone = "invalid";
			const invalidType = "invalid";

			const result = userPhoneEntity.update({ phoneId, userId, phone: invalidPhone, whatsapp: true, telegram: true, type: invalidType });

			expect(result).rejects.toThrow(Error);
		});

		it("should return Error for a non-existing phone", async () => {
			const userId = 1;
			const phoneId = 1;
			jest.spyOn(mockRepository, "getPhoneById").mockReturnValueOnce(null);

			const result = userPhoneEntity.update({ userId, phoneId, phone: "11958547879", whatsapp: true, telegram: true, type: "comercial" });

			expect(result).rejects.toThrow(Error);
		});

		it("should update phone", async () => {
			const userId = 1;
			const phoneId = 1;
			jest.spyOn(mockRepository, "getPhoneById").mockReturnValueOnce(Promise.resolve(mockPhoneEntityModel as UserPhoneEntityModel));
			jest.spyOn(mockRepository, "update").mockReturnValueOnce(Promise.resolve(mockPhoneEntityModel as UserPhoneEntityModel));

			const result = await userPhoneEntity.update({ 
				userId, 
				phoneId, 
				phone: "11958547879", 
				whatsapp: true, 
				telegram: true, 
				type: "comercial" 
			});

			expect(result).toEqual(mockPhoneEntityModel);
		});
	});

	describe("delete", () => {
		it("should return InvalidIdValueObjectError for an invalid phone id", async () => {
			const invalidPhoneId = 0;

			const result = userPhoneEntity.delete(invalidPhoneId);

			expect(result).rejects.toThrow(Error);
		});

		it("should return Error for a non-existing phone", async () => {
			const phoneId = 1;
			jest.spyOn(mockRepository, "getPhoneById").mockReturnValueOnce(null);

			const result = userPhoneEntity.delete(phoneId);

			expect(result).rejects.toThrow(Error);
		});

		it("should delete phone", async () => {
			const phoneId = 1;
			const userId = 1;
			const mockPhoneEntityModel = UserPhoneEntityModel.create({
				phoneId, userId, phone: "11985878080", whatsapp: true, telegram: true, type: "comercial"
			});
			jest.spyOn(mockRepository, "getPhoneById").mockReturnValueOnce(Promise.resolve(mockPhoneEntityModel as UserPhoneEntityModel));
			jest.spyOn(mockRepository, "delete").mockReturnValueOnce(Promise.resolve(mockPhoneEntityModel as UserPhoneEntityModel));

			const result = await userPhoneEntity.delete(phoneId);

			expect(result).toEqual(mockPhoneEntityModel);
		});
	});
});