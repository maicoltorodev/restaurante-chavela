const items = [
  "Tacos al Pastor",
  "Birria",
  "Carnitas",
  "Mezcal",
  "Guacamole",
  "Elote",
  "Michelada",
  "Quesadilla",
]

export function MarqueeBanner() {
  return (
    <div className="bg-primary py-4 overflow-hidden">
      <div className="flex marquee-scroll whitespace-nowrap">
        {[...items, ...items, ...items].map((item, i) => (
          <span
            key={i}
            className="mx-8 text-sm uppercase tracking-[0.3em] text-primary-foreground font-medium"
          >
            {item}
            <span className="mx-8 text-primary-foreground/40">{"////"}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
