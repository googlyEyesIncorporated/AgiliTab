import { selectAllUnits } from "../../features/settings/settingsSlice";
import { useAppSelector } from "../../app/hooks";
import { selectAllLists } from "../../features/itemList/itemListSlice";
import { ListGroup } from "./list/Group";
import { useShortTerm, useTerm } from "./utils";
import { DraggableLists } from "./list/DraggableLists";

export const BottomRow = () => {
  // Short term
  const [savedShortTerm, savedMediumTerm, savedLongTerm] =
    useAppSelector(selectAllUnits);

  const [shortTerm, setShortTerm, isScopedToWorkingHours] = useShortTerm();
  const [mediumTerm, setMediumTerm] = useTerm(savedMediumTerm);
  const [longTerm, setLongTerm] = useTerm(savedLongTerm);
  const lists = useAppSelector(selectAllLists);

  return (
    <div className="flex justify-between lg:h-1/2 lg:flex-nowrap h-auto flex-wrap">
      <DraggableLists lists={lists}>
        <ListGroup
          groupId={0}
          title={savedShortTerm.title}
          isScopedToWorkingHours={isScopedToWorkingHours}
          term={shortTerm}
          setTerm={setShortTerm}
          list={lists.shortTermList}
          listKey="shortTermList"
        />
        <ListGroup
          groupId={1}
          title={savedMediumTerm.title}
          term={mediumTerm}
          setTerm={setMediumTerm}
          list={lists.mediumTermList}
          listKey="mediumTermList"
        />
        <ListGroup
          groupId={2}
          title={savedLongTerm.title}
          term={longTerm}
          setTerm={setLongTerm}
          list={lists.longTermList}
          listKey="longTermList"
        />
      </DraggableLists>
    </div>
  );
};
