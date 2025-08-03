import { InvalidActionValueObjectError, ActionValueObject } from "@/domain/security";

describe("ActionValueObject", () => {
	it("should return InvalidActionValueObjectError for an invalid action (null)", () => {
		const invalidAction = null;

		const sut = () => ActionValueObject.create(invalidAction);

		expect(sut).toThrow(InvalidActionValueObjectError);
	});

	it("should return InvalidActionValueObjectError for an invalid action (non-string)", () => {
		const invalidAction = 123;

		const sut = () => ActionValueObject.create(invalidAction as unknown as string);

		expect(sut).toThrow(InvalidActionValueObjectError);
	});

	it("should return InvalidActionValueObjectError for an invalid action (length 0)", () => {
		const invalidAction = "";

		const sut = () => ActionValueObject.create(invalidAction);

		expect(sut).toThrow(InvalidActionValueObjectError);
	});

	it("should return InvalidActionValueObjectError for an invalid action (length greater than 50)", () => {
		const invalidAction = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel justo nec urna cursus ullamcorper.";

		const sut = () => ActionValueObject.create(invalidAction);

		expect(sut).toThrow(InvalidActionValueObjectError);
	});

	it("should create an ActionValueObject instance with a valid action", () => {
		const validAction = "Valid Action";

		const sut = ActionValueObject.create(validAction);

		expect(sut).toBeInstanceOf(ActionValueObject);
	});
});
