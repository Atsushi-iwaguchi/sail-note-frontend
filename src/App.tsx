import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PracticeRecords from "./pages/PracticeRecord/PracticeRecords";
import Tournaments from "./pages/Tournaments";
import MonthlyGoals from "./pages/MonthlyGoals";
import Dashboard from "./pages/Dashboard";
import PracticeRecordNew from "./pages/PracticeRecord/PracticeRecordNew";
import PracticeRecordDetail from "./pages/PracticeRecord/PracticeRecordDetail";
import PracticeRecordEdit from "./pages/PracticeRecord/PracticeRecordEdit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Practice-records" element={<PracticeRecords />} />
        <Route path="/Practice-records/:id" element={<PracticeRecordDetail />} />
        <Route path="/Practice-records/:id/edit" element={<PracticeRecordEdit />} />
        <Route path="/practice-records/new" element={<PracticeRecordNew />} />
        <Route path="/Tournaments" element={<Tournaments />} />
        <Route path="/Monthly-goals" element={<MonthlyGoals />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
