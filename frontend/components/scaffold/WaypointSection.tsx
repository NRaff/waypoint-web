import { CSSObject, Theme } from "@mui/material"
import Box from "@mui/material/Box"
import { StyleSheet } from "frontend/framework/utils/types"
import SectionTabs, {Section} from "./SectionTabs"

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
    </Box>
  )
}

export default WaypointSection;