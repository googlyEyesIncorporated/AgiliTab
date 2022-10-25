import { useSelector } from "react-redux";
import { selectAllLists } from "../features/counter/itemListSlice";
import { selectAllUnits } from "../features/counter/unitsSlice";
import { Column } from "./priorities/Column";
export const BottomRow = () => {
  const { firstList, secondList, thirdList } = useSelector(selectAllLists);
  const { firstUnit, secondUnit, thirdUnit } = useSelector(selectAllUnits);

  return (
    <div id="bottom-row">
      <Column
        title={firstUnit.title}
        listItems={firstList}
        listKey="firstList"
      />
      <Column
        title={secondUnit.title}
        listItems={secondList}
        listKey="secondList"
      />
      <Column
        title={thirdUnit.title}
        listItems={thirdList}
        listKey="thirdList"
      />
    </div>
  );
};
