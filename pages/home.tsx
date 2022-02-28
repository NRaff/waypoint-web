import Link from "next/link";
import WaypointHead from "@/components/WaypointHead";
import WaypointWrapper from "@/components/WaypointWrapper";
import { useSession } from "utility/selectors";
import WaypointNav from "@/components/WaypointNav";
import { WaypointApp } from "@/components/WaypointApp";

export default function Home() {
  const session = useSession()
  console.log(session)
  return (
    <WaypointWrapper>
      <WaypointHead siteTitle='Waypoint Home' />
      <WaypointNav type='loggedIn'/>
      <WaypointApp />
    </WaypointWrapper>
  )
}