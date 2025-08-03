import { IdValueObject } from "@/domain/shared";
import { DatabaseHelper, MockUserDatabase, UserRepository } from "@/application/framework";
import { CPFValueObject, IDPUserIdValueObject, UserAggregateModel } from "@/domain/user";

describe("UserRepository", () => {
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
		it("should create a new user", async () => {
			const userRepository = new UserRepository(databaseHelper);
			const userData = UserAggregateModel.create(
				{
					userId: 1,
					idpUserId: "4",
					companyId: 1,
					name: "John",
					surname: "Filt",
					cpf: "50848380053",
					userTypeId: 1,
					active: true,
					admin: true,
					createdAt: new Date()
				}
			) as UserAggregateModel;

			const result = await userRepository.create(userData);

			expect(result).toBeInstanceOf(UserAggregateModel);
			expect(result.idpUserId.value).toEqual(userData.idpUserId.value);
			expect(result.name).toEqual(userData.name);
			expect(result.cpf.value).toEqual(userData.cpf.value);
			expect(result.userTypeId.value).toEqual(userData.userTypeId.value);
			expect(result.admin).toEqual(userData.admin);
		});

	});

	describe("update", () => {
		it("should update user", async () => {
			const userRepository = new UserRepository(databaseHelper);
			const updatedUserData = UserAggregateModel.create(
				{
					userId: 1,
					idpUserId: "4",
					companyId: 1,
					name: "John",
					surname: "Filt",
					cpf: "74795411042",
					userTypeId: 1,
					active: true,
					admin: true,
					createdAt: new Date()
				}
			) as UserAggregateModel;

			const result = await userRepository.update(updatedUserData);

			expect(result).toBeInstanceOf(UserAggregateModel);
			expect(result.userId.value).toEqual(updatedUserData.userId.value);
			expect(result.name).toEqual(updatedUserData.name);
			expect(result.cpf.value).toEqual(updatedUserData.cpf.value);
			expect(result.userTypeId.value).toEqual(updatedUserData.userTypeId.value);
			expect(result.admin).toEqual(updatedUserData.admin);
		});
	});

	describe("getUserByCPF", () => {
		it("should get user by CPF", async () => {
			const userRepository = new UserRepository(databaseHelper);
			const cpf = CPFValueObject.create("74795411042") as CPFValueObject;

			const result = await userRepository.getUserByCPF(cpf);

			expect(result).toBeInstanceOf(UserAggregateModel);
		});
	});

	describe("getUsersTotalByCompanyId", () => {
		it("should get total users", async () => {
			const userRepository = new UserRepository(databaseHelper);
			const companyId = IdValueObject.create(1) as IdValueObject;

			const result = await userRepository.getUsersTotalByCompanyId(companyId);

			expect(result).toBe(3);
		});
	});

	describe("getUserById", () => {
		it("should get user by ID", async () => {
			const userRepository = new UserRepository(databaseHelper);
			const userId = IdValueObject.create(1) as IdValueObject;

			const result = await userRepository.getUserById(userId);

			expect(result).toBeInstanceOf(UserAggregateModel);
			expect(result.userId.value).toEqual(userId.value);
		});
	});

	describe("getUserByIDPUserId", () => {
		it("should get user by getUserByIDPUserId", async () => {
			const userRepository = new UserRepository(databaseHelper);
			const userId = IDPUserIdValueObject.create("1") as IDPUserIdValueObject;

			const result = await userRepository.getUserByIDPUserId(userId);

			expect(result).toBeInstanceOf(UserAggregateModel);
		});
	});

	describe("getUserIdByIDPUserId", () => {
		it("should get user id  by getUserByIDPUserId", async () => {
			const userRepository = new UserRepository(databaseHelper);
			const userId = IDPUserIdValueObject.create("1") as IDPUserIdValueObject;

			const result = await userRepository.getUserIdByIDPUserId(userId);

			expect(result).toBeInstanceOf(IdValueObject);
		});
	});

	describe("getUsersByIDPUserIdOfAdmin", () => {
		it("should get user by company id", async () => {
			const userRepository = new UserRepository(databaseHelper);
			const userId = IDPUserIdValueObject.create('00000000-0000-0000-000000000000') as IDPUserIdValueObject;

			const result = await userRepository.getUsersByIDPUserIdOfAdmin(userId);

			expect(result).toBeInstanceOf(Array);
			expect(result.every((item) => item instanceof UserAggregateModel)).toBeTruthy();
		});
	});

	describe("delete", () => {
		it("should delete user", async () => {
			const userRepository = new UserRepository(databaseHelper);
			const idpUserId = IDPUserIdValueObject.create("1") as IDPUserIdValueObject;

			const result = await userRepository.delete(idpUserId);

			expect(result).toBeInstanceOf(UserAggregateModel);
			expect(result.idpUserId.value).toEqual(idpUserId.value);
		});
	});

	describe("deleteByUserId", () => {
		it("should delete user", async () => {
			const userRepository = new UserRepository(databaseHelper);
			const userId = IdValueObject.create(1) as IdValueObject;

			const result = await userRepository.deleteByUserId(userId);

			expect(result).toBeInstanceOf(UserAggregateModel);
			expect(result.userId.value).toEqual(userId.value);
		});
	});
});