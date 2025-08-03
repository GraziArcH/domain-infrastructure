import { IUserEmailRepository, UserEmailEntity, UserEmailEntityModel } from "@/domain/user";

describe("UserEmailEntity", () => {
	let mockRepository: IUserEmailRepository;
	let userEmailEntity: UserEmailEntity;
	const mockEntityUserModel = UserEmailEntityModel.create({
		emailId: 1, userId: 1, email: "email@test.com", type: "comercial"
	});

	beforeEach(() => {
		mockRepository = {
			create: jest.fn(),
			getEmailByEmail: jest.fn(),
			getEmailByUserId: jest.fn(),
			update: jest.fn(),
			getEmailById: jest.fn(),
			delete: jest.fn(),
			deleteByUserId: jest.fn()
		};

		userEmailEntity = new UserEmailEntity(mockRepository);
	});

	describe("create", () => {
		it("should return InvalidUserEmailEntityModelError for an invalid email entity model", async () => {
			const invalidEmail = "invalid";
			const invalidType = "invalid";
			const userId = 1;

			const result = userEmailEntity.create({ userId, email: invalidEmail, type: invalidType });

			expect(result).rejects.toThrow(Error);
		});

		it("should return Error for an existing email", async () => {
			const userId = 1;

			jest.spyOn(mockRepository, "getEmailByEmail").mockReturnValueOnce(Promise.resolve(mockEntityUserModel as UserEmailEntityModel));

			const result = userEmailEntity.create({ userId, email: "email@test.com", type: "comercial" });

			expect(result).rejects.toThrow(Error);
		});

		it("should create email", async () => {
			const userId = 1;
			jest.spyOn(mockRepository, "getEmailByEmail").mockReturnValueOnce(null);
			jest.spyOn(mockRepository, "create").mockReturnValueOnce(Promise.resolve(mockEntityUserModel as UserEmailEntityModel));

			const result = await userEmailEntity.create({ userId, email: "email@test.com", type: "comercial" });

			expect(result).toEqual(mockEntityUserModel);
		});
	});

	describe("getEmailByUserId", () => {
		it("should return InvalidIdValueObjectError for an invalid user id", async () => {
			const invalidUserId = 0;

			const result = userEmailEntity.getEmailByUserId(invalidUserId);

			expect(result).rejects.toThrow(Error);
		});

		it("should return user emails", async () => {
			const userId = 1;

			jest.spyOn(mockRepository, "getEmailByUserId").mockReturnValueOnce(
				Promise.resolve([mockEntityUserModel as UserEmailEntityModel])
			);

			const result = await userEmailEntity.getEmailByUserId(userId);

			expect(result).toEqual([mockEntityUserModel]);
		});
	});

	describe("update", () => {
		it("should return InvalidUserEmailEntityModelError for an invalid email entity model", async () => {
			const emailId = 1;
			const userId = 1;
			const invalidEmail = "invalid";
			const invalidType = "invalid";

			const result = userEmailEntity.update({ emailId, userId, email: invalidEmail, type: invalidType });

			expect(result).rejects.toThrow(Error);
		});

		it("should return Error for a non-existing email", async () => {
			const emailId = 1;
			const userId = 1;
			jest.spyOn(mockRepository, "getEmailById").mockReturnValueOnce(null);

			const result = userEmailEntity.update({ emailId, userId, email: "email@test.com", type: "comercial" });

			expect(result).rejects.toThrow(Error);
		});

		it("should update email", async () => {
			const emailId = 1;
			const userId = 1;
			jest.spyOn(mockRepository, "getEmailById").mockReturnValueOnce(Promise.resolve(mockEntityUserModel as UserEmailEntityModel));
			jest.spyOn(mockRepository, "update").mockReturnValueOnce(Promise.resolve(mockEntityUserModel as UserEmailEntityModel));

			const result = await userEmailEntity.update({ emailId, userId, email: "email@test.com", type: "comercial" });

			expect(result).toEqual(mockEntityUserModel);
		});
	});

	describe("delete", () => {
		it("should return InvalidIdValueObjectError for an invalid email id", async () => {
			const invalidEmailId = 0;

			const result = userEmailEntity.delete(invalidEmailId);

			expect(result).rejects.toThrow(Error);
		});

		it("should return Error for a non-existing email", async () => {
			const emailId = 1;
			jest.spyOn(mockRepository, "getEmailById").mockReturnValueOnce(null);

			const result = userEmailEntity.delete(emailId);

			expect(result).rejects.toThrow(Error);
		});

		it("should delete email", async () => {
			const emailId = 1;
			const userId = 1;
			const mockEntityUserModel = UserEmailEntityModel.create({ emailId, userId, email: "email@test.com", type: "comercial" });
			jest.spyOn(mockRepository, "getEmailById").mockReturnValueOnce(Promise.resolve(mockEntityUserModel as UserEmailEntityModel));
			jest.spyOn(mockRepository, "delete").mockReturnValueOnce(Promise.resolve(mockEntityUserModel as UserEmailEntityModel));

			const result = await userEmailEntity.delete(emailId);

			expect(result).toEqual(mockEntityUserModel);
		});
	});

});