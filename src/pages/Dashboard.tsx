import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const MenuItems = [
    { label: "練習記録", path: "/Practice-records" },
    { label: "過去の大会", path: "/Tournaments" },
    { label: "月目標", path: "/Monthly-goals" },
  ];
  return (
    <>
      <Header />
      <div className="p-5">
        <p className="mb-5">{user?.username}さん今日も頑張りましょう！</p>
        <ul className="flex gap-4 flex-wrap justify-center">
          {MenuItems.map((item) => (
            <li key={item.path}>
              <Button
                variant="outline"
                className="w-48 h-18"
                onClick={() => navigate(item.path)}
              >
                {item.label}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
