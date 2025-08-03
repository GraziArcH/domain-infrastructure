import { UserTypeEntityModel } from "@/domain/user";

describe("UserTypeEntityModel", () => {

	it("should return error if user type id is invalid", () => {
		const invalidUserTypeId = -1;
		const userType = "consumer";

		const sut = () => UserTypeEntityModel.create({ userTypeId: invalidUserTypeId, userType });

		expect(sut).toThrow(Error);
	});

	it("should return error if user type is invalid", () => {
		const validUserTypeId = 1;
		const invalidUserType = "";

		const sut = () => UserTypeEntityModel.create({ userTypeId: validUserTypeId, userType: invalidUserType });

		expect(sut).toThrow(Error);
	});

	it("should create a UserTypeEntityModel instance with valid user type id and user type", () => {
		const validUserTypeId = 1;
		const validUserType = "consumer";

		const sut = UserTypeEntityModel.create({ userTypeId: validUserTypeId, userType: validUserType });

		expect(sut).toBeInstanceOf(UserTypeEntityModel);
	});
});