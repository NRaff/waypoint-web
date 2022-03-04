import { useAuthErrors } from "utility/selectors";
import styles from "@/styles/modules/errorMessages.module.css"


export default function ErrorMessage() {
  const errors = Object.values(useAuthErrors())
  if (errors.length > 0) {
    return (
      <aside className={styles.errorsContainer}>
        {
          errors.map((item) => {
            return (<h1 className={styles.errorItem}>{item as string}</h1>)
          })
        }
      </aside>
    )
  } else {
    return null
  }

}