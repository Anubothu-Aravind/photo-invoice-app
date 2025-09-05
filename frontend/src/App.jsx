import React from "react";
import "../src/Global.css";
import Sidebar from "../Components/SideBar";
import {
  Routes,
  Route,
  Link,
  useLocation,
  BrowserRouter,
} from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
      
    </>
  );
}

export default App;
