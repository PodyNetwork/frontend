import React from "react";

interface ParticipantSearchProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

const ParticipantSearch: React.FC<ParticipantSearchProps> = ({ searchQuery, setSearchQuery }) => {
    return (
        <input
            type="text"
            placeholder="Search Participants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-3 text-xs w-full px-3 py-2 h-10 rounded-md outline-none bg-slate-100 dark:bg-pody-oxfordblue text-slate-700 dark:text-slate-300"
        />
    );
};

export default ParticipantSearch;
