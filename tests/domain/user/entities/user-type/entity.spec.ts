import { IUserTypeRepository, UserTypeEntity, UserTypeEntityModel } from "@/domain/user";

describe("UserTypeEntity", () => {
	let mockRepository: IUserTypeRepository;
	let userTypeEntity: UserTypeEntity;
	const mockUserTypeEntity = UserTypeEntityModel.create({ userTypeId: 1, userType: "Trader" });

	beforeEach(() => {
		mockRepository = {
			getByUserTypeId: jest.fn(),
			getAll: jest.fn(),
		};

		userTypeEntity = new UserTypeEntity(mockRepository);
	});

	describe("getById", () => {
		it("should return InvalidIdValueObjectError for an invalid user type id", async () => {
			const invalidUserTypeId = 0;

			const result = userTypeEntity.getById(invalidUserTypeId);

			expect(result).rejects.toThrow(Error);
		});

		it("should return user type", async () => {
			const validUserTypeId = 1;
			jest.spyOn(mockRepository, "getByUserTypeId").mockReturnValueOnce(
				Promise.resolve(mockUserTypeEntity as UserTypeEntityModel)
			);

			const result = await userTypeEntity.getById(validUserTypeId);

			expect(result).toEqual(mockUserTypeEntity);
		});
	});

	describe("getAll", () => {
		it("should return all user types", async () => {
			jest.spyOn(mockRepository, "getAll").mockReturnValueOnce(
				Promise.resolve([mockUserTypeEntity as UserTypeEntityModel])
			);

			const result = await userTypeEntity.getAll();

			expect(result).toEqual([mockUserTypeEntity]);
		});
	});
});