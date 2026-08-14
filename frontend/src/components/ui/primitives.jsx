import * as React from "react"
import { cn } from "@/lib/utils"

export function Container({ className, ...props }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-6 md:px-10", className)} {...props} />
}

export function Card({ className, ...props }) {
  return (
    <div
      className={cn(
        "border border-[var(--color-basalt-line)]/20 bg-white/40 p-6",
        className
      )}
      {...props}
    />
  )
}

export function Badge({ className, children, ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border border-[var(--color-basalt)]/25 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-ink-soft)]",
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

export function Eyebrow({ children, tone = "sandstone", className }) {
  const toneMap = {
    sandstone: "text-[var(--color-sandstone-deep)]",
    flare: "text-[var(--color-flare-deep)]",
    limestone: "text-[var(--color-limestone)]",
    mica: "text-[var(--color-mica)]",
  }
  return (
    <div className={cn("flex items-center gap-3 font-mono text-xs uppercase tracking-[0.24em]", toneMap[tone], className)}>
      <span className="h-px w-8 bg-current opacity-60" />
      {children}
    </div>
  )
}

export function SectionHeading({ eyebrow, eyebrowTone, title, lede, dark = false, align = "left" }) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && <Eyebrow tone={eyebrowTone}>{eyebrow}</Eyebrow>}
      <h2
        className={cn(
          "mt-4 font-display text-3xl leading-[1.1] md:text-4xl",
          dark ? "text-[var(--color-limestone)]" : "text-[var(--color-basalt)]"
        )}
      >
        {title}
      </h2>
      {lede && (
        <p className={cn("mt-4 text-base leading-relaxed", dark ? "text-[var(--color-limestone)]/70" : "text-[var(--color-ink-soft)]")}>
          {lede}
        </p>
      )}
    </div>
  )
}
