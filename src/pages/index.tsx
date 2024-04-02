import { useEffect, useState } from "react"

import ReactionComponent, { Reaction, Reply } from "@/components/reaction"

export default function Page() {
  const [reactions, setReactions] = useState<Reaction[]>([
    {
      id: 0,
      x: 100,
      y: 100,
      author: "Fredrika Lindh",
      text: "I'm a comment! 💯",
      replies: [{ id: 1, author: "Andre Venancio", text: "Cool!" }],
    },
  ])

  const handleReply = (reactionId: number, reply: Reply) => {
    setReactions((prevReactions) => {
      return prevReactions.map((reaction) => {
        if (reaction.id === reactionId) {
          return {
            ...reaction,
            replies: [...(reaction.replies || []), reply],
          }
        }
        return reaction
      })
    })
  }

  useEffect(() => {
    const addClick = (event: MouseEvent) => {
      const newReaction = {
        id: Date.now(),
        x: event.clientX,
        y: event.clientY,
        author: "Andre", // You might need to add the author dynamically
        text: "New Reaction", // You might need to customize this too
      }
      setReactions((prevReactions) => [...prevReactions, newReaction])
    }

    window.addEventListener("click", addClick)

    return () => {
      window.removeEventListener("click", addClick)
    }
  }, [])

  return (
    <div>
      {reactions.map((reaction) => {
        return (
          <ReactionComponent
            key={reaction.id}
            {...reaction}
            onReply={handleReply}
          />
        )
      })}
    </div>
  )
}
