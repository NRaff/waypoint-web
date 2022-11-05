import Auth from "frontend/components/Auth";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter()
  const { authType } = router.query

  return (
      <Auth authType={authType} />
  )
}