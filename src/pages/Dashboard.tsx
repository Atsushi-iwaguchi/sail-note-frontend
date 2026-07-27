import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const { logout } = useAuth();
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate("/login")
    }
return(
    <>
    <div>
        <h1>dashboard</h1>
        <Button onClick={handleLogout}>ログアウト</Button>
    </div>
    </>
)
}