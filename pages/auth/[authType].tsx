import Auth from "@/components/Auth";
import Head from "next/head";
import Landing, { siteTitle } from "@/components/Landing";
import { useRouter } from "next/router";
import Logo from "@/components/Logo";

export default function Login() {
  const router = useRouter()
  const { authType } = router.query

  function displayAuthType() {
    const stringType = ((authType as string) || 'signup').split('')
    const capitalFirst = stringType[0].toUpperCase()
    stringType[0] = capitalFirst
    return stringType.join('')
  }

  return (
    <Landing>
      <Head>
        <title>{`${siteTitle} ${displayAuthType()}`}</title>
      </Head>
      <Logo />
      <Auth authType={authType} />
    </Landing>
  )
}