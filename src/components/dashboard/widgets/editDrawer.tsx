"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DatetimePicker } from "@/components/ui/datetime-picker";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import ButtonPody from "@/components/global/button";
import { useRouter } from "next/navigation";
import useUpdateCall from "@/hooks/call/useUpdateCall";
import { formOptions, useForm } from "@tanstack/react-form";
// import { useAuth } from "@/hooks/useAuth";

interface ToggleSwitchProps {
  label: string;
  initialState?: boolean;
  onChange?: (isChecked: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  label,
  initialState = false,
  onChange,
}) => {
  const [isChecked, setIsChecked] = useState(initialState);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent form submission
    const newState = !isChecked;
    setIsChecked(newState);
    onChange?.(newState);
  };

  return (
    <div className="flex items-center justify-between py-2">
      <label
        htmlFor={`toggle-${label}`}
        className="mr-3 text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <button
        type="button" 
        id={`toggle-${label}`}
        role="switch"
        aria-checked={isChecked}
        onClick={handleToggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
          isChecked ? "bg-pody-primary" : "bg-gray-200"
        }`}
      >
        <span className="sr-only">{label}</span>
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            isChecked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
};

interface EditDrawerProps {
  call: {
    id: string;
    title: string;
    scheduledTime: number;
    participantsCanPublish: boolean;
    type: "instant" | "scheduled";
  };
}

const EditDrawer: React.FC<EditDrawerProps> = ({ call }) => {
  const [scheduledTime, setScheduledTime] = useState<Date|null>(call.scheduledTime ? new Date(call.scheduledTime) : null);
  const [canSpeak, setCanSpeak] = useState(call.participantsCanPublish);
  const { updateCall, errorMessage } = useUpdateCall();
  const router = useRouter();

  const form = useForm<{ title: string }>({
    ...formOptions({
      defaultValues: { title: call.title },
    }),
    onSubmit: async ({ value }) => {
      await updateCall.mutateAsync({
        _id: call._id,
        title: value.title,
        scheduledTime: call.type === "scheduled" ? scheduledTime?.getTime() : undefined,
        participantsCanPublish: canSpeak,
      });
      router.refresh();
    },
  });

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <div className="flex ml-auto cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7 text-pody-dark"
            viewBox="0 -960 960 960"
            fill="currentColor"
          >
            <path d="M200-200h43.92l427.93-427.92-43.93-43.93L200-243.92V-200Zm-40 40v-100.77l527.23-527.77q6.15-5.48 13.57-8.47 7.43-2.99 15.49-2.99t15.62 2.54q7.55 2.54 13.94 9.15l42.69 42.93q6.61 6.38 9.04 14 2.42 7.63 2.42 15.25 0 8.13-2.74 15.56-2.74 7.42-8.72 13.57L260.77-160H160Zm600.77-556.31-44.46-44.46 44.46 44.46ZM649.5-649.5l-21.58-22.35 43.93 43.93-22.35-21.58Z" />
          </svg>
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Edit Meeting</DrawerTitle>
            <DrawerDescription>
              Update your meeting details here.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                void form.handleSubmit();
              }}
              className="flex items-center justify-center space-x-2"
            >
              <div className="flex-1 flex flex-col gap-y-2 pb-10">
                <form.Field
                  name="title"
                  validators={{
                    onChange: ({ value }) => {
                      if (!value) return "Title is required";
                      return undefined;
                    },
                  }}
                >
                  {(field) => (
                    <>
                      <Input
                        type="text"
                        placeholder="Title"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {field.state.meta.errors && (
                        <div className="text-red-400 text-sm mb-1">
                          {field.state.meta.errors[0]}
                        </div>
                      )}
                    </>
                  )}
                </form.Field>
                {
                 call.type === "scheduled" && <div className="w-full">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !scheduledTime && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {scheduledTime ? (
                          format(scheduledTime, "PPP hh:mm a")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-4">
                    <DatetimePicker
                        selected={scheduledTime}
                        setDate={setScheduledTime}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                }
                <div>
                  <ToggleSwitch
                    label="Participant Can Speak"
                    initialState={canSpeak}
                    onChange={setCanSpeak}
                  />
                </div>
                <div className="text-sm mt-2">
                  <ButtonPody type="submit" disabled={form.state.isSubmitting}>
                    {form.state.isSubmitting ? "Updating..." : "Update Meeting"}
                  </ButtonPody>
                </div>
                {errorMessage && (
                  <div className="text-red-400 text-sm mt-2">
                    {errorMessage.message}
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default EditDrawer;