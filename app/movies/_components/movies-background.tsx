/** ページ背景（グラデ＋グリッド）— Tailwind のみで再現 */
export function MoviesBackground() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.22),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(234,179,8,0.2),transparent_30%),radial-gradient(circle_at_50%_100%,rgba(168,85,247,0.2),transparent_35%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(to_right,rgba(148,163,184,0.12)_1px,transparent_1px)] [background-size:28px_28px]"
        aria-hidden
      />
    </>
  )
}
