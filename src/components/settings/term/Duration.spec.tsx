import { render, screen } from "@testing-library/react";
import { Duration } from "./Duration";
import { ComponentProps } from "react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

const props: ComponentProps<typeof Duration> = {
  groupId: "0",
  duration: { unit: "weeks", qty: 1 },
  onChange: jest.fn(),
};

describe("Duration", () => {
  const user = userEvent.setup();

  it("should render a Duration Settings dialogue", () => {
    render(<Duration {...props} />);
    expect(screen.getByText("Duration:")).toBeInTheDocument();
  });
  it("should send back a duration object after updating it in the interface", async () => {
    render(<Duration {...props} />);

    // Check Qty
    await user.type(screen.getByTestId("group-0-unit-qty"), "2");
    expect(props.onChange).toHaveBeenCalledWith({
      duration: { ...props.duration, qty: 12 },
    });

    // Check Unit
    await user.selectOptions(
      screen.getByTestId("group-0-duration-format-input"),
      "days"
    );
    expect(props.onChange).toHaveBeenCalledWith({
      duration: { ...props.duration, unit: "days" },
    });
  });
});
