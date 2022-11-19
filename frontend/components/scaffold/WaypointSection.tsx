import { CSSObject, Theme } from "@mui/material"
import Box from "@mui/material/Box"
import { StyleSheet } from "frontend/framework/utils/types"
import SectionTabs, {Section} from "./SectionTabs"
import TabPanel from "./TabContainer"

const styles: StyleSheet = {
  container: {
    width: '30%',
    height: '100%',
    flexDirection: 'column',
    backgroundColor: 'whitesmoke'
  }
}

interface WaypointSectionProps {
  section: Section
}

const WaypointSection: React.FC<WaypointSectionProps> = ({
  section
}) => {

  return (
    <Box sx={styles.container}>
      <SectionTabs section={section} />
      {/* use SwipeableViews with TabPanels */}
      <TabPanel
        tabId="courses"
        selectedId="courses"
      />
    </Box>
  )
}

export default WaypointSection;