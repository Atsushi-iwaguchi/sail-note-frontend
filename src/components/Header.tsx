import { useAuth } from "@/contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

export default function Header() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  //ログアウト操作とその後ログインページに遷移
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <header className="sticky top-0 z-10 mb-4 flex items-center justify-between bg-gray-200 px-4 py-2 shadow-sm">
      <Link
        to="/dashboard"
        className="text-lg font-bold tracking-tight text-gray-800 hover:text-gray-600 transition-colors"
      >
        Sail Note
      </Link>
      <Button variant="outline" onClick={handleLogout}>
        ログアウト
      </Button>
    </header>
  );
}
