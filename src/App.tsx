import React, { useEffect, useState } from "react";

import { DropdownMultipleCombobox } from "./components/DropdownMultipleCombobox";
import "./App.css";

function App() {
  const [selected, setSelected] = useState<any[]>([]);

  useEffect(() => {
    console.log({ selected });
  }, [selected]);

  return (
    <div className="App">
      <div style={{ width: "500px", margin: "50px auto" }}>
        <DropdownMultipleCombobox
          items={["Apple", "Banana", "Orange"]}
          initialSelectedItems={["Apple"]}
          onChange={(selectedItems) => setSelected(selectedItems)}
        />
      </div>
    </div>
  );
}

export default App;
