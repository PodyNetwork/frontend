// components/ConfettiMessage.js
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

// Define the props type
interface ConfettiMessageProps {
    giver: string;
    amount: number;
}

const ConfettiMessage: React.FC<ConfettiMessageProps> = ({ giver, amount }) => {
    const messageRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const tl = gsap.timeline();

        // Animate message appearance and disappearance
        tl.to(messageRef.current, { opacity: 1, scale: 1.1, duration: 0.5 })
          .to(messageRef.current, { scale: 1, duration: 0.5, delay: 1 })
          .to(messageRef.current, { opacity: 0, duration: 0.5, delay: 1 });

        // Cleanup: Kill the timeline when the component unmounts
        return () => {
            tl.kill();
        };
    }, [giver, amount]);

    return (
        <div
            ref={messageRef}
            style={{
                position: 'absolute',
                top: '20%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                padding: '20px 30px',
                backgroundColor: '#fff',
                borderRadius: '10px',
                boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
                fontSize: '24px',
                fontWeight: 'bold',
                textAlign: 'center',
                opacity: 0,
                scale: 0,
            }}
        >
            {giver} gifted you ${amount}
        </div>
    );
};

export default ConfettiMessage;
