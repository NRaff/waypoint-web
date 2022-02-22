import Image from "next/image"
import { BtnWithImgProps } from "utility/types"
import styles from "../styles/modules/btnWithImg.module.css"

export default function BtnWithImg({action, img='', title, style}: BtnWithImgProps) {
  return (
    <button
      onClick={() => action()}
      className={`${styles.btnWithImg} ${styles[style]}`}
    >
      {img.length > 0 ? 
        <img
          src={img}
          className={styles.btnImg}
        />
        // <figure
        //   className={styles.btnImg}
        // >
        //   <Image
        //     src={img}
        //     height={30}
        //     width={30}
        //     layout='responsive'
        //   />
        // </figure> 
        : null
      }
      <h3 className={styles.btnTitle}>{title}</h3>
    </button>
  )
}