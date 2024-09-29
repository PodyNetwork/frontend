import ButtonPody from "@/components/global/button";
import ScheduleDrawer from "./scheduleDrawer";

const CreateMeeting = () => {
  return (
    <>
      <div className="flex flex-col gap-y-4">
        <h2 className="text-4xl text-slate-800">
          Create <span className="text-slate-500">Meeting</span> for Now or Later
        </h2>
        <div className="text-sm mt-2 flex flex-row gap-x-2">
          <ButtonPody>Create Meeting</ButtonPody>
          <ScheduleDrawer />
        </div>
        <div className="text-sm">Last meeting: 24th september 2021</div>
      </div>
    </>
  );
};

export default CreateMeeting;
