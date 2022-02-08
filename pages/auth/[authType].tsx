import Auth from "@/components/Auth";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter()
  const { authType } = router.query
  console.log(authType)
  return (
    <Auth authType={authType} />
  )
}