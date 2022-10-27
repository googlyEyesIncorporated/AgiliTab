import { useEffect, useState } from "react";
import { TopRow } from "./Components/TopRow";
import { BottomRow } from "./Components/BottomRow";
import { updateList } from "./features/counter/itemListSlice";
import { useDispatch } from "react-redux";
import { ItemList } from "./types";

function App() {
  const [bgColor, setBgColor] = useState("#222");
  const [textColor, setTextColor] = useState("white");
  const dispatch = useDispatch();
  useEffect(() => {
    chrome.storage.sync.get(
      ["firstList", "secondList", "thirdList"],
      function (result) {
        const firstList = result["firstList"]
          ? (Object.values(result["firstList"]) as ItemList)
          : [];
        const secondList = result["secondList"]
          ? (Object.values(result["secondList"]) as ItemList)
          : [];
        const thirdList = result["thirdList"]
          ? (Object.values(result["thirdList"]) as ItemList)
          : [];
        dispatch(
          updateList({ listKey: "firstList", itemList: firstList, save: false })
        );
        dispatch(
          updateList({
            listKey: "secondList",
            itemList: secondList,
            save: false,
          })
        );
        dispatch(
          updateList({ listKey: "thirdList", itemList: thirdList, save: false })
        );
      }
    );
  }, []);

  return (
    <div className="App" style={{ backgroundColor: bgColor, color: textColor }}>
      <TopRow h24={false} />
      <BottomRow />
    </div>
  );
}

export default App;
