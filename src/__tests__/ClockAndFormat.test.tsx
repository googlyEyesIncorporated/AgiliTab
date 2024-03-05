import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../app/store";
import App from "../App";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import {
  HHmm,
  HHmmss,
  MMDDYYYYDate,
  MMMMddyyyy,
  dMMMMyyyy,
  dMMMyyyy,
  ddMMyyyy,
  hmma,
  hmmssa,
  mmmddyyyyDate,
  yyyyMMdd,
} from "./DateTimeRegex";

const AppJsx = (
  <Provider store={store}>
    <App />
  </Provider>
);

const setup = () => render(AppJsx);
const user = userEvent.setup();

describe("App", () => {
  it("renders a clock with the selected format", async () => {
    setup();
    expect(screen.getByTestId("now-box")).toBeInTheDocument();

    // selecting format Feb 25, 2024, sets the date to same
    await user.click(screen.getByTestId("settings"));
    const dateFormatInput = screen.getByTestId("date-format-input");
    const timeFormatInput = screen.getByTestId("time-format-input");
    const dateDisplay = screen.getByTestId("date-display");
    const timeDisplay = screen.getByTestId("clock");

    // Date Format:
    // American:
    // -----------------
    // MM/dd/yyyy
    await user.selectOptions(dateFormatInput, "MM/dd/yyyy");
    expect(dateDisplay.innerHTML).toMatch(MMDDYYYYDate);
    // MMM dd, yyyy
    await user.selectOptions(dateFormatInput, "MMM dd, yyyy");
    expect(dateDisplay.innerHTML).toMatch(mmmddyyyyDate);
    // MMMM dd, yyyy
    await user.selectOptions(dateFormatInput, "MMMM dd, yyyy");
    expect(dateDisplay.innerHTML).toMatch(MMMMddyyyy);

    // International
    // -----------------
    // dd/MM/yyyy
    await user.selectOptions(dateFormatInput, "dd/MM/yyyy");
    expect(dateDisplay.innerHTML).toMatch(ddMMyyyy);
    // d MMM yyyy
    await user.selectOptions(dateFormatInput, "d MMM yyyy");
    expect(dateDisplay.innerHTML).toMatch(dMMMyyyy);
    // d MMMM yyyy
    await user.selectOptions(dateFormatInput, "d MMMM yyyy");
    expect(dateDisplay.innerHTML).toMatch(dMMMMyyyy);

    // ISO_8601
    // -----------------
    // yyyy-MM-dd
    await user.selectOptions(dateFormatInput, "yyyy-MM-dd");
    expect(dateDisplay.innerHTML).toMatch(yyyyMMdd);

    // Time Format:
    // 12 Hour
    // -----------------
    // h:mm a
    await user.selectOptions(timeFormatInput, "h:mm a");
    expect(timeDisplay.innerHTML).toMatch(hmma);
    // h:mm:ss a
    await user.selectOptions(timeFormatInput, "h:mm:ss a");
    expect(timeDisplay.innerHTML).toMatch(hmmssa);

    // 24 Hour
    // -----------------
    // HH:mm
    await user.selectOptions(timeFormatInput, "HH:mm");
    expect(timeDisplay.innerHTML).toMatch(HHmm);
    // HH:mm:ss
    await user.selectOptions(timeFormatInput, "HH:mm:ss");
    expect(timeDisplay.innerHTML).toMatch(HHmmss);

    // Resets to default time and date format
    await user.click(screen.getByTestId("visual-restore-defaults"));
    expect(dateDisplay.innerHTML).toMatch(mmmddyyyyDate);
    expect(timeDisplay.innerHTML).toMatch(hmma);
  });
});
