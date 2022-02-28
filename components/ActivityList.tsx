import { ActivityListProps } from "utility/types";
import BtnWithImg from "./BtnWithImg";
import styles from "@/styles/modules/activityList.module.css"

export default function ActivityList({type}: ActivityListProps) {
  // select data from store based on type
  return (
    <div className={styles.activityList}>
      <BtnWithImg
        action={() => console.log('create pressed')}
        title={`Create ${type.substring(0,type.length - 1)}`}
        style={''}
      />
      <h1>Displaying: {type}</h1>
      {/* table row component */}
    </div>
  )
}