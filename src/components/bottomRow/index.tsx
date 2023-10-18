import { selectAllUnits } from "../../features/settings/settingsSlice";
import { useAppSelector } from "../../app/hooks";
import { selectAllLists } from "../../features/itemList/itemListSlice";
import { ListGroup } from "./list/Group";
import { advanceTerm, useShortTerm, useTerm, DraggableLists } from "./utils";

export const BottomRow = () => {
  // Short term
  const {
    shortTerm: savedShortTerm,
    mediumTerm: savedMediumTerm,
    longTerm: savedLongTerm,
  } = useAppSelector(selectAllUnits);

  const [shortTerm, setShortTerm, isScopedToWorkingHours] = useShortTerm();
  const [mediumTerm, setMediumTerm] = useTerm(savedMediumTerm);
  const [longTerm, setLongTerm] = useTerm(savedLongTerm);
  const lists = useAppSelector(selectAllLists);

  return (
    <div id="bottom-row">
      <DraggableLists lists={lists}>
        <ListGroup
          title={savedShortTerm.title}
          isScopedToWorkingHours={isScopedToWorkingHours}
          term={shortTerm}
          setTerm={setShortTerm}
          list={lists.shortTermList}
          listKey="shortTermList"
          advanceTerm={advanceTerm}
        />
        <ListGroup
          title={savedMediumTerm.title}
          term={mediumTerm}
          setTerm={setMediumTerm}
          list={lists.mediumTermList}
          listKey="mediumTermList"
          advanceTerm={advanceTerm}
        />
        <ListGroup
          title={savedLongTerm.title}
          term={longTerm}
          setTerm={setLongTerm}
          list={lists.longTermList}
          listKey="longTermList"
          advanceTerm={advanceTerm}
        />
      </DraggableLists>
    </div>
  );
};
