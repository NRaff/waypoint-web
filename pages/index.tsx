import WaypointWrapper from '@/components/WaypointWrapper'
import WaypointNav from '@/components/WaypointNav'
import { setupRematchStore, useStore } from 'models/store'
import { RootModel } from 'models'

export const getStaticProps = (): {
  props: unknown
} => {
  const store = setupRematchStore()
  const {dispatch} = store
  dispatch.tests.addTest({
    name: 'Test 1',
    number: 1
  })
  return {props: store.getState()}
}

const Start = (props: RootModel) => {
  const store = useStore(props)
  console.log({store: store.getState()})
    return (
      <WaypointWrapper home>
        <WaypointNav />
      </WaypointWrapper>
    )
}

export default Start
