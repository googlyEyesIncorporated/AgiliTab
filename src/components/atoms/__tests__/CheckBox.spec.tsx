import { render, screen, fireEvent } from "@testing-library/react";
import { ChangeEvent } from "react";
import CheckBox from "../CheckBox";

const mockOnChange = jest.fn((e: ChangeEvent) => {});

const commonProps = {
  "data-testid": "test",
  labelText: "labelText",
  nameId: "nameId",
};
describe("CheckBox", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("calls the provided onChange when clicked", () => {
    render(<CheckBox {...commonProps} onChange={mockOnChange} />);
    const checkbox = screen.getByTestId("test") as HTMLInputElement; // NOSONAR
    expect(checkbox.checked).toBe(false);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it("uses the provided labelText, className, inputStyle", () => {
    render(
      <CheckBox
        {...commonProps}
        onChange={mockOnChange}
        labelStyle={{ backgroundColor: "red" }}
      />
    );
    const labelByText = screen.getByText("labelText") as HTMLInputElement; // NOSONAR
    expect(labelByText.getAttribute("style")).toEqual("background-color: red;");
  });

  it("is controlled if checked is provided", () => {
    const { rerender } = render(
      <CheckBox {...commonProps} checked={false} onChange={mockOnChange} />
    );
    const checkbox = screen.getByTestId("test") as HTMLInputElement; // NOSONAR
    expect(checkbox.checked).toBe(false);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(false);
    rerender(
      <CheckBox {...commonProps} checked={true} onChange={mockOnChange} />
    );
    expect(checkbox.checked).toBe(true);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
  });
});
