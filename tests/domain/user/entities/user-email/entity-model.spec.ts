import { UserEmailEntityModel } from "@/domain/user";

describe("UserEmailEntityModel", () => {
	it("should return an error if emailId is invalid", () => {
		const invalidEmailId = 0;

		const sut = () => UserEmailEntityModel.create({
			emailId: invalidEmailId, userId: 2, email: "user@example.com", type: "comercial"
		});

		expect(sut).toThrow(Error);
	});

	it("should return an error if userId is invalid", () => {
		const validEmailId = 1;
		const invalidUserId = 0;

		const sut = () => UserEmailEntityModel.create({
			emailId: validEmailId, userId: invalidUserId, email: "user@example.com", type: "comercial"
		});

		expect(sut).toThrow(Error);
	});

	it("should return an error if email is invalid", () => {
		const validEmailId = 1;
		const validUserId = 2;
		const invalidEmail = "invalid_email";

		const sut = () => UserEmailEntityModel.create({
			emailId: validEmailId, userId: validUserId, email: invalidEmail, type: "comercial"
		});

		expect(sut).toThrow(Error);
	});

	it("should return an error if type is invalid", () => {
		const validEmailId = 1;
		const validUserId = 2;
		const validEmail = "user@example.com";
		const invalidType = "invalid_type";

		const sut = () => UserEmailEntityModel.create({
			emailId: validEmailId, userId: validUserId, email: validEmail, type: invalidType
		});

		expect(sut).toThrow(Error);
	});

	it("should create a UserEmailEntityModel instance with valid inputs", () => {
		const validEmailId = 1;
		const validUserId = 2;
		const validEmail = "user@example.com";
		const validType = "comercial";

		const sut = UserEmailEntityModel.create({
			emailId: validEmailId, userId: validUserId, email: validEmail, type: validType
		});

		expect(sut).toBeInstanceOf(UserEmailEntityModel);
	});
});