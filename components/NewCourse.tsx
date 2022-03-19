import Map from "./Map"

export default function NewCourse() {
  return (
    <div>
      <Map />
      <section>
        <label>Course Name</label>
        <input type="text" />
        <section>
          <label>Visibility</label>
          <input type="radio" id="Private" name='visibility' />
          <label htmlFor="Private">Private</label>
          <input type="radio" id="Public" name='visibility' />
          <label htmlFor="Public">Public</label>
        </section>
      </section>
    </div>
  )
}