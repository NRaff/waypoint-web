import Link from "next/link";
import WaypointHead from "frontend/components/WaypointHead";
import WaypointWrapper from "frontend/components/WaypointWrapper";
import WaypointNav from "frontend/components/WaypointNav";
import { WaypointApp } from "frontend/components/WaypointApp";

export default function Home() {
  return (
    <WaypointWrapper>
      <WaypointHead siteTitle='Waypoint Home' />
      <WaypointNav />
      <WaypointApp />
    </WaypointWrapper>
  )
}