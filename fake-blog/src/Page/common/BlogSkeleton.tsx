import { Skeleton } from "@/components/ui/skeleton";

export function BlogSkeleton() {
  return (
    <div className="flex flex-col gap-4 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow">
      <div className="flex items-center gap-3">
      <Skeleton className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700" />
      <Skeleton className="h-4 w-24 bg-gray-200 dark:bg-gray-700" />
      </div>
      <Skeleton className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700" />
      <Skeleton className="h-4 w-full bg-gray-200 dark:bg-gray-700" />
      <Skeleton className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700" />
      <div className="flex gap-2 mt-2">
      <Skeleton className="h-4 w-12 bg-gray-200 dark:bg-gray-700" />
      <Skeleton className="h-4 w-10 bg-gray-200 dark:bg-gray-700" />
      </div>
      <div className="flex items-center gap-3">
      <Skeleton className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700" />
      <Skeleton className="h-4 w-24 bg-gray-200 dark:bg-gray-700" />
      </div>
      <Skeleton className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700" />
      <Skeleton className="h-4 w-full bg-gray-200 dark:bg-gray-700" />
      <Skeleton className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700" />
      <div className="flex gap-2 mt-2">
      <Skeleton className="h-4 w-12 bg-gray-200 dark:bg-gray-700" />
      <Skeleton className="h-4 w-10 bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>
  );
}