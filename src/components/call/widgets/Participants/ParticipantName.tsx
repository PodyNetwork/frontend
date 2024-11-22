import Image from "next/image";
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
    <Image
      src="/milestone/verified.svg"
      alt="badge"
      className="ml-1 w-3.5 h-3.5 object-cover"
      width={100}
      height={100}
    />
  </div>
);
