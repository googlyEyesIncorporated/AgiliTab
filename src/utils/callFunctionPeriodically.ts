export const callFunctionPeriodically = (interval: number, fn: () => void) => {
  fn();
  const intervalId = setInterval(() => {
    fn();
  }, interval);

  return () => clearInterval(intervalId);
};
