import { FormEvent, useEffect, useRef } from "react"

import styles from "./styles.module.css"

const DEFAULT_EMOJI_LIST = ["👍", "😍", "❤️"]

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

    if (input.current) {
      input.current.value = ""
    }
  }

  const handleEmojiClick = (emoji: string) => {
    if (input.current) {
      const cursorPosition = input.current.selectionStart || 0
      const newReplyText = `${input.current.value.slice(
        0,
        cursorPosition
      )}${emoji} ${input.current.value.slice(cursorPosition)}`
      input.current.value = newReplyText
    }
  }

  useEffect(() => {
    if (input.current) {
      input.current.focus()
    }
  }, [])

  return (
    <form onSubmit={handleReply}>
      <div className={styles.container}>
        <input ref={input} type="text" name="reply" />

        <button type="submit">{label}</button>
      </div>
      <div className={styles.emojiList}>
        {DEFAULT_EMOJI_LIST.map((emoji, index) => (
          <button
            key={index}
            type="button"
            className={styles.emoji}
            onClick={() => handleEmojiClick(emoji)}
          >
            {emoji}
          </button>
        ))}
      </div>
    </form>
  )
}
