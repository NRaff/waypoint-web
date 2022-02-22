import Image from "next/image"
import { BtnWithImgProps } from "utility/types"
import styles from "../styles/modules/btnWithImg.module.css"

export default function BtnWithImg({action, img, title, style}: BtnWithImgProps) {
  return (
    <button
      onClick={() => action()}
      className={`${styles.btnWithImg} ${style}`}
    >
      <Image 
        src={img}
        height={24}
        width={24}
        className={styles.btnImg}
      />
      <h3 className={styles.btnTitle}>{title}</h3>
    </button>
  )
}