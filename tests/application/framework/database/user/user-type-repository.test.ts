import { IdValueObject } from "@/domain/shared";
import { DatabaseHelper, UserTypeRepository } from "@/application/framework";
import { UserTypeEntityModel } from "@/domain/user";

describe("UserTypeRepository", () => {
	const databaseHelper = new DatabaseHelper("user");



	afterEach(async () => {
		await databaseHelper.disconnect();
	});

	describe("getByUserTypeId", () => {
		it("should get user type by id", async () => {
			const userTypeRepository = new UserTypeRepository(databaseHelper);

			const userTypeId = IdValueObject.create(1) as IdValueObject;
			const result = await userTypeRepository.getByUserTypeId(userTypeId);

			expect(result).toBeInstanceOf(UserTypeEntityModel);
		});
	});

	describe("getAll", () => {
		it("should get all user types", async () => {
			const userTypeRepository = new UserTypeRepository(databaseHelper);

			const result = await userTypeRepository.getAll();

			expect(result).toBeInstanceOf(Array);
			expect(result.every((item) => item instanceof UserTypeEntityModel)).toBeTruthy();
		});
	});
});