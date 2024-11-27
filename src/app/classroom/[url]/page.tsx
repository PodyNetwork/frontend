"use client"; // Enable client-side rendering
import MeetLayout from "@/components/call/meetLayout";
import { ActiveMenuProvider } from "@/components/call/utils/ActiveMenuContext";
import { ChatContextProvider } from "@/components/call/utils/ChatContext";
import { FullscreenProvider } from "@/components/call/utils/FullscreenContext";
import { GiftMenuProvider } from "@/components/call/utils/GiftMenuContext";
import { ParticipantBarProvider } from "@/components/call/utils/ParticipantBarContext";
import Head from "next/head";

const Call = () => {
  return (
    <>
      <Head>
        <meta
          property="og:image"
          content="https://pody.network/social/og-image-1200.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image"
          content="https://pody.network/social/og-image-200.png"
        />
        <meta property="og:image:width" content="200" />
        <meta property="og:image:height" content="200" />
        <meta
          property="og:image"
          content="https://pody.network/social/og-image-600.png"
        />
        <meta property="og:image:width" content="600" />
        <meta property="og:image:height" content="315" />
        <meta property="og:title" content="Pody" />
        <meta
          property="og:description"
          content="Learn on Open Campus and Earn Rewards your number one Web3 Alternative to Google Meet and Twitter Space"
        />
        <meta property="og:url" content="https://pody.network" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image"
          content="https://pody.network/social/og-image-1200.png"
        />
      </Head>
      <main
        className="relative float-left w-full h-full overflow-hidden"
        aria-label="Meeting"
      >
        <FullscreenProvider>
          <ActiveMenuProvider>
            <ParticipantBarProvider>
              <ChatContextProvider>
                <GiftMenuProvider>
                  <MeetLayout />
                </GiftMenuProvider>
              </ChatContextProvider>
            </ParticipantBarProvider>
          </ActiveMenuProvider>
        </FullscreenProvider>
      </main>
    </>
  );
};

export default Call;
