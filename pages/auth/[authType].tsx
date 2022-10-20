import Auth from "frontend/components/Auth";
import Head from "next/head";
import WaypointWrapper, { siteTitle } from "frontend/components/WaypointWrapper";
import { useRouter } from "next/router";
import WaypointNav from "frontend/components/WaypointNav";
import WaypointHead from "frontend/components/WaypointHead";

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
    <WaypointWrapper>
      <WaypointHead siteTitle={`${siteTitle} ${displayAuthType()}`} />
      <WaypointNav type={authType}/>
      <Auth authType={authType} />
    </WaypointWrapper>
  )
}