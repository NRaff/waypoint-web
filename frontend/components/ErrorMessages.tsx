import { useAuthErrors } from "shared/utility/selectors";
import styles from "@/styles/modules/errorMessages.module.css"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuthError } from "frontend/redux/actions/actions";
import { UX_TYPES } from "frontend/redux/redux_types";


export default function ErrorMessage() {
  const errors = Object.values(useAuthErrors())
  const dispatch = useDispatch()
  const {AUTH} = UX_TYPES.ERRORS
  // TODO: add effect to clear erros after a couple seconds
  // useEffect(() => {
  //   setTimeout(() => {
  //     dispatch(setAuthError(AUTH.CLEAR_ERRORS))
  //   }, 2000)
  // },[])
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