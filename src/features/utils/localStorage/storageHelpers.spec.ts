import { initialSettings } from "../../settings/initialData";
import { getStorage } from "./storageHelpers";
import { updateStorage } from "./updateStorage";

const syncSet = jest.fn();
const syncGet = jest.fn(
  (
    keys: string[] | { [key: string]: any } | null,
    callback: (items: { [key: string]: any }) => void
  ) => {
    callback({
      shortTermList: { test: "shortTermList" },
      mediumTermList: { test: "mediumTermList" },
      longTermList: { test: "longTermList" },
      settings: { test: "settings" },
    });
  }
);
const mockDispatch = jest.fn();
const mockPopulateTasksFromChrome = jest.fn();
const mockPopulateSettingssFromChrome = jest.fn();

jest.mock("../../itemList/itemListSlice", () => ({
  populateTasksFromChrome: (...args: any[]) =>
    mockPopulateTasksFromChrome(...args),
}));

jest.mock("../../settings/settingsSlice", () => ({
  populateSettingssFromChrome: (...args: any[]) =>
    mockPopulateSettingssFromChrome(...args),
}));

global.chrome = {
  ...global.chrome,
  storage: {
    ...global.chrome?.storage,
    sync: {
      ...global.chrome?.storage.sync,
      set: syncSet,
      get: syncGet as unknown as chrome.storage.StorageArea["get"],
    },
  },
};

describe("updateStorage", () => {
  it("calls chrome.storage.sync.set with stuff", () => {
    updateStorage({
      storageKey: "settings",
      val: JSON.stringify(initialSettings),
    });
    expect(syncSet).toHaveBeenCalledWith({
      settings: JSON.stringify({
        visualSettings: {
          bgColor: "#CFCFCF",
          fontColor: "#4F4F4F",
          secondFontColor: "#4F4F4F",
          dateFormat: "MMM dd, yyyy",
          timeFormat: "h:mm a",
        },
      }),
    });
  });
});
