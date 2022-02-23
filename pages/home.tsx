import Link from "next/link";
import WaypointHead from "@/components/WaypointHead";
import { useSelector } from "react-redux";
import WaypointWrapper from "@/components/WaypointWrapper";
import { useStore } from "redux/store";

export default function Home() {
  const {displayName} = useSelector((state: any) => state.session)
  console.log(displayName)
  return (
    <WaypointWrapper>
      <WaypointHead siteTitle='Waypoint Home' />
    </WaypointWrapper>
  )
}