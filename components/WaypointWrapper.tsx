import WaypointHead from './WaypointHead'

// TODO: Review next js blog to add back relevant meta data
export const siteTitle = 'Waypoint'
export default function WaypointWrapper({children}: any) {
  return (
    <div>
      <WaypointHead siteTitle={siteTitle} />
      <main>{children}</main>
    </div>
  )
}