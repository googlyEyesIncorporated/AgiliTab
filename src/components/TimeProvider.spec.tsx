import { useContext } from "react";
import TimeProvider, { DateContext } from "./TimeProvider";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../app/store";

const ISOFormat =
  /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)((-(\d{2}):(\d{2})|Z)?(\+(\d{2}):(\d{2}))?)$/;

const TestChild = () => {
  return <div data-testid="test-child">{useContext(DateContext)}</div>;
};
describe("TimeProvider", () => {
  it("should provide date/time to children", () => {
    render(
      <Provider store={store}>
        <TimeProvider>
          <TestChild />
        </TimeProvider>
      </Provider>
    );
    expect(screen.getByTestId("test-child").innerHTML).toMatch(ISOFormat);
  });
});
