"use client"

interface OverseasReactionsProps {
  reactions: string[]
}

export default function OverseasReactions({ reactions }: OverseasReactionsProps) {
  return (
    <div className="mb-4 sm:mb-6 md:mb-8">
      <div className="pt-3 sm:pt-4 mb-3 sm:mb-4">
        <h3 className="text-white font-bold text-sm sm:text-base mb-2 sm:mb-3 px-2">
          海外の反応
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
          {reactions.map((reaction, index) => (
            <div
              key={index}
              className="bg-black/40 backdrop-blur-sm rounded-lg p-2.5 sm:p-3 md:p-4"
            >
              <p className="text-white text-xs sm:text-sm leading-relaxed">{reaction}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

