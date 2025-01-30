import React from "react";

const Disclaimer = () => {
  return (
    <p className="text-xs text-slate-700 leading-snug">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="size-5 text-red-500"
        viewBox="0 -960 960 960"
        fill="currentColor"
      >
        <path d="m40-120 440-760 440 760H40Zm138-80h604L480-720 178-200Zm302-40q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240Zm-40-120h80v-200h-80v200Zm40-100Z" />
      </svg>
      <p className="mt-1">
        Disclaimer: When joining a public classroom, please be cautious and
        mindful of your privacy and security. We do not control or monitor these
        sessions, and we are not responsible for any content, behavior, or
        interactions that take place within them. You are participating at your
        own risk, and you should never share personal, sensitive, or financial
        information. Be aware that other participants may record or share the
        conversation without your consent. We are not liable for any harm,
        misconduct, or consequences that may arise from your participation.
      </p>
    </p>
  );
};

export default Disclaimer;
