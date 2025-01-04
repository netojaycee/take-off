// Component for each tracking step
export function TrackingStep({
  date,
  status,
  delivered,
}: {
  date: string;

  status: string;
  delivered: boolean;
}) {
  return (
    <div className="flex items-center">
      <div
        className={`w-3 h-3 rounded-full ${
          delivered ? "bg-green-500" : "bg-gray-400"
        }`}
      />
      <div className="ml-4">
        <p className="text-sm font-semibold">{status}</p>
        <p className="text-xs text-gray-500">{date}</p>
      </div>
    </div>
  );
}
