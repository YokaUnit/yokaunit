/** ページ背景 — #06080f ベースに琥珀・スカイのうっすらした光 */
export function MoviesBackground() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_15%_-10%,rgba(251,191,36,0.12),transparent_50%),radial-gradient(ellipse_70%_50%_at_90%_10%,rgba(56,189,248,0.1),transparent_45%),radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(251,191,36,0.08),transparent_50%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.22] [background-image:linear-gradient(rgba(148,163,184,0.1)_1px,transparent_1px),linear-gradient(to_right,rgba(148,163,184,0.1)_1px,transparent_1px)] [background-size:28px_28px]"
        aria-hidden
      />
    </>
  )
}
