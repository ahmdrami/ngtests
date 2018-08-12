import { StrengthPipe } from "./strength.pipe";

describe("Strength pipe", () => {
  it("Should calculate the strength", () => {
    let pipe = new StrengthPipe();

    expect(pipe.transform(9)).toEqual("9 (weak)");
    expect(pipe.transform(11)).toEqual("11 (strong)");
    expect(pipe.transform(25)).toEqual("25 (unbelievable)");
  });
});
