import React from "react";
import Button from "@/components/global/button";
import ButtonBorder from "@/components/global/buttonborder";

const CreateMeeting = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <h2 className="text-4xl text-slate-800">
        Create <span className="text-slate-500">Meeting</span> for Now or Later
      </h2>
      <div className="text-sm mt-2 flex flex-row gap-x-2">
        <Button>Create Meeting</Button>
        <ButtonBorder>Schedule for Later</ButtonBorder>
      </div>
      <div className="text-sm">Last meeting: 24th september 2021</div>
    </div>
  );
};

export default CreateMeeting;
