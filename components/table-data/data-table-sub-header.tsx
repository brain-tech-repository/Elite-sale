export default function DataTableSubHeader({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex w-full items-center justify-between 
      border-b-1 border-s-1  border-neutral-300 dark:border-neutral-800 
      px-3 py-2 shadow-lg bg-sky-100 text-white">

      {/* Title Section */}
      <div className="flex items-center gap-2">
        {/* Accent line */}
        <div className="h-4 w-1 rounded-full 
          bg-gradient-to-b from-pink-400 to-sky-400" />

        <h2 className="text-sm font-semibold 
          text-neutral-700 dark:text-neutral-600 
          tracking-wide">
          {title}
        </h2>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {children}
      </div>
    </div>
  );
}