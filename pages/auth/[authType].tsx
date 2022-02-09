import Auth from "@/components/Auth";
import Head from "next/head";
import Landing, { siteTitle } from "@/components/Landing";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter()
  const { authType } = router.query
  const stringType = (authType as string)
  const cappedType = stringType.replace(stringType[0], stringType[0].toUpperCase())
  return (
    <Landing>
      <Head>
        <title>{`${siteTitle} ${cappedType}`}</title>
      </Head>
      <Auth authType={authType} />
    </Landing>
  )
}