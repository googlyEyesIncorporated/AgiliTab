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
    if (chrome.storage) {
      chrome.storage.sync.get(
        ["shortTermList", "mediumTermList", "longTermList"],
        function (result) {
          const shortTermList = result["shortTermList"]
            ? (Object.values(result["shortTermList"]) as ItemList)
            : [];
          const mediumTermList = result["mediumTermList"]
            ? (Object.values(result["mediumTermList"]) as ItemList)
            : [];
          const longTermList = result["longTermList"]
            ? (Object.values(result["longTermList"]) as ItemList)
            : [];
          dispatch(
            updateList({
              listKey: "shortTermList",
              itemList: shortTermList,
              save: false,
            })
          );
          dispatch(
            updateList({
              listKey: "mediumTermList",
              itemList: mediumTermList,
              save: false,
            })
          );
          dispatch(
            updateList({
              listKey: "longTermList",
              itemList: longTermList,
              save: false,
            })
          );
        }
      );
    }
  }, []);

  return (
    <div className="App" style={{ backgroundColor: bgColor, color: textColor }}>
      <TopRow h24={false} />
      <BottomRow />
    </div>
  );
}

export default App;
