import { ChangeEvent } from "react";
import { onRepeat, saveTerm } from "../utils";
import { render, fireEvent } from "@testing-library/react";
import CheckBox from "../../../Components/Atoms/CheckBox";

const mockDispatch = jest.fn();
jest.mock("../settingsSlice", () => ({
  ...jest.requireActual("../settingsSlice"),
  toggleRepeat: jest.fn((x) => {
    console.log("mocked function");
    return { type: "test", payload: x };
  }),
}));

const TEST = "test";

describe("onRepeat", () => {
  it("dispatches the value of the element if checked", async () => {
    // const { getByTestId } = render(
    //   <CheckBox
    //     nameId={TEST}
    //     {...{ ["data-testid"]: TEST }}
    //     onChange={onRepeat(mockDispatch, "medium")}
    //     labelText={TEST}
    //   />
    // );
    // const checkbox = getByTestId(TEST);
    // fireEvent.click(checkbox);
    // setTimeout(() => {}, 1110);
    // expect(mockDispatch).toHaveBeenCalledWith({
    //   payload: { key: "mediumTerm", value: true },
    //   type: "test",
    // });
  });
});

describe("saveTerm", () => {});
