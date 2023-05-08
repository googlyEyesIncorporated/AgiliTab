import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { selectVisualSettings } from "./features/Settings/settingsSlice";
import { SettingsWrapper } from "./Components/Settings/OpenSettings";
import { NowBox } from "./Components/TopRow/NowBox/NowBox";
import { getStorage } from "./features/utils/storageHelpers";
import { GroupOfLists } from "./Components/BottomRow/GroupOfLists";
import TimeHandler from "./TimeHandler";

function App() {
  const { bgColor, fontColor } = useAppSelector(selectVisualSettings);

  const dispatch = useAppDispatch();
  useEffect(() => {
    getStorage(dispatch);
  }, [dispatch]);

  useEffect(() => {
    document.body.style.backgroundColor = bgColor;
    document.body.style.color = fontColor;
  }, [bgColor, fontColor]);
  return (
    <div className="App" style={{ backgroundColor: bgColor, color: fontColor }}>
      <TimeHandler>
        <NowBox />
        <GroupOfLists />
      </TimeHandler>
      <SettingsWrapper />
    </div>
  );
}

export default App;
