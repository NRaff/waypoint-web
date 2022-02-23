import Link from "next/link";
import WaypointHead from "@/components/WaypointHead";
import { useSelector } from "react-redux";
import WaypointWrapper from "@/components/WaypointWrapper";
import { useSession } from "utility/selectors";

export default function Home() {
  const session = useSession()
  console.log(session)
  return (
    <WaypointWrapper>
      <WaypointHead siteTitle='Waypoint Home' />
    </WaypointWrapper>
  )
}