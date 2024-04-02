import styles from "./styles.module.css"

export const ReplyComponent = ({
  author,
  text,
}: {
  author: string
  text: string
}) => {
  const getInitials = (text: string) => {
    const words = text.split(" ")
    const initials = words.map((word) => word.charAt(0))
    return initials.join("")
  }
  return (
    <div className={styles.container}>
      <div className={styles.avatar}>{getInitials(author)}</div>
      <div className={styles.comment}>
        <p>
          <strong>{author}</strong>
        </p>
        <p>{text}</p>
      </div>
    </div>
  )
}
