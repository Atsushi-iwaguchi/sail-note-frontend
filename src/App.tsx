import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login"
import Register from "./pages/Register"
import PracticeRecords from "./pages/PracticeRecords";
import Tournaments from "./pages/Tournaments";
import MonthlyGoals from "./pages/MonthlyGoals";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/Practice-records" element={<PracticeRecords/>} />
        <Route path="/Tournaments" element={<Tournaments/>} />
        <Route path="/Monthly-goals" element={<MonthlyGoals/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
