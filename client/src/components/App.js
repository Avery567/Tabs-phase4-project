import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import Landing from "./Landing";
import Dashboard from "./Dashboard";

function App() {
  const [user, setUser] = useState(null);
  if (!user) return (
    <div className="App">
      <Dashboard />
    </div>
  )
  return (
    <div className="App">
      <Landing />
    </div>
  )
}

export default App;
