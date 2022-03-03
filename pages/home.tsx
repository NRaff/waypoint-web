import Link from "next/link";
import WaypointHead from "@/components/WaypointHead";
import WaypointWrapper from "@/components/WaypointWrapper";
import WaypointNav from "@/components/WaypointNav";
import { WaypointApp } from "@/components/WaypointApp";
import useFirebaseAuth from "hooks/useFirebaseAuth";

export default function Home() {
  return (
    <WaypointWrapper>
      <WaypointHead siteTitle='Waypoint Home' />
      <WaypointNav type='loggedIn'/>
      <WaypointApp />
    </WaypointWrapper>
  )
}