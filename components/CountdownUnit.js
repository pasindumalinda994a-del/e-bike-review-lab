export default function CountdownUnit({
  value,
  label,
  size = "default",
  valueClassName = "",
  labelClassName = "",
  containerClassName = "",
}) {
  const isCompact = size === "compact";

  const baseContainerClass = isCompact
    ? "flex min-w-[2.5rem] flex-col items-center rounded-md bg-white/10 px-1.5 py-1 sm:min-w-[2.75rem] sm:px-2"
    : "flex min-w-[3.25rem] flex-col items-center rounded-lg bg-white/10 px-2.5 py-2 sm:min-w-[4rem] sm:px-3";

  const baseValueClass = isCompact
    ? "text-sm font-bold tabular-nums leading-none sm:text-base"
    : "text-lg font-bold tabular-nums leading-none sm:text-2xl";

  const baseLabelClass = isCompact
    ? "mt-0.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-white/70 sm:text-[10px]"
    : "mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/70 sm:text-[11px]";

  return (
    <div className={`${baseContainerClass} ${containerClassName}`.trim()}>
      <span className={`${baseValueClass} ${valueClassName}`.trim()}>
        {value}
      </span>
      <span className={`${baseLabelClass} ${labelClassName}`.trim()}>
        {label}
      </span>
    </div>
  );
}
