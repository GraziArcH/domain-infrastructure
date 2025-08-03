import { UserPhoneEntityModel } from "@/domain/user";

describe("UserPhoneEntityModel", () => {
	it("should return an error if phoneId is invalid", () => {
		const invalidPhoneId = 0;

		const sut = () => UserPhoneEntityModel.create(
			{
				phoneId: invalidPhoneId,
				userId: 2,
				phone: "11962570789",
				whatsapp: true,
				telegram: false,
				type: "comercial"
			}
		);

		expect(sut).toThrow(Error);
	});

	it("should return an error if userId is invalid", () => {
		const validPhoneId = 1;
		const invalidUserId = 0;

		const sut = () => UserPhoneEntityModel.create(
			{
				phoneId: validPhoneId,
				userId: invalidUserId,
				phone: "11962570789",
				whatsapp: true,
				telegram: false,
				type: "comercial"
			}
		);

		expect(sut).toThrow(Error);
	});

	it("should return an error if phone is invalid", () => {
		const validPhoneId = 1;
		const validUserId = 2;
		const invalidPhone = "invalid_phone";

		const sut = () => UserPhoneEntityModel.create(
			{
				phoneId: validPhoneId,
				userId: validUserId,
				phone: invalidPhone,
				whatsapp: true,
				telegram: false,
				type: "comercial"
			}
		);

		expect(sut).toThrow(Error);
	});

	it("should return an error if type is invalid", () => {
		const validPhoneId = 1;
		const validUserId = 2;
		const validPhone = "11962570789";
		const validWhatsapp = true;
		const validTelegram = false;
		const invalidType = "invalid_type";

		const sut = () => UserPhoneEntityModel.create(
			{
				phoneId: validPhoneId,
				userId: validUserId,
				phone: validPhone,
				whatsapp: validWhatsapp,
				telegram: validTelegram,
				type: invalidType
			}
		);

		expect(sut).toThrow(Error);
	});

	it("should create a UserPhoneEntityModel instance with valid inputs", () => {
		const validPhoneId = 1;
		const validUserId = 2;
		const validPhone = "11962570789";
		const validWhatsapp = true;
		const validTelegram = false;
		const validType = "comercial";

		const sut = UserPhoneEntityModel.create(
			{
				phoneId: validPhoneId,
				userId: validUserId,
				phone: validPhone,
				whatsapp: validWhatsapp,
				telegram: validTelegram,
				type: validType
			}
		);

		expect(sut).toBeInstanceOf(UserPhoneEntityModel);
	});
});