"use client"
import * as React from "react"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
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

const ScheduleDrawer = () => {
    const [date, setDate] = React.useState<Date>(new Date());
    
    return (
        <Drawer>
            <DrawerTrigger asChild>
                <button className="px-4 py-1.5 bg-transparent border border-pody-border text-slate-300 rounded-md  hover:bg-pody-primary hover:text-slate-900 hover:transition-all hover:border-pody-primary">
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
                    <div className="flex items-center justify-center space-x-2">
                    <div className="flex-1 flex flex-col gap-y-4 pb-10">
                        <Input type="text" placeholder="Title" />
                        <div className="w-full">
                            <Popover>
                                <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !date && "text-muted-foreground",
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "PPP HH:mm") : <span>Pick a date</span>}
                                </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-4">
                                <DatetimePicker selected={date} setDate={setDate} initialFocus />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="text-sm">
                            <ButtonPody>Schedule Meeting</ButtonPody>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
};

export default ScheduleDrawer;
