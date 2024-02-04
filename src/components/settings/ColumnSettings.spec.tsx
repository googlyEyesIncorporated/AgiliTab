import { ColumnSettings } from "./ColumnSettings";

describe("ColumnSetting", () => {
  it("should open when the gears icon is clicked", () => {
    expect(1).toBe(2);
  });
  it("should close when clicking anywhere that is not inside of the columnSettingsContainer", () => {
    // Test outside settings box
    // Be sure to test clicking the gears icon as this has been an issue previously
    expect(1).toBe(2);
  });
  it("should render a settings box with a beginning date/time picker and a inputs to set duration by default", () => {
    expect(1).toBe(2);
  });
  it("should render a settings box with a beginning and end date/time picker after selecting data from radio buttons", () => {
    expect(1).toBe(2);
  });
  it("should retain the end timeframe setting (end date) after closing and opening it back up", () => {
    expect(1).toBe(2);
  });

  describe("saves when updating", () => {
    it("title", () => {
      expect(1).toBe(2);
    });
    it("beginning date", () => {
      expect(1).toBe(2);
    });
    it("duration qty", () => {
      expect(1).toBe(2);
    });
    it("duration unit", () => {
      expect(1).toBe(2);
    });
    it("end date", () => {
      expect(1).toBe(2);
    });
  });
});
