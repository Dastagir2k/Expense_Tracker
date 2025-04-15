import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const DashboardSkeleton = () => {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton width={200} height={32} />
          <Skeleton width={300} height={20} />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton width={180} height={40} />
          <Skeleton width={120} height={40} />
        </div>
      </div>

      {/* Summary Cards Skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="p-6 rounded-lg border">
            <div className="flex justify-between items-center mb-2">
              <Skeleton width={100} height={16} />
              <Skeleton circle width={16} height={16} />
            </div>
            <Skeleton width={120} height={28} />
            <Skeleton width={150} height={14} />
          </div>
        ))}
      </div>

      {/* Tabs Skeleton */}
      <div className="space-y-4">
        <div className="flex gap-2">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} width={100} height={40} />
          ))}
        </div>

        {/* Chart Area Skeleton */}
        <div className="rounded-lg border p-6">
          <div className="space-y-2 mb-6">
            <Skeleton width={200} height={24} />
            <Skeleton width={300} height={16} />
          </div>
          <Skeleton height={400} />
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;