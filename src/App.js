import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import AlphabetScreen from "./screens/AlphabetScreen";
import ConfirmScreen from "./screens/ConfirmScreen";
import PrintScreen from "./screens/PrintScreen";
import CompanyScreen from "./screens/CompanyScreen";
import PersonScreen from "./screens/PersonScreen";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/alphabet" element={<AlphabetScreen />} />
        <Route path="/company" element={<CompanyScreen />} />
        <Route path="/person" element={<PersonScreen />} />
        <Route path="/confirm" element={<ConfirmScreen />} />
        <Route path="/print" element={<PrintScreen />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
