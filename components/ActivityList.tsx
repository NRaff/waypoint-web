import { ActivityListProps } from "utility/types";

export default function ActivityList({type}: ActivityListProps) {
  // select data from store based on type
  return (
    <div>
      <h1>Displaying: {type}</h1>
      {/* table row component */}
    </div>
  )
}