import { Call } from '@/app/classroom/types';
import useGetPublicCalls from '@/hooks/call/useGetPublicCalls';
import Inactivecall from './Inactivecall';
import SkeletonCard from './SkeletonCard';
import { useRouter } from 'next/navigation';
import OngoingCallCard from './OngoingCallCard';

const Publiccall = () => {
    const { calls, hasNextPage, isLoading } =
      useGetPublicCalls({
        limit: 4,
        sortDirection: "desc",
        type: "instant"
      });
  
    const router = useRouter();
  
   
  
    function goToExplore() {
      const fullUrl = `/dashboard/explore`;
      router.push(fullUrl);
    }
  
    
  
    const renderCalls = () => (
      <>
        {calls.length === 0 && !isLoading && <Inactivecall />}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {isLoading && <SkeletonCard />}
          {calls?.map((call: Call) => (
            <OngoingCallCard key={call._id} call={call} />
          ))}
        </div>
        {hasNextPage && (
          <button
            className="mt-4 bg-pody-dark text-sm rounded-full px-8 py-4 text-slate-200 hover:opacity-80 transition-all duration-300"
            onClick={goToExplore}
          >
            Explore More
          </button>
        )}
      </>
    );
  
    return <div className="w-full mt-4">{renderCalls()}</div>;
  };

export default Publiccall