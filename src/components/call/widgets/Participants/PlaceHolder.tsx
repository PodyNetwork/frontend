import { LocalAudioTrack, RemoteAudioTrack, TrackPublication } from "livekit-client"; 
import { AvatarParticipant } from "../../../Avatar/AvatarParticipant";
import AudioAnalyzerCircle from "../Audio/AudioAnalyzerCircle";

interface Participant {
    audioTrackPublications: Map<string, TrackPublication>;
}

const PlaceHolder = ({ name, participant }: { name: string; participant: Participant }) => {
    const audioTrackPublications = Array.from(participant.audioTrackPublications.values());

    const hasActiveAudioTrack = audioTrackPublications.some(audioTrackPublication => {
        const audioTrack = audioTrackPublication.track;
        return audioTrack && !audioTrackPublication.isMuted; 
    });

    return (
        <div className="w-full h-full absolute top-0 left-0 flex flex-col items-center justify-center">
            <div className="w-[20%] md:w-[12%]">
                <AvatarParticipant name={name} />
            </div>
            <div className={`max-w-sm ${hasActiveAudioTrack ? 'h-[15%]' : 'h-0 overflow-hidden'}`}>
                {audioTrackPublications.map((audioTrackPublication) => {
                    const audioTrack = audioTrackPublication.track; 

                    if (audioTrack && "trackSid" in audioTrackPublication) { 
                        return (
                            <AudioAnalyzerCircle 
                                key={audioTrackPublication.trackSid} 
                                track={audioTrack as LocalAudioTrack | RemoteAudioTrack} 
                            />
                        );
                    }
                    return null; 
                })}
            </div>
        </div>
    );
};

export default PlaceHolder;
