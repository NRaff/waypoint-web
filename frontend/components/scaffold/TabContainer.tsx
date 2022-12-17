import { Dispatch, RootState } from "frontend/models/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface TabPanelProps {
  tabId: string,
  selectedId: string,
}

const TabPanel: React.FC<TabPanelProps> = ({tabId, selectedId}) => {
  const dispatch = useDispatch<Dispatch>()
  const {courses} = useSelector<RootState>(state => ({
    courses: Object.values(state.courses)
  }))
  console.log({courses})
  useEffect(() => {
    dispatch.courses.getAllCourses()
  }, [dispatch])
  return (
    <div
      role='tabPanel'
      hidden={tabId !== selectedId}
    >
      {`Hello world ${tabId}`}
    </div>
  )
}

export default TabPanel;