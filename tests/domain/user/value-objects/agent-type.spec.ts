import { AgentTypeValueObject, InvalidAgentTypeValueObjectError } from "@/domain/user";

describe("AgentTypeValueObject", () => {

	it("should return InvalidAgentTypeValueObjectError for an invalid agent type", () => {
		const invalidAgentType = "invalid";

		const sut = () => AgentTypeValueObject.create(invalidAgentType);

		expect(sut).toThrow(InvalidAgentTypeValueObjectError);
	});

	it("should return InvalidAgentTypeValueObjectError for an agent type not in the allowed list", () => {
		const invalidAgentType = "producer";

		const sut = () => AgentTypeValueObject.create(invalidAgentType);

		expect(sut).toThrow(InvalidAgentTypeValueObjectError);
	});

	it("should create an AgentTypeValueObject instance with a valid agent type", () => {
		const validAgentType = "comercializadora";

		const sut = AgentTypeValueObject.create(validAgentType);

		if(!(sut instanceof Error)) expect(sut.value).toBe(validAgentType);
		expect(sut).toBeInstanceOf(AgentTypeValueObject);
	});
});