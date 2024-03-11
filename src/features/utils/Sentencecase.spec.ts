import { Sentencecase } from "./Sentencecase";

describe("titleCase", () => {
  it("fails gracefully if string is undefined", () => {
    expect(Sentencecase(undefined as unknown as string)).toBe("");
  });
  it("fails gracefully if string is empty", () => {
    expect(Sentencecase("")).toBe("");
  });
  it("formats the word to Titlecase", () => {
    const string = "string";
    expect(Sentencecase(string)).toBe("String");
  });
});
