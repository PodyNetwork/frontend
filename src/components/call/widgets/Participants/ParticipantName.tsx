interface Participant {
    name?: string; 
  }
  
  interface ParticipantNamePodyProps {
    participant: Participant; // Updated type
  }
  
  export const ParticipantNamePody: React.FC<ParticipantNamePodyProps> = ({ participant }) => (
    <p className="text-sm text-slate-600 dark:text-slate-300">
      <span className="leading-none truncate">{participant.name}</span>
    </p>
  );
  