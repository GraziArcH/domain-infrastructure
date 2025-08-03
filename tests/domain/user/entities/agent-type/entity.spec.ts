import { IAgentTypeRepository, AgentTypeEntity, AgentTypeEntityModel } from "@/domain/user";

describe("AgentTypeEntity", () => {
	let mockRepository: IAgentTypeRepository;
	let agentTypeEntity: AgentTypeEntity;
	const mockAgentTypeEntity = AgentTypeEntityModel.create({
		agentTypeId: 1, agentType: "comercializadora"
	});
    
	beforeEach(() => {
		mockRepository = {
			getByAgentType: jest.fn(),
			get: jest.fn(),
		};

		agentTypeEntity = new AgentTypeEntity(mockRepository);
	});

	describe("getById", () => {
		it("should return InvalidIdValueObjectError for an invalid agent type id", async () => {
			const invalidAgentTypeId = 0;

			const result = agentTypeEntity.getById(invalidAgentTypeId);

			expect(result).rejects.toThrow(Error);
		});

		it("should return agent type", async () => {
			const validAgentTypeId = 1;
			jest.spyOn(mockRepository, "getByAgentType").mockReturnValueOnce(
				Promise.resolve(mockAgentTypeEntity as AgentTypeEntityModel)
			);

			const result = await agentTypeEntity.getById(validAgentTypeId);

			expect(result).toEqual(mockAgentTypeEntity);
		});
	});

	describe("get", () => {
		it("should return agent types", async () => {
			jest.spyOn(mockRepository, "get").mockReturnValueOnce(
				Promise.resolve([mockAgentTypeEntity as AgentTypeEntityModel])
			);

			const result = await agentTypeEntity.get();

			expect(result).toEqual([mockAgentTypeEntity]);
		});
	});
});