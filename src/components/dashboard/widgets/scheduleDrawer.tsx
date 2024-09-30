"use client"
import * as React from "react"
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DatetimePicker } from "@/components/ui/datetime-picker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import ButtonPody from "@/components/global/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useCreateCall from "@/hooks/call/useCreateCall";
import { addHours, startOfHour, addMinutes, setMinutes } from "date-fns";
import { formOptions, useForm } from "@tanstack/react-form";

const roundToNearestTimeSlot = (date: Date): Date => {
    const minutes = date.getMinutes();
    if (minutes < 30) {
        return setMinutes(date, 30);
    } else {
        return addMinutes(startOfHour(addHours(date, 1)), 0);
    }
}

const formOpts = formOptions<{ title: string }>({
    defaultValues: {
        title: '',
    },
})

const ScheduleDrawer = () => {
    const [scheduleTime, setScheduleTime] = useState<Date>(roundToNearestTimeSlot(new Date()));
    const { createCall } = useCreateCall();
    const router = useRouter();

    const form = useForm<{ title: string }>({
        ...formOpts,
        onSubmit: async ({ value }) => {
            await createCall.mutateAsync({
                title: value.title,
                scheduledTime: scheduleTime.getTime()
            });
            form.reset();
            router.push('/dashboard/call');
        }
    });

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <button className="px-4 py-1.5 bg-transparent border border-slate-600 text-slate-600 rounded-md hover:bg-pody-primary hover:text-slate-900 hover:transition-all hover:border-pody-primary">
                Schedule for Later
                </button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                    <DrawerTitle>Schedule Meeting</DrawerTitle>
                    <DrawerDescription>
                    Set your meeting for later; it can only begin after the new time.
                    </DrawerDescription>
                </DrawerHeader>
                <div className="p-4 pb-0">
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            void form.handleSubmit();
                        }} className="flex items-center justify-center space-x-2">
                            <div className="flex-1 flex flex-col gap-y-4 pb-10">
                                <form.Field
                                    name="title"
                                    validators={{
                                        onChange: ({ value }) => {
                                            if (!value) return 'Title is required'
                                            return undefined
                                        }
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
                                            {field.state.meta.errors && <div className="text-red-500 text-sm mt-1">{field.state.meta.errors[0]}</div>}
                                        </>
                                    )}
                                </form.Field>
                                <div className="w-full">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !scheduleTime && "text-muted-foreground",
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {scheduleTime ? format(scheduleTime, "PPP hh:mm a") : <span>Pick a date</span>}
                                        </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-4">
                                        <DatetimePicker selected={scheduleTime} setDate={setScheduleTime} initialFocus />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div className="text-sm">
                                    <ButtonPody type="submit" disabled={form.state.isSubmitting}>
                                        {form.state.isSubmitting ? 'Scheduling...' : 'Schedule Meeting'}
                                    </ButtonPody>
                                </div>
                            </div>
                        </form>
                </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
};

export default ScheduleDrawer;
