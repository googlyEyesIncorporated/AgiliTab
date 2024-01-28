import { endOfToday } from "../settings/initialData";

export const isNewDay = (currentTimeMillis: number) =>
  currentTimeMillis > endOfToday.toMillis();
