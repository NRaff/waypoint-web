import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs"
import React, { useCallback, useMemo, useState } from "react";

export enum Section {
  'courses',
  'races'
}

enum CourseTabs {
  myCourses = 'myCourses',
  allCourses = 'allCourses',
}

enum RaceTabs {
  myRaces = 'myRaces',
  allRaces = 'allRaces'
}

type TabItem = {
  value: string,
  label: string,
}

type TabItems<T extends string> = {
  [key in T]: TabItem
}

const courseTabs: TabItems<CourseTabs> = {
  myCourses: {
    value: CourseTabs.myCourses,
    label: 'My courses',
  },
  allCourses: {
    value: CourseTabs.allCourses,
    label: 'All courses'
  }
}

const raceTabs: TabItems<RaceTabs> ={
  myRaces: {
    value: RaceTabs.myRaces,
    label: 'My races',
  },
  allRaces: {
    value: RaceTabs.allRaces,
    label: 'All races'
  }
}

const getTabs = (section: Section) => 
  section === Section.courses ? courseTabs : raceTabs

interface SectionTabProps {
  section: Section
}

const SectionTabs: React.FC<SectionTabProps> = ({section}) => {
  const tabs = Object.values<TabItem>(getTabs(section))
  const [selectedTab, setSelectedTab] = useState(tabs[0].value)

  const handleTabSelection = useCallback((event: React.SyntheticEvent, newTab: string) => {
    setSelectedTab(newTab)
  }, [setSelectedTab])
  
  return (
    <Tabs
      value={selectedTab}
      onChange={handleTabSelection}
      variant='fullWidth'
    >
      {
        tabs.map(tab => (
          <Tab {...tab} />
        ))
      }
    </Tabs>
  )
}

export default SectionTabs;