import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const MenuItems = [
    { label: "練習記録", path: "/practice-records" },
    { label: "過去の大会", path: "/tournaments" },
    { label: "月目標", path: "/monthly-goals" },
  ];
  return (
    <>
      <Header />
      <div className="p-4">
        <ul className="flex flex-wrap justify-center gap-4 list-none">
          {MenuItems.map((item) => (
            <li key={item.path}>
              <Button
                variant="outline"
                className="w-48 h-16 cursor-pointer"
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
