import React from "react";
import "../src/Global.css";
import Sidebar from "../Components/SideBar";

function App() {
  return (
    <>
      <Sidebar />
      <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">
        Welcome to the Photo Invoice App
      </h1>
    </>
  );
}

export default App;
