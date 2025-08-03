import { IdValueObject } from "@/domain/shared";
import { DatabaseHelper, AgentTypeRepository } from "@/application/framework";
import { AgentTypeEntityModel } from "@/domain/user";

describe("AgentTypeRepository", () => {
	const databaseHelper = new DatabaseHelper("user");


	afterEach(async () => {
		await databaseHelper.disconnect();
	});

	describe("getByAgentType", () => {
		it("should get agent type by id", async () => {
			const agentTypeRepository = new AgentTypeRepository(databaseHelper);

			const agentTypeId = IdValueObject.create(1) as IdValueObject;
			const result = await agentTypeRepository.getByAgentType(agentTypeId);

			expect(result).toBeInstanceOf(AgentTypeEntityModel);
			expect(result.agentTypeId.value).toEqual(agentTypeId.value);
		});
	});

	describe("get", () => {
		it("should get all agent types", async () => {
			const agentTypeRepository = new AgentTypeRepository(databaseHelper);

			const result = await agentTypeRepository.get();

			expect(result).toBeInstanceOf(Array);
			expect(result.every((item) => item instanceof AgentTypeEntityModel)).toBeTruthy();
		});
	});
});