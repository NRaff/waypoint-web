import ActivitiesSidebar from "./ActivitiesSidebar";
import styles from '@/styles/modules/waypointApp.module.css'
import { useSession } from "utility/selectors";
import { Course } from "models/Course";
import { useEffect, useState } from "react";
import useFirebaseAuth from "hooks/useFirebaseAuth";
import { useDispatch } from "react-redux";
import InAppNav from "./InAppNav";
import ActivityList from "./ActivityList";
import BtnWithImg from "./BtnWithImg";

// TODO: catch listeners to turn them off on dismount
export function WaypointApp() {
  const authStatus = useFirebaseAuth()
  const { uid } = useSession()
  const dispatch = useDispatch()

  const [listType, setListType] = useState('Races')

  useEffect(() => {
    Course.listCourses(dispatch)
  }, [])

  return (
    <div className={styles.waypointApp}>
      <InAppNav curType={listType} setType={setListType}/>
      <ActivityList type={listType as any}/>
    </div>
  )
}