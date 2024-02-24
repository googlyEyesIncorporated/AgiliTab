import { render, screen } from "@testing-library/react";
import { TermName } from "./TermName";
import { ComponentProps } from "react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

const props: ComponentProps<typeof TermName> = {
  title: "Test",
  groupId: "0",
  onChange: jest.fn(),
};

describe("TermName", () => {
  const user = userEvent.setup();

  it("should render a Term Name Settings dialogue", () => {
    render(<TermName {...props} />);
    expect(screen.getByText("Name:")).toBeInTheDocument();
  });
  it("should send back a title after updating it in the interface", async () => {
    render(<TermName {...props} />);
    const newUserName = "Updated";
    await user.dblClick(screen.getByTestId("group-0-unit-name"));
    await user.paste(newUserName);
    expect(props.onChange).toHaveBeenCalledWith({
      title: newUserName,
    });
  });
});
