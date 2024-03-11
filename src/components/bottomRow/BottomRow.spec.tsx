import { fireEvent, render, screen } from "@testing-library/react";
import { BottomRow } from ".";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import "@testing-library/jest-dom";
import { addTerm } from "../../features/itemList/itemListSlice";
import { DateTime } from "luxon";
import { DATE_TIME_NO_SECONDS } from "../../commonUtils";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

const WrappedBottomRow = (
  <Provider store={{ ...store }}>
    <BottomRow />
  </Provider>
);

const user = userEvent.setup();
const Now = DateTime.now();

describe("bottomRow", () => {
  it("should display more than one list", () => {
    const { rerender } = render(WrappedBottomRow);
    const list1 = {
      listKey: "0",
      listObject: {
        type: "date" as const,
        startDate: Now.startOf("day").toFormat(DATE_TIME_NO_SECONDS),
        endDate: Now.endOf("day").toFormat(DATE_TIME_NO_SECONDS),
        list: [],
        title: "Today",
      },
    };
    const list2 = {
      listKey: "1",
      listObject: {
        type: "date" as const,
        startDate: Now.startOf("month").toFormat(DATE_TIME_NO_SECONDS),
        endDate: Now.endOf("month").toFormat(DATE_TIME_NO_SECONDS),
        list: [],
        title: "Month",
      },
    };
    act(() => {
      store.dispatch(addTerm(list1));
      store.dispatch(addTerm(list2));
    });
    rerender(WrappedBottomRow);
    const bottomRow = screen.queryByTestId("bottom-row");
    expect(bottomRow).toBeInTheDocument();
    expect(bottomRow).toMatchSnapshot();
  });

  it("should update the list title when title is edited", async () => {
    const { rerender } = render(WrappedBottomRow);
    const list3 = {
      listKey: "2",
      listObject: {
        type: "date" as const,
        startDate: Now.startOf("year").toFormat(DATE_TIME_NO_SECONDS),
        endDate: Now.endOf("year").toFormat(DATE_TIME_NO_SECONDS),
        list: [],
        title: "Year",
      },
    };
    const replacementText = "Replacement Text";
    act(() => {
      store.dispatch(addTerm(list3));
    });
    rerender(WrappedBottomRow);
    fireEvent.click(
      screen.getByTestId("group-0-settings").querySelector("svg") as Element
    );
    const titleInput = screen.getByTestId("group-0-unit-name");
    user.clear(titleInput);
    user.click(titleInput);
    user.paste(replacementText);
    rerender(WrappedBottomRow);
    expect(screen.getByText(replacementText)).toBeInTheDocument();
  });

  it("should clear all items when clicking clear all", () => {
    const { rerender } = render(WrappedBottomRow);

    const listWithItems = {
      listKey: "3",
      listObject: {
        type: "date" as const,
        startDate: Now.startOf("year").toFormat(DATE_TIME_NO_SECONDS),
        endDate: Now.endOf("year").toFormat(DATE_TIME_NO_SECONDS),
        list: [
          { id: "1", name: "item 1", done: true },
          { id: "2", name: "item 2", done: false },
        ],
        title: "Year",
      },
    };
    act(() => {
      store.dispatch(addTerm(listWithItems));
    });
    rerender(WrappedBottomRow);
    expect(
      screen.queryByText(listWithItems.listObject.list[0].name)
    ).toBeInTheDocument();
    expect(
      screen.queryByText(listWithItems.listObject.list[1].name)
    ).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("group-3-clear-all-button"));
    rerender(WrappedBottomRow);
    expect(
      screen.queryByText(listWithItems.listObject.list[0].name)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(listWithItems.listObject.list[1].name)
    ).not.toBeInTheDocument();
  });

  it("should clear done items when clicking clear done", () => {
    const { rerender } = render(WrappedBottomRow);
    const listWithItems = {
      listKey: "4",
      listObject: {
        type: "date" as const,
        startDate: Now.startOf("year").toFormat(DATE_TIME_NO_SECONDS),
        endDate: Now.endOf("year").toFormat(DATE_TIME_NO_SECONDS),
        list: [
          { id: "1", name: "item 1", done: true },
          { id: "2", name: "item 2", done: false },
        ],
        title: "Year",
      },
    };
    act(() => {
      store.dispatch(addTerm(listWithItems));
    });
    rerender(WrappedBottomRow);
    expect(
      screen.queryByText(listWithItems.listObject.list[0].name)
    ).toBeInTheDocument();
    expect(screen.queryByText("item 2")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("group-4-clear-done-button"));
    rerender(WrappedBottomRow);
    expect(
      screen.queryByText(listWithItems.listObject.list[0].name)
    ).not.toBeInTheDocument();
    expect(screen.queryByText("item 2")).toBeInTheDocument();
  });

  it("should cross out the item when checked", () => {
    // setup
    const { rerender } = render(WrappedBottomRow);

    const listWithItems = {
      listKey: "5",
      listObject: {
        type: "date" as const,
        startDate: Now.startOf("year").toFormat(DATE_TIME_NO_SECONDS),
        endDate: Now.endOf("year").toFormat(DATE_TIME_NO_SECONDS),
        list: [{ id: "1", name: "item 1", done: false }],
        title: "Year",
      },
    };
    act(() => {
      store.dispatch(addTerm(listWithItems));
    });
    rerender(WrappedBottomRow);

    // click checkbox
    fireEvent.click(
      screen
        .getByTestId("group-5-list")
        .querySelector('[data-testid="list-item-checkbox-0"]') as Element
    );
    rerender(WrappedBottomRow);
    expect(
      screen
        .getByTestId("group-5-list")
        .querySelector('[data-testid="todo-text-0"]')
    ).toHaveClass("line-through");
  });

  it("should update the list item name when edited", async () => {
    // setup
    render(WrappedBottomRow);
    const newTaskName = "Take out the garbage";
    const oldTaskName = "Task 1";

    const listWithItems = {
      listKey: "6",
      listObject: {
        type: "date" as const,
        startDate: Now.startOf("year").toFormat(DATE_TIME_NO_SECONDS),
        endDate: Now.endOf("year").toFormat(DATE_TIME_NO_SECONDS),
        list: [{ id: "1", name: oldTaskName, done: false }],
        title: "Year",
      },
    };
    act(() => {
      store.dispatch(addTerm(listWithItems));
    });

    // Edit list item
    fireEvent.dblClick(
      screen.getByTestId("group-6-list").querySelector("li") as Element
    );
    fireEvent.change(screen.getByTestId("todo-edit-0"), {
      target: { value: newTaskName },
    });
    fireEvent.click(screen.getByTestId("group-6-list"));

    expect(screen.getByText(newTaskName)).toBeInTheDocument();
  });
});
