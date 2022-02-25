import { useState } from "react";
import { ActivityListProps } from "utility/types";
import ActivityList from "./ActivityList";
import ActivityListHeader from "./ActivityListHeader";
import styles from "@/styles/modules/activitiesSidebar.module.css"

export default function ActivitiesSidebar() {
  const [listType, setListType] = useState('Races')
  return (
    <section className={styles.activitiesSidebar}>
      <ActivityListHeader curType={listType} setType={setListType}/>
      <ActivityList type={listType as ActivityListProps["type"]}/>
    </section>
  )
}