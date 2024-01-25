export const callFunctionPeriodically = (interval: number, fn: () => void) => {
  const intervalId = setInterval(() => {
    fn();
  }, interval);

  return () => clearInterval(intervalId);
};
