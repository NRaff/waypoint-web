import { useState } from "react"
import { ActivityHeaderProps } from "utility/types"
import BtnWithImg from "./BtnWithImg"
import styles from '@/styles/modules/activityListHeader.module.css'

export default function ActivityListHeader({curType, setType}:ActivityHeaderProps) {
  // const [listType, setListType] = useState('Races')
  // set the list type in redux ui state for the rest 
  return (
    <header className={styles.activitiesHeader}>
      <BtnWithImg 
        title='Races'
        action={() => setType('Races')}
        img=''
        style={curType === 'Races' ? styles.activitiesSelected : ''}
      />
      <BtnWithImg
        title='Courses'
        action={() => setType('Courses')}
        img=''
        style={curType==='Races' ? '' : styles.activitiesSelected}
      />
      {/* <button
        onClick={() => setType('Races')}
        className={`${curType === 'Races' ? 'activitiesSelected' : ''}`}
      >Races</button>
      <button
        onClick={() => setType('Courses')}
        className={`${curType === 'Courses' ? 'activitiesSelected' : ''}`}
      >Courses</button> */}
    </header>
  )
}