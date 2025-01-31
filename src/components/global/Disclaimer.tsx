import { useState } from "react"; // Import useState
import {
  Drawer,
  DrawerClose,
  DrawerContent, DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";
import { Button } from "../ui/button";

const Disclaimer = () => {
  // Add state management
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Drawer
      open={isOpen}
      onOpenChange={setIsOpen} // Connect state to drawer
    >
      <DrawerTrigger>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-4 text-red-500 cursor-pointer"
          viewBox="0 -960 960 960"
          fill="currentColor"
        >
          <path d="m40-120 440-760 440 760H40Zm138-80h604L480-720 178-200Zm302-40q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240Zm-40-120h80v-200h-80v200Zm40-100Z" />
        </svg>
      </DrawerTrigger>
      <DrawerContent className="z-50">
        <div className="mx-auto w-full max-w-md">
          <DrawerHeader className="pt-6">
            <DrawerTitle>Disclaimer</DrawerTitle>
            <p className="text-xs mt-3 text-slate-600">
              Please be cautious and mindful of your privacy and security. We do
              not control or monitor these sessions, and we are not responsible
              for any content, behavior, or interactions that take place within
              them. You are participating at your own risk, and you should never
              share personal, sensitive, or financial information. Be aware that
              other participants may record or share the conversation without
              your consent. We are not liable for any harm, misconduct, or
              consequences that may arise from your participation.
            </p>
          </DrawerHeader>
          <DrawerFooter className="pb-10 pt-0">
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default Disclaimer;
