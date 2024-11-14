interface Participant {
    name?: string; 
  }
  
  interface ParticipantNamePodyProps {
    participant: Participant; // Updated type
  }
  
  export const ParticipantNamePody: React.FC<ParticipantNamePodyProps> = ({ participant }) => (
    <p className="text-sm text-slate-700 dark:text-slate-400 __pd_name_max truncate">
      <span className="leading-none font-medium">{participant.name}</span>
    </p>
  );
  