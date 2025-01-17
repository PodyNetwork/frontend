// Define the Participant type
interface Participant {
  identity: string;
  permissions?: {
    canPublish?: boolean;
  };
}

interface HeaderParticipantProps {
  enabled: boolean;
  participants: Participant[];
  participantBarToggle: () => void;
}

export const HeaderParticipant = ({
  enabled,
  participants,
  participantBarToggle,
}: HeaderParticipantProps) => (
  <div
    className={`hidden md:flex flex-row px-4 py-4 justify-between text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 ${
      !enabled && "md:justify-center"
    }`}
  >
    <h3 className={`font-medium text-base ${!enabled && "md:hidden"}`}>
      <span>{participants.length > 1 ? "Participants" : "Participant"}</span>{" "}
    </h3>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      viewBox="0 -960 960 960"
      fill="currentColor"
      onClick={participantBarToggle}
    >
      <path d="M480-189.23q-24.75 0-42.37-17.63Q420-224.48 420-249.23q0-24.75 17.63-42.38 17.62-17.62 42.37-17.62 24.75 0 42.37 17.62Q540-273.98 540-249.23q0 24.75-17.63 42.37-17.62 17.63-42.37 17.63ZM480-420q-24.75 0-42.37-17.63Q420-455.25 420-480q0-24.75 17.63-42.37Q455.25-540 480-540q24.75 0 42.37 17.63Q540-504.75 540-480q0 24.75-17.63 42.37Q504.75-420 480-420Zm0-230.77q-24.75 0-42.37-17.62Q420-686.02 420-710.77q0-24.75 17.63-42.37 17.62-17.63 42.37-17.63 24.75 0 42.37 17.63Q540-735.52 540-710.77q0 24.75-17.63 42.38-17.62 17.62-42.37 17.62Z" />
    </svg>
  </div>
);
