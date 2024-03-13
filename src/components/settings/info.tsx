import { useAppSelector } from "../../app/hooks";
import { selectVisualSettings } from "../../features/settings/settingsSlice";

const agilitabDotCom = "http://agilitab.com"; // NOSONAR

export const InfoBox = () => {
  const { fontColor, bgColor } = useAppSelector(selectVisualSettings);

  return (
    <span
      className="popover z-10 h-fit absolute p-[5px] mx-0 mb-0 mt-[35px] left-0 right-0 top-0 bottom-0 border"
      style={{
        borderColor: fontColor,
        backgroundColor: bgColor,
        color: fontColor,
      }}
    >
      <ul>
        <li className="grid" style={{ gridTemplateColumns: "1fr 4fr" }}>
          <div>
            <img src="/128.png" height={64} alt="logo" />
          </div>
          <div className="mt-2.5">
            <ul>
              <li>
                AgiliTab - <a href={agilitabDotCom}>agilitab.com</a>
              </li>
              <li>Developer: John Tirelli</li>
            </ul>
          </div>
        </li>
        <li>Special thanks:</li>
        <li>
          <a href="https://chrome.google.com/webstore/detail/prioritab/napbejkndjhcciibiglkimmgdlfjcbnp">
            - Prioritab
          </a>{" "}
          - The primary inspiration of the design of this extension.
        </li>
        <li>- Zeah D. - Design Consultant</li>
      </ul>
    </span>
  );
};
