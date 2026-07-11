import Seal from "./Seal";

export default function Loader({ label = "Loading..." }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-slate-500 dark:text-slate-400">
      <Seal size={36} spin />
      <p className="font-mono text-xs uppercase tracking-wider">{label}</p>
    </div>
  );
}
