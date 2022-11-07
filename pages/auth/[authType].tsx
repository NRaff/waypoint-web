import Auth from "frontend/components/Auth";
import { useRouter } from "next/router";
import { Navbar } from "react-bootstrap";

export default function Login() {
  const router = useRouter()
  const { authType } = router.query

  return (
    <div>
      <Navbar.Brand href="#home">Waypoint</Navbar.Brand>
      
      <Auth authType={authType} />
    </div>
  )
}