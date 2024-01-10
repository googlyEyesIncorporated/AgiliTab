import { localStorageDebounce } from "../localStorageDebounce";
import { updateStorage } from "../updateStorage";
import { epochTimes } from "../../../commonTestData.json";
import { initialSettings } from "../../settings/settingsSlice";
const { Sep012023, Sep082023, Sep152023, Sep232023, Sep302023 } = epochTimes;
const jestSetTime = (newDateTime: number) => {
  jest.useFakeTimers().setSystemTime(new Date(newDateTime));
};
jest.mock("../updateStorage", () => ({
  updateStorage: jest.fn(),
}));

describe("localStorageDebounce", () => {
  it("debounces localStorage set calls", async () => {
    jestSetTime(Sep012023);

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
