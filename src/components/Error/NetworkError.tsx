"use client";

const NetworkError = () => {
  const EndCallIcon = () => (
    <div
      className="mb-4 text-red-500"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-12 h-12"
        viewBox="0 -960 960 960"
        fill="currentColor"
      >
        <path d="m663.23-409.77-26.69-26.69q20.46-26.77 31.96-58.16Q680-526 680-560q0-40-14.85-76.77-14.84-36.77-43.61-64.77L648-728q33.38 34.15 51.31 77.54 17.92 43.38 17.92 91.23 0 41.08-13.54 79.58t-40.46 69.88ZM548.08-524.92 444.92-628.08q8.16-4.69 16.93-6.77 8.77-2.07 18.15-2.07 32 0 54.46 22.46T556.92-560q0 9.38-2.07 18.15-2.08 8.77-6.77 16.93Zm208.84 208.61-26.46-26.46q39.23-45 60.39-101.11Q812-500 812-560q0-66-25.27-126.73-25.27-60.73-72.27-107.73l26.46-26.46q51.93 52.61 80.12 119.84 28.19 67.23 28.19 141.08 0 67.85-23.19 130.96-23.19 63.12-69.12 112.73Zm36.39 206.46L500-403.15v247.77h-40v-287.77L289.23-613.69q-4.61 13.54-6.92 26.84Q280-573.54 280-560q0 40 14.85 76.77 14.84 36.77 43.61 64.77L312-392q-33.38-33.38-51.31-76.77-17.92-43.38-17.92-91.23 0-21.62 3.54-42.62 3.54-21 13.15-41.07l-71-71q-20.23 35.92-30.34 74.54Q148-601.54 148-560q0 66 25.27 126.73 25.27 60.73 72.27 107.73l-26.46 26.46q-51.93-52.61-80.12-119.84-28.19-67.23-28.19-141.08 0-48.62 12.19-94.96 12.19-46.35 37.35-87.89l-50.46-50.46 28.3-28.54 683.7 683.7-28.54 28.3Z"/>
      </svg>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pody-dark_secondary text-white p-4">
      <div className="max-w-xs flex justify-center items-center flex-col text-center">
        <EndCallIcon />
        <h2 className="text-base xs:text-xl font-medium mb-2">
          Oops Connection Error
        </h2>
        <p className="text-xs mb-8">
        No internet connection. Please check your connection and try again.
        </p>
      </div>
    </div>
  );
};

export default NetworkError;
