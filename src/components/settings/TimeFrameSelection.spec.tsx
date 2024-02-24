import { render, screen } from "@testing-library/react";
import { TimeFrameSelection } from "./TimeFrameSelection";
import "@testing-library/jest-dom";

const props = {
  groupId: "0",
  onChange: jest.fn(),
  termData: { title: "test", type: "none" as const, list: [] },
};

const startDate = "2023-09-01T00:00";
const endDate = "2023-10-01T00:00";
const duration = { unit: "months", qty: 1 };

describe("TimeFrameSelection", () => {
  it('should render nothing when "none" is the type', () => {
    render(<TimeFrameSelection {...props} />);
    expect(screen.queryByTestId("group-0-beginning-frame")).toBe(null);
    expect(screen.queryByTestId("group-0-end-frame")).toBe(null);
  });
  it('should render a date timeframe dialogue when "date" is the type', () => {
    render(
      <TimeFrameSelection
        {...props}
        termData={{
          title: "test",
          type: "date",
          startDate,
          endDate,
          list: [],
        }}
      />
    );
    expect(screen.queryByTestId("group-0-beginning-frame")).toBeInTheDocument();
    expect(screen.queryByText("Duration:")).toBe(null);
    expect(screen.queryByText("End:")).toBeInTheDocument();
  });
  it('should render a duration timeframe dialogue when "duration" is the type', () => {
    render(
      <TimeFrameSelection
        {...props}
        termData={{
          title: "test",
          type: "duration",
          startDate,
          duration,
          list: [],
        }}
      />
    );
    expect(screen.queryByTestId("group-0-beginning-frame")).toBeInTheDocument();
    expect(screen.queryByText("End:")).toBe(null);
    expect(screen.queryByText("Duration:")).toBeInTheDocument();
  });
});
