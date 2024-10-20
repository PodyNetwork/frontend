"use client";
import React, { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
const JoinDrawer = () => {
  const router = useRouter();
  const [classroomId, setClassroomId] = useState("");

  const [errorMessage, setErrorMessage] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setClassroomId(event.target.value);
  };
  const handleSubmit = () => {
    const pattern = /^[a-zA-Z0-9-]+$/;

    if (pattern.test(classroomId)) {
      router.push(`/call/${classroomId}`);
    } else {
      setErrorMessage(true);
    }
  };
  return (
    <>
      <Drawer>
        <DrawerTrigger className="px-4 py-2 bg-transparent border border-pody-border text-slate-300 rounded-md  hover:bg-pody-primary hover:text-slate-900 hover:transition-all hover:border-pody-primary">
          Join Classroom
        </DrawerTrigger>
        <DrawerContent className="z-50">
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Join Classroom</DrawerTitle>
              <DrawerDescription>Enter your classroom ID</DrawerDescription>
              <div className="mt-1">
                <Input
                  type="text"
                  placeholder="Classroom ID"
                  value={classroomId}
                  onChange={handleInputChange}
                  className="px-3"
                />
                {errorMessage && <span className="text-xs text-red-500">Invalid Classroom ID</span>}
              </div>
            </DrawerHeader>
            <DrawerFooter>
              <Button onClick={handleSubmit}>Submit</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default JoinDrawer;
