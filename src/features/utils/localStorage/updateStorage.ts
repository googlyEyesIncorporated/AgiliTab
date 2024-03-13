export const updateStorage = ({
  storageKey,
  val,
}: {
  storageKey: string;
  val: any;
}) => {
  if (typeof chrome !== "undefined" && chrome.storage) {
    if (val === null) {
      chrome.storage.sync.remove(storageKey);
    } else {
      chrome.storage.sync.set({ [storageKey]: val });
    }
  }
};
