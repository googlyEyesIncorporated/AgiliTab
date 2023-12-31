import { endOfToday } from "../settings/settingsSlice";

export const isNewDay = (currentTimeMillis: number) =>
  currentTimeMillis > endOfToday.toMillis();
