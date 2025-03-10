import AuthMiddleware from "@/middlewares/AuthMiddleware";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Pody Season 1 Yuzu eligibility",
  description:
    "Learn and Earn Rewards in Real-time your number one Web3 Alternative to Google Meet and Twitter Space",
  openGraph: {
    title: "Pody Season 1 Yuzu eligibility",
    description:
      "Learn and Earn Rewards in Real-time your number one Web3 Alternative to Google Meet and Twitter Space",
    url: "https://pody.network",
    siteName: "Pody",
    images: [
      {
        url: "https://pody.network/social/banner-mainnet.jpg",
        width: 1200,
        height: 630,
        alt: "Pody Classroom - Learn & Earn Rewards in Real-time",
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pody Season 1 Yuzu eligibility",
    description:
      "Learn and Earn Rewards in Real-time your number one Web3 Alternative to Google Meet and Twitter Space",
    images: ["https://pody.network/social/banner-mainnet.jpg"],
    creator: "@PodyNetwork",
    site: "@PodyNetwork",
  },
};
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthMiddleware>
      {children}
    </AuthMiddleware>
  );
};

export default Layout;
