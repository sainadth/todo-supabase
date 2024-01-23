import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import "./App.css";
import Navbar from "./components/Navbar";
import TodoContainer from "./components/TodoContainer";

function App() {
  return (
    <div>
      <Navbar />
      <TodoContainer />
    </div>
  );
}

export default App;
