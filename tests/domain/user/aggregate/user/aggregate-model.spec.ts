import { UserAggregateModel } from "@/domain/user";

describe("UserAggregateModel", () => {
	it("should return an error if userId is invalid", () => {
		const invalidUserId = -1;
		const validKeycloakUserId = "2";
		const validCompanyId = 4;
		const validName = "John Doe";
		const validSurname = "Filt";
		const validCPF = "123.456.789-09";
		const validUserTypeId = 1;
		const validAdmin = true;
		const validActive = true;
		const validDate = new Date();

		const sut = () => UserAggregateModel.create(
			{
				userId: invalidUserId,
				idpUserId: validKeycloakUserId,
				companyId: validCompanyId,
				name: validName,
				surname: validSurname,
				cpf: validCPF,
				userTypeId: validUserTypeId,
				admin: validAdmin,
				active: validActive,
				createdAt: validDate
			}
		);

		expect(sut).toThrow(Error);
	});

	it("should return an error if idpUserId is invalid", () => {
		const validUserId = 1;
		const invalidKeycloakUserId = "";
		const validCompanyId = 4;
		const validName = "John Doe";
		const validSurname = "Filt";
		const validCPF = "123.456.789-09";
		const validUserTypeId = 1;
		const validAdmin = true;
		const validActive = true;
		const validDate = new Date();

		const sut = () => UserAggregateModel.create(
			{
				userId: validUserId,
				idpUserId: invalidKeycloakUserId,
				companyId: validCompanyId,
				name: validName,
				surname: validSurname,
				cpf: validCPF,
				userTypeId: validUserTypeId,
				admin: validAdmin,
				active: validActive,
				createdAt: validDate
			}
		);

		expect(sut).toThrow(Error);
	});

	it("should return an error if companyId is invalid", () => {
		const validUserId = 1;
		const validKeycloakUserId = "2";
		const invalidCompanyId = -4;
		const validName = "John Doe";
		const validSurname = "Filt";
		const validCPF = "123.456.789-09";
		const validUserTypeId = 1;
		const validAdmin = true;
		const validActive = true;
		const validDate = new Date();

		const sut = () => UserAggregateModel.create(
			{
				userId: validUserId,
				idpUserId: validKeycloakUserId,
				companyId: validUserTypeId,
				name: validName,
				surname: validSurname,
				cpf: validCPF,
				userTypeId: invalidCompanyId,
				admin: validAdmin,
				active: validActive,
				createdAt: validDate
			}
		);

		expect(sut).toThrow(Error);
	});

	it("should return an error if name is invalid", () => {
		const validUserId = 1;
		const validKeycloakUserId = "2";
		const validCompanyId = 4;
		const invalidName = "c".repeat(100);
		const validSurname = "doe";
		const validCPF = "123.456.789-09";
		const validUserTypeId = 1;
		const validAdmin = true;
		const validActive = true;
		const validDate = new Date();

		const sut = () => UserAggregateModel.create(
			{
				userId: validUserId,
				idpUserId: validKeycloakUserId,
				companyId: validCompanyId,
				name: invalidName,
				surname: validSurname,
				cpf: validCPF,
				userTypeId: validUserTypeId,
				admin: validAdmin,
				active: validActive,
				createdAt: validDate
			}
		);

		expect(sut).toThrow(Error);
	});

	it("should return an error if surnaname is invalid", () => {
		const validUserId = 1;
		const validKeycloakUserId = "2";
		const validCompanyId = 4;
		const validName = "John";
		const invalidSurname =  "c".repeat(100);
		const validCPF = "123.456.789-09";
		const validUserTypeId = 1;
		const validAdmin = true;
		const validActive = true;
		const validDate = new Date();

		const sut = () => UserAggregateModel.create(
			{
				userId: validUserId,
				idpUserId: validKeycloakUserId,
				companyId: validCompanyId,
				name: validName,
				surname: invalidSurname,
				cpf: validCPF,
				userTypeId: validUserTypeId,
				admin: validAdmin,
				active: validActive,
				createdAt: validDate
			}
		);

		expect(sut).toThrow(Error);
	});


	it("should return an error if cpf is invalid", () => {
		const validUserId = 1;
		const validKeycloakUserId = "2";
		const validCompanyId = 4;
		const validName = "John Doe";
		const validSurname = "Filt";
		const invalidCPF = "123.";
		const validUserTypeId = 1;
		const validAdmin = true;
		const validActive = true;
		const validDate = new Date();

		const sut = () => UserAggregateModel.create(
			{
				userId: validUserId,
				idpUserId: validKeycloakUserId,
				companyId: validCompanyId,
				name: validName,
				surname: validSurname,
				cpf: invalidCPF,
				userTypeId: validUserTypeId,
				admin: validAdmin,
				active: validActive,
				createdAt: validDate
			}
		);

		expect(sut).toThrow(Error);
	});

	it("should return an error if position is invalid", () => {
		const validUserId = 1;
		const validKeycloakUserId = "2";
		const validCompanyId = 4;
		const validName = "John Doe";
		const validSurname = "Filt";
		const validCPF = "123.456.789-09";
		const invalidUserTypeId = -1;
		const validAdmin = true;
		const validActive = true;
		const validDate = new Date();

		const sut = () => UserAggregateModel.create(
			{
				userId: validUserId,
				idpUserId: validKeycloakUserId,
				companyId: validCompanyId,
				name: validName,
				surname: validSurname,
				cpf: validCPF,
				userTypeId: invalidUserTypeId,
				admin: validAdmin,
				active: validActive,
				createdAt: validDate
			}
		);

		expect(sut).toThrow(Error);
	});
    
	it("should create a UserAggregateModel instance with valid inputs", () => {
		const validUserId = 1;
		const validKeycloakUserId = "2";
		const validCompanyId = 4;
		const validName = "John Doe";
		const validSurname = "Filt";
		const validCPF = "123.456.789-09";
		const validUserTypeId = 1;
		const validAdmin = true;
		const validActive = true;
		const validDate = new Date();

		const sut = UserAggregateModel.create(
			{
				userId: validUserId,
				idpUserId: validKeycloakUserId,
				companyId: validCompanyId,
				name: validName,
				surname: validSurname,
				cpf: validCPF,
				userTypeId: validUserTypeId,
				admin: validAdmin,
				active: validActive,
				createdAt: validDate
			}
		);

		expect(sut).toBeInstanceOf(UserAggregateModel);
	});
});