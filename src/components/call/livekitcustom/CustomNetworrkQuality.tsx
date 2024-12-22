import { ConnectionQualityIndicatorOptions, useConnectionQualityIndicator } from '@livekit/components-react';
import * as React from 'react';

export interface ConnectionQualityIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    ConnectionQualityIndicatorOptions {}

export const CustomConnectionQualityIndicator: React.FC<
  ConnectionQualityIndicatorProps & React.RefAttributes<HTMLDivElement>
> = React.forwardRef<HTMLDivElement, ConnectionQualityIndicatorProps>(function ConnectionQualityIndicator(
  props: ConnectionQualityIndicatorProps,
  ref,
) {
  const { quality } = useConnectionQualityIndicator(props);

  const [isVisible, setIsVisible] = React.useState(true);
  
  const getDotColor = () => {
    switch (quality) {
      case 'excellent':
        return 'bg-green-600'; 
      case 'good':
        return 'bg-yellow-500'; 
      case 'poor':
      case 'lost':
        return 'bg-red-600';
      default:
        return null;
    }
  };

  React.useEffect(() => {
    const handleUserActivity = () => {
      setIsVisible(true);
      clearTimeout(timer);
      timer = setTimeout(() => setIsVisible(false), 3000); 
    };

    let timer = setTimeout(() => setIsVisible(false), 3000); 
    
    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('click', handleUserActivity);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('click', handleUserActivity);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  const dotColor = getDotColor();

  return (
    <div ref={ref} data-lk-quality={quality} className="custom-connection-quality-indicator">
      <div className="flex items-center gap-1">
        {dotColor && <div className={`size-1.5 ${dotColor} rounded-full`} />}
        <p className="text-xs text-slate-600 dark:text-slate-300">{quality !== 'unknown' ? quality : ''}</p>
      </div>
    </div>
  );
});
