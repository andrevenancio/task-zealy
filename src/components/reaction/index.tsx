import React, { useState } from "react"

import { ReplyComponent } from "../reply"
import { ReplyFormComponent } from "../reply-form"

import styles from "./styles.module.css"

export interface Reply {
  id: number
  author: string
  text: string
}

export interface Reaction {
  id: number
  x: number
  y: number
  author: string
  text: string
  replies?: Reply[]
}

export interface ReactionProps extends Reaction {
  onReply?: (reactionId: number, reply: Reply) => void
}

export const STATE = {
  IDLE: "IDLE",
  REPLYING: "REPLYING",
  OPEN: "OPEN",
}

export const ReactionComponent: React.FC<ReactionProps> = ({
  id,
  x,
  y,
  author,
  text,
  replies = [],
  onReply,
}) => {
  const [view, setView] = useState(STATE.IDLE)

  const handleMouseEnter = () => {
    if (replies.length > 0) {
      setView(STATE.OPEN)
    } else {
      setView(STATE.REPLYING)
    }
  }

  const handleMouseLeave = () => {
    setView(STATE.IDLE)
  }

  const handleReply = (text: string) => {
    onReply?.(id, {
      id: Date.now(),
      author: "Louis", // username should come from cookie or context
      text,
    })

    setView(STATE.OPEN)
  }

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
  }

  const renderView = () => {
    switch (view) {
      case STATE.REPLYING:
        return (
          <div className={styles.replying}>
            <ReplyFormComponent onReply={handleReply} label="SUBMIT" />
          </div>
        )
      case STATE.OPEN:
        return (
          <div className={styles.open}>
            <ReplyComponent author={author} text={text} />
            {replies.map((reply) => (
              <ReplyComponent key={reply.id} {...reply} />
            ))}
            <ReplyFormComponent onReply={handleReply} label="REPLY" />
          </div>
        )
      default:
        return <div className={styles.idle} />
    }
  }

  return (
    <div
      className={styles.container}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{ left: x, top: y }}
    >
      {renderView()}
    </div>
  )
}

export default ReactionComponent
