export const MicrophoneIcon = ({ enabled }: { enabled: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`w-5 h-5 ${enabled && "opacity-100 text-red-500"}`}
    viewBox="0 -960 960 960"
    style={{ msFilter: "" }}
    fill="currentColor"
  >
    {enabled ? (
      <path d="M480-420q-41.92 0-70.96-29.04Q380-478.08 380-520v-240q0-41.92 29.04-70.96Q438.08-860 480-860q41.92 0 70.96 29.04Q580-801.92 580-760v240q0 41.92-29.04 70.96Q521.92-420 480-420Zm0-220Zm-30 510v-131.85q-99-11.31-164.5-84.92Q220-420.39 220-520h60q0 83 58.5 141.5T480-320q83 0 141.5-58.5T680-520h60q0 99.61-65.5 173.23Q609-273.16 510-261.85V-130h-60Zm30-350q17 0 28.5-11.5T520-520v-240q0-17-11.5-28.5T480-800q-17 0-28.5 11.5T440-760v240q0 17 11.5 28.5T480-480Z" />
    ) : (
      <path d="m669.23-423.54-30.31-31.84q5.54-11.47 9.08-28.39t3.54-36.23h40q0 30.15-6.08 53.5t-16.23 42.96ZM451.54-642.46Zm78.15 78.92-38.15-38.15V-760q0-17-11.5-28.5t-28.5-11.5q-17 0-28.5 11.5t-11.5 28.5v76.77l-40-40V-760q0-33.85 23.08-56.92Q417.69-840 451.54-840q33.84 0 56.92 23.08 23.08 23.07 23.08 56.92v187.69q0 2.54-.58 4.62-.57 2.08-1.27 4.15ZM431.54-140v-140.69q-94-8.62-157-76.85-63-68.23-63-162.46h40q0 83 58.27 141.5T451.54-320q43.23 0 80.65-17.04 37.43-17.04 64.73-46.81l28.54 28.54q-29 31.46-68.5 51.31t-85.42 23.31V-140h-40Zm365.84 13.23L78.31-845.85l28.31-28.3 719.07 719.07-28.31 28.31Z" />
    )}
  </svg>
);
