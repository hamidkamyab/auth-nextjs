export default function Loading() {
  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="group/skItem flex flex-col gap-2">
          <span className="h-3 w-1/3 block  bg-gradient-to-r from-white to-slate-50 animate-pulse rounded-md"></span>
          <div className="h-8 w-full bg-gradient-to-r from-white to-slate-50 animate-pulse rounded-md"></div>
        </div>

        <div className="group/skItem flex flex-col gap-2">
          <span className="h-3 w-1/3 block  bg-gradient-to-r from-white to-slate-50 animate-pulse rounded-md"></span>
          <div className="h-8 w-full bg-gradient-to-r from-white to-slate-50 animate-pulse rounded-md"></div>
        </div>

        <div className="group/skItem">
          <div className="h-8 w-full bg-gradient-to-r from-green-50 to-green-200 animate-pulse rounded-md"></div>
        </div>
      </div>
    </>
  );
}
