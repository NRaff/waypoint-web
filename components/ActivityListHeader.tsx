import { useState } from "react"
import { ActivityHeaderProps } from "utility/types"

export default function ActivityListHeader({curType, setType}:ActivityHeaderProps) {
  // const [listType, setListType] = useState('Races')
  // set the list type in redux ui state for the rest 
  return (
    <header>
      <button
        onClick={() => setType('Races')}
        className={`${curType === 'Races' ? 'activitiesSelected' : ''}`}
      >Races</button>
      <button
        onClick={() => setType('Courses')}
        className={`${curType === 'Courses' ? 'activitiesSelected' : ''}`}
      >Courses</button>
    </header>
  )
}