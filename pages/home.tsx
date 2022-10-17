import Link from "next/link";
import WaypointHead from "@/components/WaypointHead";
import WaypointWrapper from "@/components/WaypointWrapper";
import WaypointNav from "@/components/WaypointNav";
import { WaypointApp } from "@/components/WaypointApp";

export default function Home() {
  return (
    <WaypointWrapper>
      <WaypointHead siteTitle='Waypoint Home' />
      <WaypointNav />
      <WaypointApp />
    </WaypointWrapper>
  )
}