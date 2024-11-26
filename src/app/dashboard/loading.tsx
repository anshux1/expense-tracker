import { Skeleton } from "@/components/ui/skeleton"
const cards = [1, 2, 3, 4];
export default function Loading() {
  return (
    <div className="max-w-7xl flex-col md:flex mx-auto">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        {/* Header Skeleton*/}
        <div className="flex sm:items-center justify-between flex-col sm:flex-row space-y-5 md:space-y-2">
          <div className="flex items-center justify-between space-x-2">
            <h2 className="text-4xl font-bold tracking-tight">Dashboard</h2>
            <div className="sm:hidden">
              <Skeleton className="w-[150px] h-9" />
            </div>
          </div>
          <div className="flex justify-center items-center space-x-2">
            <div className="hidden sm:block">
              <Skeleton className="w-[150px] h-9" />
            </div>
            <Skeleton className="w-[150px] h-9" />
            <Skeleton className="w-[150px] h-9" />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {cards.map(item => <AnaliyticsCardSkeleton key={item} />)}
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Skeleton className="col-span-5 p-5 rounded-xl">
            <Skeleton className="h-5 w-32 my-2" />
            <Skeleton className="h-3 max-w-xl my-2" />
            <Skeleton className="h-80" />
          </Skeleton>
          <Skeleton className="col-span-5 p-5 rounded-xl md:col-span-2">
            <Skeleton className="h-5 w-32 my-2" />
            <Skeleton className="h-3 max-w-44 my-2" />
            <div className="space-y-2">
              <Skeleton className="h-14 my-3 w-full" />
              <Skeleton className="h-14 my-3 w-full" />
              <Skeleton className="h-14 my-3 w-full" />
              <Skeleton className="h-14 my-3 w-full" />
              <Skeleton className="h-14 my-3 w-full" />
            </div>
          </Skeleton>
        </div>
      </div>
    </div>
  )
}

const AnaliyticsCardSkeleton = ({
}) => {
  return (
    <Skeleton className="h-32 rounded-xl p-5">
      <Skeleton className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Skeleton className="h-5 round rounded-xl" />
      </Skeleton>
      <Skeleton className="h-10 rounded mt-2" />
      <Skeleton />
    </Skeleton>
  )
}
