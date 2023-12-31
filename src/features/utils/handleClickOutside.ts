export const handleClickOutside =
  (
    handleClick: (param?: any) => void,
    { current }: React.MutableRefObject<HTMLElement | null>,
    param?: any
  ) =>
  (event: MouseEvent) => {
    if (current && !current.contains(event.target as Node)) {
      handleClick(param);
    }
  };
