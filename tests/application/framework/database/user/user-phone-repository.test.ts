import { IdValueObject } from "@/domain/shared";
import { DatabaseHelper, MockUserDatabase, UserPhoneRepository } from "@/application/framework";
import { PhoneValueObject, UserPhoneEntityModel } from "@/domain/user";

describe("UserPhoneRepository", () => {
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
		it("should create a new user phone", async () => {
			const userPhoneRepository = new UserPhoneRepository(databaseHelper);
			const userPhoneData = UserPhoneEntityModel.create({
				phoneId: 1, userId: 1, phone: "11958088780", whatsapp: true, telegram: true, type: "comercial"
			}) as UserPhoneEntityModel;

			const result = await userPhoneRepository.create(userPhoneData);

			expect(result).toBeInstanceOf(UserPhoneEntityModel);
			expect(result.phone.value).toEqual(userPhoneData.phone.value);
		});
	});

	describe("getPhoneById", () => {
		it("should get user phone by id", async () => {
			const userPhoneRepository = new UserPhoneRepository(databaseHelper);

			const phoneId = IdValueObject.create(1) as IdValueObject;
			const result = await userPhoneRepository.getPhoneById(phoneId);

			expect(result).toBeInstanceOf(UserPhoneEntityModel);
			expect(result.phoneId.value).toEqual(phoneId.value);
		});
	});

	describe("getPhoneByPhone", () => {
		it("should get user phone by phone number", async () => {
			const userPhoneRepository = new UserPhoneRepository(databaseHelper);
			const phone = PhoneValueObject.create("11974745809") as PhoneValueObject;

			const result = await userPhoneRepository.getPhoneByPhone(phone);

			expect(result).toBeInstanceOf(UserPhoneEntityModel);
			expect(result.phone.value).toEqual(phone.value);
		});
	});

	describe("getPhoneByUserId", () => {
		it("should get user phones by user id", async () => {
			const userPhoneRepository = new UserPhoneRepository(databaseHelper);
			const userId = IdValueObject.create(1) as IdValueObject;

			const result = await userPhoneRepository.getPhoneByUserId(userId);

			expect(result).toBeInstanceOf(Array);
			expect(result.every((item) => item instanceof UserPhoneEntityModel)).toBeTruthy();
		});
	});

	describe("update", () => {
		it("should update user phone", async () => {
			const userPhoneRepository = new UserPhoneRepository(databaseHelper);
			const phoneId = IdValueObject.create(1) as IdValueObject;
			const updatedUserPhoneData = UserPhoneEntityModel.create({
				phoneId: 1, userId: 1, phone: "11958088781", whatsapp: true, telegram: true, type: "comercial"
			}) as UserPhoneEntityModel;

			const result = await userPhoneRepository.update(updatedUserPhoneData);

			expect(result).toBeInstanceOf(UserPhoneEntityModel);
			expect(result.phoneId.value).toEqual(phoneId.value);
			expect(result.phone.value).toEqual(updatedUserPhoneData.phone.value);
			expect(result.whatsapp).toEqual(updatedUserPhoneData.whatsapp);
			expect(result.telegram).toEqual(updatedUserPhoneData.telegram);
			expect(result.type.value).toEqual(updatedUserPhoneData.type.value);
		});
	});

	describe("delete", () => {
		it("should delete user phone", async () => {
			const userPhoneRepository = new UserPhoneRepository(databaseHelper);
			const phoneId = IdValueObject.create(1) as IdValueObject;

			const result = await userPhoneRepository.delete(phoneId);

			expect(result).toBeInstanceOf(UserPhoneEntityModel);
			expect(result.phoneId.value).toEqual(phoneId.value);
		});
	});

	describe("deleteByUserId", () => {
		it("should delete user phones by user id", async () => {
			const userPhoneRepository = new UserPhoneRepository(databaseHelper);
			const userId = IdValueObject.create(1) as IdValueObject;

			const result = await userPhoneRepository.deleteByUserId(userId);

			expect(result).toBeInstanceOf(Array);
			expect(result.every((item) => item instanceof UserPhoneEntityModel)).toBeTruthy();
		});
	});
});