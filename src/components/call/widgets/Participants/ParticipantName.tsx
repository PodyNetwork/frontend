interface Participant {
  name?: string;
}

interface ParticipantNamePodyProps {
  participant: Participant; // Updated type
}

export const ParticipantNamePody: React.FC<ParticipantNamePodyProps> = ({
  participant,
}) => (
  <div className="text-sm text-slate-700 dark:text-slate-400 flex items-center flex-row __pd_name_max">
    <p className="truncate max-w-fit">
      <span className="font-medium">{participant.name}</span>
    </p>
  </div>
);
