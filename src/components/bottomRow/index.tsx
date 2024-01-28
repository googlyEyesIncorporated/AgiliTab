import { selectAllUnits } from "../../features/settings/settingsSlice";
import { useAppSelector } from "../../app/hooks";
import { selectAllLists } from "../../features/itemList/itemListSlice";
import { ListGroup } from "./list/Group";
import { useTerm } from "./utils";
import { DraggableLists } from "./list/DraggableLists";

export const BottomRow = () => {
  const [savedShortTerm, savedMediumTerm, savedLongTerm] =
    useAppSelector(selectAllUnits);

  const [shortTerm] = useTerm(savedShortTerm);
  const [mediumTerm] = useTerm(savedMediumTerm);
  const [longTerm] = useTerm(savedLongTerm);
  const lists = useAppSelector(selectAllLists);

  return (
    <div className="flex justify-between lg:h-1/2 lg:flex-nowrap h-auto flex-wrap">
      <DraggableLists lists={lists}>
        <ListGroup
          groupId={0}
          title={savedShortTerm.title}
          term={shortTerm}
          list={lists.shortTermList}
          listKey="shortTermList"
        />
        <ListGroup
          groupId={1}
          title={savedMediumTerm.title}
          term={mediumTerm}
          list={lists.mediumTermList}
          listKey="mediumTermList"
        />
        <ListGroup
          groupId={2}
          title={savedLongTerm.title}
          term={longTerm}
          list={lists.longTermList}
          listKey="longTermList"
        />
      </DraggableLists>
    </div>
  );
};
