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
      router.push(`/classroom/${classroomId}`);
    } else {
      setErrorMessage(true);
    }
  };
  return (
    <>
      <Drawer>
        <DrawerTrigger className="bg-pody-primary hover:transition-all duration-100 h-10 rounded-full px-8 flex items-center">
          Join Classroom
        </DrawerTrigger>
        <DrawerContent className="z-50">
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader className="pt-6">
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
            <DrawerFooter className="pb-10 pt-0">
              <Button onClick={handleSubmit}>{classroomId ? "Join Classroom" : "Provide Classroom ID"}</Button>
              <DrawerClose asChild>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default JoinDrawer;
