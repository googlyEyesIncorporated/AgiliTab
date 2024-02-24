export const updateStorage = ({
  storageKey,
  val,
}: {
  storageKey: string;
  val: any;
}) => {
  if (typeof chrome !== "undefined" && chrome.storage) {
    chrome.storage.sync.set({ [storageKey]: val });
  }
};
