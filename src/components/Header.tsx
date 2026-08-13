import { useAuth } from "@/contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { User } from "lucide-react";

export default function Header() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  //ログアウト操作とその後ログインページに遷移
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between bg-blue-700 px-6 py-5 shadow-sm">
  <Link
    to="/dashboard"
    className="text-2xl font-bold tracking-tight text-white"
  >
    Sail Note
  </Link>

  <Button
  variant="outline"
  onClick={handleLogout}
  className="
    rounded-full
    border-2 border-white
    bg-transparent
    px-4
    text-white
    hover:bg-white/10
    hover:text-white
  "
>
  <User className="mr-2 size-5" />
  ログアウト
</Button>
</header>
  );
}
