import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

// Add this component before your main return statement
const BudgetCardSkeleton = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="w-full">
            <Skeleton width={150} height={24} />
            <Skeleton width={120} height={20} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Skeleton width={100} height={20} />
            <Skeleton width={100} height={20} />
          </div>
          <div className="space-y-2">
            <Skeleton height={8} />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Skeleton width="100%" height={36} />
      </CardFooter>
    </Card>
  )
}

export default BudgetCardSkeleton;  