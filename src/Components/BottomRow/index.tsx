import { selectAllUnits } from "../../features/Settings/settingsSlice";
import { useAppSelector } from "../../app/hooks";
import { selectAllLists } from "../../features/itemList/itemListSlice";
import { DraggableLists } from "./utils/DraggableLists";
import { ListGroup } from "./list/Group";
import { advanceTerm } from "./utils/utils";
import { useShortTerm, useTerm } from "./utils/hooks";

// A component that recieves a date string and renders a group of draggable lists
// Gets the current time from context, and compares it to the end of each term
// if the current time has surpassed the end of a term, it will calculate a new start time as 1ms after the end of the previous term
// and a new end time as one duration after the new start time.
// TODO: Update this to be smart about which lists it checks next (smart polling, only the term(S) that is closest to ending)
// TODO: Update this to be smart about when it checks next (smart polling, only when time is close to end of term)

export const BottomRow = () => {
  // Short term
  const {
    shortTerm: savedShortTerm,
    mediumTerm: savedMediumTerm,
    longTerm: savedLongTerm,
  } = useAppSelector(selectAllUnits);

  const [shortTerm, setShortTerm] = useShortTerm();
  const [mediumTerm, setMediumTerm] = useTerm(savedMediumTerm);
  const [longTerm, setLongTerm] = useTerm(savedLongTerm);
  const lists = useAppSelector(selectAllLists);

  return (
    <div id="bottom-row">
      <DraggableLists lists={lists}>
        <ListGroup
          title={savedShortTerm.title}
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
