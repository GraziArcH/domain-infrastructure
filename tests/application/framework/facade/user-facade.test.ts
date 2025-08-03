import { IdValueObject } from "@/domain/shared";
import { databaseUserHelper, userFacade } from "@/application/factories";
import { MockUserDatabase } from "@/application/framework";
import { UserAggregateModel, UserTypeEntityModel } from "@/domain/user";

describe("UserFacade", () => {
	const mockUserDatabase = new MockUserDatabase(databaseUserHelper);

	beforeEach(async () => {
		await mockUserDatabase.createMocks();
	});

	afterEach(async () => {
		await mockUserDatabase.clearTables();
		await databaseUserHelper.disconnect();
	});

	describe("getUsersByIDPUserIdOfAdmin", () => {
		it("should return an error if the user does not exist", async () => {
			const idpUserId = "999";

			const result = userFacade.getUsersByIDPUserIdOfAdmin(idpUserId);

			await expect(result).rejects.toThrow(Error);
		});

		it("should return an error if the user is not an admin", async () => {
			const idpUserId = "3";

			const result = userFacade.getUsersByIDPUserIdOfAdmin(idpUserId);

			await expect(result).rejects.toThrow(Error);
		});

		it("should return the users of the company for an admin user", async () => {
			const idpUserId = "1";

			const result = await userFacade.getUsersByIDPUserIdOfAdmin(idpUserId, 1, 1) as {
				limit: number;
				offset: number;
				total: number;
				data: UserAggregateModel[];
			};

			expect(result.limit).toBe(1);
			expect(result.offset).toBe(1);
			expect(result.total).toBe(3);
			expect(result.data.every((item) => item instanceof UserAggregateModel)).toBeTruthy();
		});
	});

	describe("getUsersByIDPUserIdOfAdmin", () => {
		it("should return the users of keycloak user id", async () => {
			const idpUserId = "1";

			const result = await userFacade.getUserByIDPUserId(idpUserId);

			expect(result).toBeInstanceOf(UserAggregateModel);
		});
	});

	describe("getUserIdByIDPUserId", () => {
		it("should return the user id of keycloak user id", async () => {
			const idpUserId = "1";

			const result = await userFacade.getUserIdByIDPUserId(idpUserId);

			expect(result).toBeInstanceOf(IdValueObject);
		});
	});

	describe("updateUser", () => {
		it("should return an error when updating a non-existing user", async () => {
			const idpUserId = "999";
			const name = "John Doe";
			const surname = "Filt";
			const phones = [{ phoneId: 1, phone: "123456789", type: "Mobile" }];

			const result = userFacade.updateUser({
				idpUserId, name, surname, phones
			});

			await expect(result).rejects.toThrow(Error);
		});

		it("should return an error when updating with invalid phone data", async () => {
			const idpUserId = "1";
			const name = "Jane Smith";
			const surname = "Filt";
			const phones = [{ phoneId: 1, phone: "123", type: "Mobile" }];

			const result = userFacade.updateUser({
				idpUserId, name, surname, phones
			});

			await expect(result).rejects.toThrow(Error);
		});

		it("should return an error when updating with invalid keycloack ID", async () => {
			const idpUserId = "";
			const name = "John Doe";
			const surname = "Filt";
			const phones = [{ phoneId: 1, phone: "123456789", type: "Mobile" }];

			const result = userFacade.updateUser({
				idpUserId, name, surname, phones
			});

			await expect(result).rejects.toThrow(Error);
		});

		it("should update user information", async () => {
			const idpUserId = "1";
			const name = "Jane Smith";
			const surname = "Filt";
			const phones = [{ phoneId: 1, phone: "11952878015", type: "comercial" }];

			const result = await userFacade.updateUser({
				idpUserId, name, surname, phones
			});

			expect(result).toBeInstanceOf(UserAggregateModel);
		});
	});

	describe("updateUserByAdmin", () => {
		it("should return an error if the admin user does not exist", async () => {
			const idpUserId = "999";
			const userIdToBeUpdated = 2;
			const name = "John Doe";
			const surname = "Filt";
			const userTypeId = 1;
			const phones = [{ phoneId: 1, phone: "11952878015", type: "Mobile" }];
			const admin = true;
			const active = true;

			const result = userFacade.updateUserByAdmin(
				{
					idpUserId, 
					userIdToBeUpdated, 
					name, 
					surname, 
					userTypeId, 
					phones, 
					admin,
					active	
				}
			);

			await expect(result).rejects.toThrow(Error);
		});

		it("should return an error if the user is not an admin", async () => {
			const idpUserId = "2";
			const userIdToBeUpdated = 2;
			const name = "John Doe";
			const surname = "Filt";
			const userTypeId = 1;
			const phones = [{ phoneId: 1, phone: "11952878015", type: "Mobile" }];
			const admin = true;
			const active = true;

			const result = userFacade.updateUserByAdmin(
				{
					idpUserId, 
					userIdToBeUpdated, 
					name, 
					surname, 
					userTypeId, 
					phones, 
					admin,
					active
				}
			);

			await expect(result).rejects.toThrow(Error);
		});

		it("should return an error if the user to be updated does not exist", async () => {
			const idpUserId = "1";
			const userIdToBeUpdated = 999;
			const name = "John Doe";
			const surname = "Filt";
			const userTypeId = 1;
			const phones = [{ phoneId: 1, phone: "11952878015", type: "Mobile" }];
			const admin = true;
			const active = true;

			const result = userFacade.updateUserByAdmin(
				{
					idpUserId, 
					userIdToBeUpdated, 
					name, 
					surname, 
					userTypeId, 
					phones, 
					admin,
					active	
				}
			);

			await expect(result).rejects.toThrow(Error);
		});

		it("should update user information by admin", async () => {
			const idpUserId = "1";
			const userIdToBeUpdated = 2;
			const name = "Jane Smith";
			const surname = "Filt";
			const userTypeId = 1;
			const phones = [{ phoneId: 1, phone: "11952878015", type: "comercial" }];
			const admin = true;
			const active = true;

			const result = await userFacade.updateUserByAdmin(
				{
					idpUserId, 
					userIdToBeUpdated, 
					name, 
					surname, 
					userTypeId, 
					phones, 
					admin,
					active
				}
			);

			expect(result).toBeInstanceOf(UserAggregateModel);
		});
	});

	describe("delete", () => {
		it("should return an error when deleting a non-existing user", async () => {
			const idpUserId = "999";

			const result = userFacade.delete(idpUserId);

			await expect(result).rejects.toThrow(Error);
		});

		it("should return an error when deleting an admin user", async () => {
			const idpUserId = "1";

			const result = userFacade.delete(idpUserId);

			await expect(result).rejects.toThrow(Error);
		});

		it("should not delete, because id is invalid", async () => {
			const idpUserId = "";

			const result = userFacade.delete(idpUserId);

			await expect(result).rejects.toThrow(Error);
		});

		it("should delete a user", async () => {
			const idpUserId = "2";

			const result = await userFacade.delete(idpUserId) as UserAggregateModel;

			expect(result.idpUserId.value).toEqual(idpUserId);

		});
	});

	describe("deleteByUserId", () => {
		it("should return an error when deleting a non-existing user", async () => {
			const userId = 999;

			const result = userFacade.deleteByUserId(userId);

			await expect(result).rejects.toThrow(Error);
		});

		it("should return an error when deleting an admin user", async () => {
			const userId = 1;

			const result = userFacade.deleteByUserId(userId);

			await expect(result).rejects.toThrow(Error);
		});

		it("should not delete, because id is invalid", async () => {
			const userId = -1;

			const result = userFacade.deleteByUserId(userId);

			await expect(result).rejects.toThrow(Error);
		});

		it("should delete a user", async () => {
			const userId = 2;

			const result = await userFacade.deleteByUserId(userId) as UserAggregateModel;

			expect(result.userId.value).toEqual(userId);

		});
	});

	describe("getUserTypes", () => {
		it("should get all user types", async () => {	
			const result = await userFacade.getUserTypes();
	
			expect(result).toBeInstanceOf(Array);
			expect(result.every((item) => item instanceof UserTypeEntityModel)).toBeTruthy();
		});
	});
});