import { IdValueObject } from "@/domain/shared";
import { DatabaseHelper, MockUserDatabase, UserEmailRepository } from "@/application/framework";
import { EmailValueObject, UserEmailEntityModel } from "@/domain/user";

describe("UserEmailRepository", () => {
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
		it("should create a new user email", async () => {
			const userEmailRepository = new UserEmailRepository(databaseHelper);
			const userEmailData = UserEmailEntityModel.create({
				emailId: 1, userId: 1, email: "test@example.com", type: "comercial"
			});

			const result = await userEmailRepository.create(userEmailData);

			expect(result).toBeInstanceOf(UserEmailEntityModel);
			expect(result.email.value).toEqual(userEmailData.email.value);
		});

	});

	describe("getEmailById", () => {
		it("should get user email by id", async () => {
			const userEmailRepository = new UserEmailRepository(databaseHelper);
			const emailId = IdValueObject.create(1) as IdValueObject;

			const result = await userEmailRepository.getEmailById(emailId);

			expect(result).toBeInstanceOf(UserEmailEntityModel);
			expect(result.emailId.value).toEqual(emailId.value);
		});

	});

	describe("getEmailByUserId", () => {
		it("should get user emails by user id", async () => {
			const userEmailRepository = new UserEmailRepository(databaseHelper);
			const userId = IdValueObject.create(1) as IdValueObject;

			const result = await userEmailRepository.getEmailByUserId(userId);

			expect(result).toBeInstanceOf(Array);
			expect(result.every((item) => item instanceof UserEmailEntityModel)).toBeTruthy();
		});

	});

	describe("getEmailByEmail", () => {
		it("should get user email by email", async () => {
			const userEmailRepository = new UserEmailRepository(databaseHelper);
			const email = EmailValueObject.create("usuario1@email.com") as EmailValueObject;

			const result = await userEmailRepository.getEmailByEmail(email);

			expect(result).toBeInstanceOf(UserEmailEntityModel);
			expect(result.email.value).toEqual(email.value);
		});
	});

	describe("update", () => {
		it("should update user email", async () => {
			const userEmailRepository = new UserEmailRepository(databaseHelper);
			const updatedUserEmailData = UserEmailEntityModel.create({
				emailId: 1, userId: 1, email: "test5@example.com", type: "comercial"
			});

			const result = await userEmailRepository.update(updatedUserEmailData);

			expect(result).toBeInstanceOf(UserEmailEntityModel);
			expect(result.emailId.value).toEqual(updatedUserEmailData.emailId.value);
			expect(result.email.value).toEqual(updatedUserEmailData.email.value);
			expect(result.type.value).toEqual(updatedUserEmailData.type.value);
		});
	});

	describe("delete", () => {
		it("should delete user email", async () => {
			const userEmailRepository = new UserEmailRepository(databaseHelper);
			const emailId = IdValueObject.create(1) as IdValueObject;

			const result = await userEmailRepository.delete(emailId);

			expect(result).toBeInstanceOf(UserEmailEntityModel);
			expect(result.emailId.value).toEqual(emailId.value);
		});
	});

	describe("deleteByUserId", () => {
		it("should delete user emails by user id", async () => {
			const userEmailRepository = new UserEmailRepository(databaseHelper);

			const userId = IdValueObject.create(1) as IdValueObject;
			const result = await userEmailRepository.deleteByUserId(userId);

			expect(result).toBeInstanceOf(Array);
			expect(result.every((item) => item instanceof UserEmailEntityModel)).toBeTruthy();
		});
	});
});