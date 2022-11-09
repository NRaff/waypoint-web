import Link from 'next/link'
import { Container, Icon, SxProps, Typography } from '@mui/material'
import { SailingSharp } from '@mui/icons-material'
import { StyleSheet } from 'frontend/framework/utils/types'

const styles:StyleSheet = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: 'fit-content',
    padding: '.1rem',
  },
  sailIcon: {
    marginRight: '.1rem'
  },
  waypoint: {
    fontFamily: 'revert',
    letterSpacing: '.2rem',
    color: 'inherit',
    textDecoration: 'none',
  }
}

export default function Logo() {
  return (
    <Container disableGutters sx={styles.container}>
      <SailingSharp fontSize='large' sx={styles.sailIcon}/>
      <Typography
        variant='h4'
        noWrap
        component='a'
        href='/'
        sx={styles.waypoint}
      >
        Waypoint
      </Typography>
    </Container>
  )
}