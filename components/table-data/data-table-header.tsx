export default function DataTableHeader({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="flex w-full items-center justify-between border-b-2  bg-sky-200 text-white px-2 py-2 backdrop-blur-sm dark:bg-neutral-900 shadow-sm rounded-md">
      {/* Title */}
      <div className="flex items-center gap-2">
        <div className="h-5 w-1 rounded-full bg-gradient-to-b from-pink-400 to-green-400" />
        <h1 className="font-bold text-gray-900 text-lg dark:text-gray-100">
          {title}
        </h1>
      </div>

      {/* Actions */}
      {children}
    </header>
  );
}
