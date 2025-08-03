import { AgentTypeEntityModel } from "@/domain/user";

describe("AgentTypeEntityModel", () => {
	it("should return an error if agentTypeId is invalid", () => {
		const invalidAgentTypeId = 0;

		const sut = () => AgentTypeEntityModel.create({
			agentTypeId: invalidAgentTypeId, agentType: "comercializadora"
		});

		expect(sut).toThrow(Error);
	});

	it("should return an error if agentType is invalid", () => {
		const validAgentTypeId = 1;
		const invalidAgentType = "Invalid Agent Type 123";

		const sut = () => AgentTypeEntityModel.create({
			agentTypeId: validAgentTypeId, agentType: invalidAgentType
		});

		expect(sut).toThrow(Error);
	});

	it("should create an AgentTypeEntityModel instance with valid inputs", () => {
		const validAgentTypeId = 1;
		const validAgentType = "comercializadora";

		const sut = AgentTypeEntityModel.create({
			agentTypeId: validAgentTypeId, agentType: validAgentType
		});

		expect(sut).toBeInstanceOf(AgentTypeEntityModel);
	});
});
