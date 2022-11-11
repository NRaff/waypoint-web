import WaypointHead from "frontend/components/WaypointHead";
import WaypointWrapper from "frontend/components/WaypointWrapper";
import WaypointNav from "frontend/components/WaypointNav";

export default function Home() {
  return (
    <WaypointWrapper>
      <WaypointHead siteTitle='Waypoint Home' />
      <WaypointNav />
      {/* <WaypointApp /> */}
    </WaypointWrapper>
  )
}