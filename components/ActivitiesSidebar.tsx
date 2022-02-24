import { useState } from "react";
import { ActivityListProps } from "utility/types";
import ActivityList from "./ActivityList";
import ActivityListHeader from "./ActivityListHeader";

export default function ActivitiesSidebar() {
  const [listType, setListType] = useState('Races')
  return (
    <div>
      <ActivityListHeader curType={listType} setType={setListType}/>
      <ActivityList type={listType as ActivityListProps["type"]}/>
    </div>
  )
}