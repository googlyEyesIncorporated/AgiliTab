import { useState } from "react";
import { TopRow } from "./Components/TopRow";
import { BottomRow } from "./Components/BottomRow";

function App() {
  const [bgColor, setBgColor] = useState("#222");
  const [textColor, setTextColor] = useState("white");

  return (
    <div className="App" style={{ backgroundColor: bgColor, color: textColor }}>
      <TopRow h24={false} />
      <BottomRow />
    </div>
  );
}

export default App;
