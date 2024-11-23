import { AvatarParticipant } from "@/components/Avatar/AvatarParticipant";
import React, { useCallback, useEffect, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Aside = () => {
  const limitedVideoCount = 4;

  const _tabs__control = `xs:rounded-full w-full xs:w-auto px-4 py-1.5 h-auto shadow-none focus:outline-none data-[state=active]:bg-[#292B2C] data-[state=active]:text-white`;

  const isSending = false;

  const chatHeaderRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLDivElement>(null);

  const updateChatHeights = useCallback(() => {
    if (chatHeaderRef.current && chatInputRef.current) {
      const headerHeight = chatHeaderRef.current.offsetHeight;
      const inputHeight = chatInputRef.current.offsetHeight;

      const headerdHeight = headerHeight;
      const inputeHeight = inputHeight;

      console.log(inputeHeight);

      document.documentElement.style.setProperty(
        "--chatHeader-height-v2",
        `${headerdHeight}px`
      );

      document.documentElement.style.setProperty(
        "--chatInput-height-v2",
        `${inputeHeight}px`
      );
    }
  }, []);

  useEffect(() => {
    updateChatHeights();

    const onResize = () => {
      updateChatHeights();
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [updateChatHeights]);
  return (
    <div className="w-full h-full __stream_info_pdT overflow-hidden flex flex-col">
      <div className="__chat_max_height_container h-full">
        <Tabs defaultValue="__chat" className="w-full h-full">
          <div
            ref={chatHeaderRef}
            className="flex justify-center items-center gap-x-2 relative"
          >
            <TabsList className="w-full xs:w-auto xs:rounded-full h-auto p-1 flex-col xs:flex-row bg-[#1D1F20]">
              <TabsTrigger value="__chat" className={_tabs__control}>
                Chat
              </TabsTrigger>
              <TabsTrigger value="__participant" className={_tabs__control}>
                Participant
              </TabsTrigger>
            </TabsList>
            <button className="w-7 h-7 rounded-full bg-[#292B2C] absolute right-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 m-auto text-slate-400"
                viewBox="0 -960 960 960"
                fill="currentColor"
              >
                <path d="M256-213.85 213.85-256l224-224-224-224L256-746.15l224 224 224-224L746.15-704l-224 224 224 224L704-213.85l-224-224-224 224Z" />
              </svg>
            </button>
          </div>
          <TabsContent value="__chat" className="mt-0 h-full">
            <div className="flex flex-col __chat_max_height_v2">
              <div className="font-semibold text-slate-200 mt-4 pb-2">Chat</div>
              <div className="flex-1 overflow-auto">
                <div className="py-4 text-slate-500 text-[0.8rem] flex flex-col gap-y-5">
                  <div className="flex flex-row gap-x-3">
                    <div className="min-w-8 min-h-8 max-w-8 max-h-8 rounded-full">
                      <AvatarParticipant name="eax" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-row items-center text-slate-200 font-medium gap-x-2">
                        <h3>Eax Ghosty</h3>
                        <p className="text-[0.7rem] font-normal text-slate-400">
                          10mins ago
                        </p>
                      </div>
                      <p className="text-sm md:text-xs mt-1.5">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Alias tempora repudiandae autem in quos laboriosam
                        voluptas perferendis nobis totam natus! Mollitia dolore
                        id, maiores voluptatem eius porro amet nulla odio?
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row gap-x-3">
                    <div className="min-w-8 min-h-8 max-w-8 max-h-8 rounded-full">
                      <AvatarParticipant name="oracle" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-row items-center text-slate-200 font-medium gap-x-2">
                        <h3>iamoracle</h3>
                        <p className="text-[0.7rem] font-normal text-slate-400">
                          7mins ago
                        </p>
                      </div>
                      <p className="text-sm md:text-xs mt-1.5">Hello</p>
                    </div>
                  </div>
                  <div className="flex flex-row gap-x-3">
                    <div className="min-w-8 min-h-8 max-w-8 max-h-8 rounded-full">
                      <AvatarParticipant name="paul" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-row items-center text-slate-200 font-medium gap-x-2">
                        <h3>pauly briany</h3>
                        <p className="text-[0.7rem] font-normal text-slate-400">
                          5mins ago
                        </p>
                      </div>
                      <p className="text-sm md:text-xs mt-1.5">
                        pisicing elit. Alias tempora repudiandae autem in quos
                        laboriosam voluptas perferendis nobis totam natus!
                        Mollitia dolore id, maiores voluptatem eius porro amet
                        nulla odio?
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row gap-x-3">
                    <div className="min-w-8 min-h-8 max-w-8 max-h-8 rounded-full">
                      <AvatarParticipant name="emmy" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-row items-center text-slate-200 font-medium gap-x-2">
                        <h3>Emmy</h3>
                        <p className="text-[0.7rem] font-normal text-slate-400">
                          5mins ago
                        </p>
                      </div>
                      <p className="text-sm md:text-xs mt-1.5">
                        I have my address here pisicing elit. Alias tempora
                        repudiandae autem in quos laboriosam voluptas
                        perferendis
                        <br />
                        <br />
                        nobis totam natus! Mollitia dolore id, maiores
                        voluptatem eius porro amet nulla odio?
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row gap-x-3">
                    <div className="min-w-8 min-h-8 max-w-8 max-h-8 rounded-full">
                      <AvatarParticipant name="Tosin" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-row items-center text-slate-200 font-medium gap-x-2">
                        <h3>Tosiny</h3>
                        <p className="text-[0.7rem] font-normal text-slate-400">
                          5mins ago
                        </p>
                      </div>
                      <p className="text-sm md:text-xs mt-1.5">
                        Ilaboriosam voluptas perferendis nobis tot id, maiores
                        voluptatem eius porro amet nulla odio?
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row gap-x-3">
                    <div className="min-w-8 min-h-8 max-w-8 max-h-8 rounded-full">
                      <AvatarParticipant name="eax" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-row items-center text-slate-200 font-medium gap-x-2">
                        <h3>Eax Ghosty</h3>
                        <p className="text-[0.7rem] font-normal text-slate-400">
                          10mins ago
                        </p>
                      </div>
                      <p className="text-sm md:text-xs mt-1.5">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Alias tempora repudiandae autem in quos laboriosam
                        voluptas perferendis nobis totam natus! Mollitia dolore
                        id, maiores voluptatem eius porro amet nulla odio?
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row gap-x-3">
                    <div className="min-w-8 min-h-8 max-w-8 max-h-8 rounded-full">
                      <AvatarParticipant name="oracle" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-row items-center text-slate-200 font-medium gap-x-2">
                        <h3>iamoracle</h3>
                        <p className="text-[0.7rem] font-normal text-slate-400">
                          7mins ago
                        </p>
                      </div>
                      <p className="text-sm md:text-xs mt-1.5">Hello</p>
                    </div>
                  </div>
                  <div className="flex flex-row gap-x-3">
                    <div className="min-w-8 min-h-8 max-w-8 max-h-8 rounded-full">
                      <AvatarParticipant name="paul" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-row items-center text-slate-200 font-medium gap-x-2">
                        <h3>pauly briany</h3>
                        <p className="text-[0.7rem] font-normal text-slate-400">
                          5mins ago
                        </p>
                      </div>
                      <p className="text-sm md:text-xs mt-1.5">
                        pisicing elit. Alias tempora repudiandae autem in quos
                        laboriosam voluptas perferendis nobis totam natus!
                        Mollitia dolore id, maiores voluptatem eius porro amet
                        nulla odio?
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row gap-x-3">
                    <div className="min-w-8 min-h-8 max-w-8 max-h-8 rounded-full">
                      <AvatarParticipant name="emmy" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-row items-center text-slate-200 font-medium gap-x-2">
                        <h3>Emmy</h3>
                        <p className="text-[0.7rem] font-normal text-slate-400">
                          5mins ago
                        </p>
                      </div>
                      <p className="text-sm md:text-xs mt-1.5">
                        I have my address here pisicing elit. Alias tempora
                        repudiandae autem in quos laboriosam voluptas
                        perferendis
                        <br />
                        <br />
                        nobis totam natus! Mollitia dolore id, maiores
                        voluptatem eius porro amet nulla odio?
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row gap-x-3">
                    <div className="min-w-8 min-h-8 max-w-8 max-h-8 rounded-full">
                      <AvatarParticipant name="Tosin" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-row items-center text-slate-200 font-medium gap-x-2">
                        <h3>Tosiny</h3>
                        <p className="text-[0.7rem] font-normal text-slate-400">
                          5mins ago
                        </p>
                      </div>
                      <p className="text-sm md:text-xs mt-1.5">
                        Ilaboriosam voluptas perferendis nobis tot id, maiores
                        voluptatem eius porro amet nulla odio?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="relative w-full max-w-full mt-auto"
              ref={chatInputRef}
            >
              <div className="py-4 w-full max-w-full flex flex-row items-center gap-x-1.5">
                <form className="relative flex-1">
                  <div className="flex items-center">
                    <input
                      type="text"
                      placeholder="Message..."
                      className="w-full px-3 h-10 rounded-full bg-[#292B2C] text-slate-400 outline-none text-sm pr-10"
                    />
                    <SendButton isSending={isSending} />
                  </div>
                </form>
                <div className="font-bold cursor-pointer">
                  <GiftButtonIcon />
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent className="h-full mt-0" value="__participant">
            <div className="flex flex-col h-full __participant_max_height_v2">
              <div className="font-semibold text-slate-200 mt-4 pb-2">
                Participants
              </div>
              <div className="flex-1 overflow-auto flex flex-col gap-y-3 __participant_ pb-5">
                <div className="flex flex-row gap-x-2 bg-[#292B2C]/30 p-1 rounded-full items-center">
                  <div className="min-w-8 min-h-8 max-w-8 max-h-8 rounded-full">
                    <AvatarParticipant name="eax" />
                  </div>
                  <div className="flex-1 text-slate-200 text-[0.805rem] font-medium overflow-hidden">
                    <h3 className="truncate w-9/12">Emmy Phily</h3>
                  </div>
                  <div className="flex flex-row items-center gap-x-2 me-2">
                    <p className="text-xs truncate font-normal text-slate-400">
                      Speaker
                    </p>
                    <button className="w-5 h-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-full m-auto text-slate-400"
                        viewBox="0 -960 960 960"
                        fill="currentColor"
                      >
                        <path d="M480-400q-50 0-85-35t-35-85v-240q0-50 35-85t85-35q50 0 85 35t35 85v240q0 50-35 85t-85 35Zm0-240Zm-40 520v-123q-104-14-172-93t-68-184h80q0 83 58.5 141.5T480-320q83 0 141.5-58.5T680-520h80q0 105-68 184t-172 93v123h-80Zm40-360q17 0 28.5-11.5T520-520v-240q0-17-11.5-28.5T480-800q-17 0-28.5 11.5T440-760v240q0 17 11.5 28.5T480-480Z" />
                      </svg>
                    </button>
                    <button className="w-5 h-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-full m-auto text-slate-400"
                        viewBox="0 -960 960 960"
                        fill="currentColor"
                      >
                        <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h480q33 0 56.5 23.5T720-720v180l160-160v440L720-420v180q0 33-23.5 56.5T640-160H160Zm0-80h480v-480H160v480Zm0 0v-480 480Z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="flex flex-row gap-x-2 bg-[#292B2C]/30 p-1 rounded-full items-center">
                  <div className="min-w-8 min-h-8 max-w-8 max-h-8 rounded-full">
                    <AvatarParticipant name="iamoracle" />
                  </div>
                  <div className="flex-1 text-slate-200 text-[0.805rem] font-medium overflow-hidden">
                    <h3 className="truncate w-9/12">Emmy Phily</h3>
                  </div>
                  <div className="flex flex-row items-center gap-x-2 me-2">
                    <p className="text-xs truncate font-normal text-slate-400">
                      Speaker
                    </p>
                    <button className="w-5 h-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-full m-auto text-slate-400"
                        viewBox="0 -960 960 960"
                        fill="currentColor"
                      >
                        <path d="M480-400q-50 0-85-35t-35-85v-240q0-50 35-85t85-35q50 0 85 35t35 85v240q0 50-35 85t-85 35Zm0-240Zm-40 520v-123q-104-14-172-93t-68-184h80q0 83 58.5 141.5T480-320q83 0 141.5-58.5T680-520h80q0 105-68 184t-172 93v123h-80Zm40-360q17 0 28.5-11.5T520-520v-240q0-17-11.5-28.5T480-800q-17 0-28.5 11.5T440-760v240q0 17 11.5 28.5T480-480Z" />
                      </svg>
                    </button>
                    <button className="w-5 h-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-full m-auto text-slate-400"
                        viewBox="0 -960 960 960"
                        fill="currentColor"
                      >
                        <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h480q33 0 56.5 23.5T720-720v180l160-160v440L720-420v180q0 33-23.5 56.5T640-160H160Zm0-80h480v-480H160v480Zm0 0v-480 480Z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="flex flex-row gap-x-2 bg-[#292B2C]/30 p-1 rounded-full items-center">
                  <div className="min-w-8 min-h-8 max-w-8 max-h-8 rounded-full">
                    <AvatarParticipant name="tosin" />
                  </div>
                  <div className="flex-1 text-slate-200 text-[0.805rem] font-medium overflow-hidden">
                    <h3 className="truncate w-9/12">Emmy Phily</h3>
                  </div>
                  <div className="flex flex-row items-center gap-x-2 me-2">
                    <p className="text-xs truncate font-normal text-slate-400">
                      Speaker
                    </p>
                    <button className="w-5 h-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-full m-auto text-slate-400"
                        viewBox="0 -960 960 960"
                        fill="currentColor"
                      >
                        <path d="M480-400q-50 0-85-35t-35-85v-240q0-50 35-85t85-35q50 0 85 35t35 85v240q0 50-35 85t-85 35Zm0-240Zm-40 520v-123q-104-14-172-93t-68-184h80q0 83 58.5 141.5T480-320q83 0 141.5-58.5T680-520h80q0 105-68 184t-172 93v123h-80Zm40-360q17 0 28.5-11.5T520-520v-240q0-17-11.5-28.5T480-800q-17 0-28.5 11.5T440-760v240q0 17 11.5 28.5T480-480Z" />
                      </svg>
                    </button>
                    <button className="w-5 h-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-full m-auto text-slate-400"
                        viewBox="0 -960 960 960"
                        fill="currentColor"
                      >
                        <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h480q33 0 56.5 23.5T720-720v180l160-160v440L720-420v180q0 33-23.5 56.5T640-160H160Zm0-80h480v-480H160v480Zm0 0v-480 480Z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Aside;

const SendButton = ({ isSending }: { isSending: boolean }) => (
  <button type="submit" disabled={isSending} className="absolute right-3">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="fi_2907795"
      className={`h-5 w-5 text-slate-400 ${
        isSending ? "opacity-30" : "opacity-100"
      }`}
      data-name="Layer 1"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M14.76 22.65a2.3 2.3 0 0 1-2-1.23l-3.48-6.36a.8.8 0 0 0-.34-.34l-6.36-3.43A2.34 2.34 0 0 1 3 7l16.57-5.53a2.35 2.35 0 0 1 3 3L17 21.05a2.31 2.31 0 0 1-2 1.59ZM20 2.9 3.43 8.43a.84.84 0 0 0-.58.73.83.83 0 0 0 .44.81l6.36 3.43a2.3 2.3 0 0 1 .95.95l3.4 6.36a.83.83 0 0 0 .81.44.84.84 0 0 0 .73-.58L21.1 4A.84.84 0 0 0 20 2.9"></path>
      <path d="M9.67 15.08a.7.7 0 0 1-.53-.22.74.74 0 0 1 0-1.06L20.9 2A.75.75 0 0 1 22 3.1L10.2 14.86a.74.74 0 0 1-.53.22"></path>
    </svg>
  </button>
);

const GiftButtonIcon = () => (
  <div className="h-10 w-10 bg-[#292B2C] text-slate-400 rounded-full flex items-center justify-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      id="fi_66834"
      className="w-4 h-4"
      x="0"
      y="0"
      version="1.1"
      viewBox="0 0 293.373 293.373"
      fill="currentColor"
    >
      <path d="M130.265 162.904H34.991c-7.549 0-13.726 6.176-13.726 13.725v103.02c0 7.549 6.177 13.725 13.726 13.725h96.876c3.229 0 3.229-3.469 3.229-3.469V167.568c-.001 0-.001-4.664-4.831-4.664M258.383 162.904h-95.177c-5.797 0-4.929 6.037-4.929 6.037v121.076s-.047 3.354 3.44 3.354h96.664c7.549 0 13.726-6.176 13.726-13.725V176.629c.002-7.549-6.175-13.725-13.724-13.725M135.095 81.846s0-4.651-4.596-4.651H19.491c-7.549 0-13.726 6.177-13.726 13.725v42.845c0 7.549 6.177 13.725 13.726 13.725h111.384c4.22 0 4.22-3.66 4.22-3.66zM273.882 77.195H162.52c-4.241 0-4.241 4.041-4.241 4.041v62.679s0 3.575 5.156 3.575h110.447c7.549 0 13.726-6.176 13.726-13.725V90.92c0-7.548-6.177-13.725-13.726-13.725M88.41 67.04c-6.28 0-12.016-.498-17.046-1.481-12.776-2.496-21.557-7.354-26.845-14.85-4.738-6.718-6.188-15-4.311-24.617C43.496 9.266 54.796 0 72.024 0c3.646 0 7.65.421 11.902 1.252 10.816 2.113 24.65 8.315 37.007 16.59 20.965 14.041 22.002 22.77 20.958 28.115-1.535 7.854-8.876 13.466-22.443 17.158-9.166 2.494-20.479 3.925-31.038 3.925M72.025 21.999c-6.672 0-8.965 1.864-10.224 8.311-1.03 5.271.269 7.112.695 7.717 1.784 2.53 6.431 4.64 13.086 5.939 3.591.702 8.028 1.073 12.827 1.073 10.553 0 19.85-1.599 26.019-3.348.449-.127 1.146-.658.399-1.103-8.065-6.57-22.82-15.343-35.119-17.746-2.865-.558-5.451-.843-7.683-.843M205.281 67.04h-.002c-10.559 0-21.871-1.431-31.037-3.925-13.568-3.691-20.908-9.304-22.443-17.157-1.043-5.345-.008-14.074 20.959-28.115 12.355-8.275 26.189-14.477 37.007-16.59 4.252-.831 8.256-1.252 11.899-1.252 17.232 0 28.531 9.267 31.816 26.093 1.879 9.616.43 17.898-4.309 24.616-5.288 7.497-14.068 12.354-26.847 14.85-5.028.981-10.764 1.48-17.043 1.48m-26.242-26.588c-.715.415-.369 1.07.002 1.177 6.166 1.773 15.561 3.411 26.238 3.411 4.801 0 9.236-.371 12.828-1.073 6.654-1.3 11.303-3.409 13.086-5.939.428-.605 1.728-2.446.695-7.717C230.63 23.864 228.336 22 221.663 22c-2.231 0-4.815.284-7.682.844-12.3 2.402-26.877 11.037-34.942 17.608"></path>
    </svg>
  </div>
);
