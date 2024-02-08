import { fireEvent, render, screen } from "@testing-library/react";
import { RadioButtons } from "./RadioButton";
import "@testing-library/jest-dom";

const props = {
  enabled: true,
  groupId: 0,
  firstIsChecked: true,
  onChange: jest.fn(),
  firstRadioName: "Duration",
  secondRadioName: "Date",
};

describe("RadioButton", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should render 2 radio buttons", () => {
    render(<RadioButtons {...props} />);
    expect(
      screen.getByTestId(`group-${props.groupId}-${props.firstRadioName}`)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(`group-${props.groupId}-${props.secondRadioName}`)
    ).toBeInTheDocument();
  });

  it("should call onChange when selected radio button changes", () => {
    render(<RadioButtons {...props} />);
    fireEvent.click(
      screen.getByTestId(`group-${props.groupId}-${props.secondRadioName}`)
    );
    expect(props.onChange).toHaveBeenCalledTimes(1);
    expect(props.onChange.mock.calls[0][0].type).toEqual("change");
  });
});
