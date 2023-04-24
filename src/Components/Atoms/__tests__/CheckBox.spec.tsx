import { render, screen, fireEvent } from "@testing-library/react";
import { ChangeEvent } from "react";
import CheckBox from "../CheckBox";

const mockOnChange = jest.fn((e: ChangeEvent) => {});
const TEST = "test";
describe("CheckBox", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("calls the provided onChange when clicked", () => {
    const { container, getByTestId } = render(
      <CheckBox
        {...{ ["data-testid"]: "test" }}
        labelText="labelText"
        nameId="nameId"
        onChange={mockOnChange}
      />
    );
    const checkbox = getByTestId("test") as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it("uses the provided labelText, className, inputStyle", () => {
    const { getByText } = render(
      <CheckBox
        {...{ ["data-testid"]: "test" }}
        labelText="labelText"
        nameId="nameId"
        onChange={mockOnChange}
        labelStyle={{ backgroundColor: "red" }}
      />
    );
    const labelByText = getByText("labelText") as HTMLInputElement;
    expect(labelByText.getAttribute("style")).toEqual("background-color: red;");
  });

  it("is controlled if checked is provided", () => {
    const { container, getByTestId, rerender } = render(
      <CheckBox
        {...{ ["data-testid"]: "test" }}
        labelText="labelText"
        nameId="nameId"
        checked={false}
        onChange={mockOnChange}
      />
    );
    const checkbox = getByTestId("test") as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(false);
    rerender(
      <CheckBox
        {...{ ["data-testid"]: "test" }}
        labelText="labelText"
        nameId="nameId"
        checked={true}
        onChange={mockOnChange}
      />
    );
    expect(checkbox.checked).toBe(true);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
  });
});
