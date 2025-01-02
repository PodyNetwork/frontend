import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
  interface MoreControlsProps {
    participant: {
      identity: string;
      permissions?: {
        canPublish?: boolean;
      };
    };
    handleAddToSpeak: (username: string) => void;
    handleRemoveFromSpeak: (username: string) => void;
    handleMuteParticipant: (username: string) => void;
  }
  
  const MoreControls: React.FC<MoreControlsProps> = ({
    participant,
    handleAddToSpeak,
    handleRemoveFromSpeak,
    handleMuteParticipant,
  }) => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 -960 960 960"
            fill="currentColor"
          >
            <path d="M480-189.23q-24.75 0-42.37-17.63Q420-224.48 420-249.23q0-24.75 17.63-42.38 17.62-17.62 42.37-17.62 24.75 0 42.37 17.62Q540-273.98 540-249.23q0 24.75-17.63 42.37-17.62 17.63-42.37 17.63ZM480-420q-24.75 0-42.37-17.63Q420-455.25 420-480q0-24.75 17.63-42.37Q455.25-540 480-540q24.75 0 42.37 17.63Q540-504.75 540-480q0 24.75-17.63 42.37Q504.75-420 480-420Zm0-230.77q-24.75 0-42.37-17.62Q420-686.02 420-710.77q0-24.75 17.63-42.37 17.62-17.63 42.37-17.63 24.75 0 42.37 17.63Q540-735.52 540-710.77q0 24.75-17.63 42.38-17.62 17.62-42.37 17.62Z" />
          </svg>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem 
            className="text-xs"
            onClick={() => handleMuteParticipant(participant.identity)}
          >
            Mute
          </DropdownMenuItem>
          <DropdownMenuItem className="text-xs">
            {!participant.permissions?.canPublish ? (
              <button
                className="text-xs text-blue-500 w-full text-left"
                onClick={() => handleAddToSpeak(participant.identity)}
              >
                Add to speak
              </button>
            ) : (
              <button
                className="text-xs text-pody-danger w-full text-left"
                onClick={() => handleRemoveFromSpeak(participant.identity)}
              >
                Remove from speakers
              </button>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };
  
  export default MoreControls;