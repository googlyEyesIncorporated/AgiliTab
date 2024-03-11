import { render, screen } from "@testing-library/react";
import { ElapsedTime } from "./ElapsedTime";
import { epochTimes } from "../../commonTestData.json";
import { DateTime } from "luxon";

const { Sep012023, Sep082023, Sep152023, Sep232023, Sep302023 } = epochTimes;
const jestSetTime = (newDateTime: number) => {
  jest.useFakeTimers().setSystemTime(new Date(newDateTime));
};

describe("ElapsedTime", () => {
  it("should display 0%", () => {
    render(
      <ElapsedTime
        groupId={"1"}
        term={{
          startDate: DateTime.fromMillis(Sep012023).toISO() ?? "",
          endDate: DateTime.fromMillis(Sep302023).toISO() ?? "",
        }}
      />
    );
    expect(screen.getByTestId("group-1-elapsed-time").innerHTML).toBe("0%");
  });
  it("should display 25%", () => {
    jestSetTime(Sep082023);
    render(
      <ElapsedTime
        groupId={"1"}
        term={{
          startDate: DateTime.fromMillis(Sep012023).toISO() ?? "",
          endDate: DateTime.fromMillis(Sep302023).toISO() ?? "",
        }}
      />
    );
    expect(screen.getByTestId("group-1-elapsed-time").innerHTML).toBe("25%");
  });
  it("should display 50%", () => {
    jestSetTime(Sep152023);
    render(
      <ElapsedTime
        groupId={"1"}
        term={{
          startDate: DateTime.fromMillis(Sep012023).toISO() ?? "",
          endDate: DateTime.fromMillis(Sep302023).toISO() ?? "",
        }}
      />
    );
    expect(screen.getByTestId("group-1-elapsed-time").innerHTML).toBe("50%");
  });
  it("should display 75%", () => {
    jestSetTime(Sep232023);
    render(
      <ElapsedTime
        groupId={"1"}
        term={{
          startDate: DateTime.fromMillis(Sep012023).toISO() ?? "",
          endDate: DateTime.fromMillis(Sep302023).toISO() ?? "",
        }}
      />
    );
    expect(screen.getByTestId("group-1-elapsed-time").innerHTML).toBe("75%");
  });
  it("should display 100%", () => {
    jestSetTime(Sep302023);
    render(
      <ElapsedTime
        groupId={"1"}
        term={{
          startDate: DateTime.fromMillis(Sep012023).toISO() ?? "",
          endDate: DateTime.fromMillis(Sep302023).toISO() ?? "",
        }}
      />
    );
    expect(screen.getByTestId("group-1-elapsed-time").innerHTML).toBe("100%");
  });
});
