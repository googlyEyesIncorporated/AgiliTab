import { fireEvent, render, screen } from "@testing-library/react";
import { ComponentProps } from "react";
import { SelectDate } from "./SelectDate";
import "@testing-library/jest-dom";

const onChange = jest.fn();

const beginningProps: ComponentProps<typeof SelectDate> = {
  title: "Beginning",
  groupId: "0",
  date: "2023-09-01T00:00",
  onChange,
};
const endProps: ComponentProps<typeof SelectDate> = {
  title: "End",
  groupId: "0",
  date: "2023-10-01T00:00",
  onChange,
  min: beginningProps.date,
};

describe("SelectDate", () => {
  it("should render a Select Date Settings dialogue", () => {
    render(<SelectDate {...beginningProps} />);
    expect(screen.getByText(`${beginningProps.title}:`)).toBeInTheDocument();
  });
  it("should send back a date string after updating it in the interface", async () => {
    const newDate = "2023-09-02T00:00";
    render(<SelectDate {...beginningProps} />);
    fireEvent.change(screen.getByTestId("group-0-beginning-datepicker"), {
      target: { value: newDate },
    });
    expect(beginningProps.onChange).toHaveBeenCalledWith({
      startDate: newDate,
    });
  });
  it("should send back an end date string after updating it in the interface", async () => {
    const newDate = "2023-10-02T00:00";
    render(<SelectDate {...endProps} />);
    fireEvent.change(screen.getByTestId("group-0-end-datepicker"), {
      target: { value: newDate },
    });
    expect(endProps.onChange).toHaveBeenCalledWith({
      endDate: newDate,
    });
  });
});
