import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PracticeRecords from "./pages/PracticeRecord/PracticeRecords";
import Tournaments from "./pages/Tournament/Tournaments";
import MonthlyGoals from "./pages/MonthlyGoal/MonthlyGoals";
import Dashboard from "./pages/Dashboard";
import PracticeRecordNew from "./pages/PracticeRecord/PracticeRecordNew";
import PracticeRecordDetail from "./pages/PracticeRecord/PracticeRecordDetail";
import PracticeRecordEdit from "./pages/PracticeRecord/PracticeRecordEdit";
import TournamentDetail from "./pages/Tournament/TournamentDetail";
import TournamentNew from "./pages/Tournament/TournamentNew";
import MonthlyGoalsNew from "./pages/MonthlyGoal/MonthlyGoalNew";
import MonthlyGoalEdit from "./pages/MonthlyGoal/MonthlyGoalEdit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/practice-records" element={<PracticeRecords />} />
        <Route path="/practice-records/:id" element={<PracticeRecordDetail />} />
        <Route path="/practice-records/:id/edit" element={<PracticeRecordEdit />} />
        <Route path="/practice-records/new" element={<PracticeRecordNew />} />
        <Route path="/tournaments" element={<Tournaments />} />
        <Route path="/tournaments/new" element={<TournamentNew />} />
        <Route path="/tournaments/:id" element={<TournamentDetail />} />
        <Route path="/Monthly-goals" element={<MonthlyGoals />} />
        <Route path="/Monthly-goals/new" element={<MonthlyGoalsNew />} />
        <Route path="/Monthly-goals/:id/edit" element={<MonthlyGoalEdit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
