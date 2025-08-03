import { DatabaseHelper, InviteRepository, MockUserDatabase } from "@/application/framework";
import { InviteEntityModel, StringValueObject } from "@/domain/user";

describe("InviteRepository", () => {
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
		it("should create a new invite", async () => {
			const inviteRepository = new InviteRepository(databaseHelper);
			const inviteData = InviteEntityModel.create(
				{
					inviteId: 1,
					hash: "hash",
					companyId: 1,
					userAdminId: 1,
					expirationsDate: new Date(),
					used: false,
					email: "emailnewuser@test.com"
				}
			);

			const result = await inviteRepository.create(inviteData);

			expect(result).toBeInstanceOf(InviteEntityModel);
		});

	});

	describe("getInviteByHash", () => {
		it("should get invite by hash", async () => {
			const inviteRepository = new InviteRepository(databaseHelper);
			const hash = StringValueObject.create("hash") as StringValueObject;

			const result = await inviteRepository.getInviteByHash(hash);

			expect(result).toBeInstanceOf(InviteEntityModel);
		});
	});

	describe("invalidateInvitation", () => {
		it("should invalidate invitation", async () => {
			const inviteRepository = new InviteRepository(databaseHelper);
			const hash = StringValueObject.create("hash") as StringValueObject;

			const result = await inviteRepository.invalidateInvitation(hash);

			expect(result).toBeInstanceOf(InviteEntityModel);
		});
	});
});