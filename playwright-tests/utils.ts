import { Page } from "playwright-core";

const fakeNow = new Date("September 27 2023 12:20:00").valueOf();
export const appPage = "http://127.0.0.1:3000";

export const setTime = async (page: Page, epochTime = fakeNow) => {
  await page.addInitScript(`{
        // Extend Date constructor to default to epochTime
        Date = class extends Date {
          constructor(...args) {
            if (args.length === 0) {
              super(${epochTime});
            } else {
              super(...args);
            }
          }
        }
        // Override Date.now() to start from epochTime
        const __DateNowOffset = ${epochTime} - Date.now();
        const __DateNow = Date.now;
        Date.now = () => __DateNow() + __DateNowOffset;
      }`);
};
