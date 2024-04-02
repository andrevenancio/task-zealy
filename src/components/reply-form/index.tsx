import { FormEvent, useEffect, useRef } from "react"

import styles from "./styles.module.css"

export const ReplyFormComponent = ({
  label,
  onReply,
}: {
  label: string
  onReply: (reply: string) => void
}) => {
  const input = useRef<HTMLInputElement>(null)

  const handleReply = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const replyText = formData.get("reply") as string
    onReply?.(replyText)
  }

  useEffect(() => {
    if (input.current) {
      input.current.focus()
    }
    console.log("use effect", input)
  }, [])

  return (
    <form className={styles.container} onSubmit={handleReply}>
      <input ref={input} type="text" name="reply" />
      <button type="submit">{label}</button>
    </form>
  )
}
