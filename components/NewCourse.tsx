import Map from "./Map"
import styles from '../styles/modules/newCourse.module.css'

export default function NewCourse() {
  return (
    <div className={styles.newCourse}>
      <Map />
      <section className={styles.courseDetails}>
        <label>Course Name
        <input type="text" />
        </label>
        <section className={styles.visibility}>
          <label>Visibility</label>
          <label htmlFor="Private">
            <input type="radio" id="Private" name='visibility' />
            Private
          </label>
          <label htmlFor="Public">
            <input type="radio" id="Public" name='visibility' />
            Public
          </label>
        </section>
      </section>
    </div>
  )
}