import { useState } from "react";
import { ActivityListProps } from "utility/types";
import BtnWithImg from "./BtnWithImg";
import ActivityList from "./ActivityList";
import ActivityListHeader from "./ActivityListHeader";
import styles from "@/styles/modules/activitiesSidebar.module.css"

export default function ActivitiesSidebar() {
  const [listType, setListType] = useState('Races')
  return (
    <div className={styles.activitiesSidebar}>
      <ActivityListHeader curType={listType} setType={setListType}/>
      <BtnWithImg
        action={() => console.log('create pressed')}
        title={`Create ${listType.substring(0, listType.length - 1)}`}
        style={''}
      />
      <ActivityList type={listType as ActivityListProps["type"]}/>
    </div>
  )
}