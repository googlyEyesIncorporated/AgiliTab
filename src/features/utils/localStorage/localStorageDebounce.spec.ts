import { localStorageDebounce } from "./localStorageDebounce";
import { updateStorage } from "./updateStorage";
import { initialSettings } from "../../settings/initialData";

jest.mock("./updateStorage", () => ({
  updateStorage: jest.fn(),
}));

describe("localStorageDebounce", () => {
  it("debounces localStorage set calls", async () => {
    jest.useFakeTimers();
    expect(updateStorage).toHaveBeenCalledTimes(0);
    localStorageDebounce(initialSettings, "settings");
    localStorageDebounce(initialSettings, "settings");
    localStorageDebounce(initialSettings, "settings");
    localStorageDebounce(initialSettings, "settings");
    localStorageDebounce(initialSettings, "settings");
    localStorageDebounce(initialSettings, "settings");
    jest.advanceTimersByTime(2000);
    expect(updateStorage).toHaveBeenCalledTimes(1);
  });
});
