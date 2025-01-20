import Image from "next/image";

const faqs = [
  {
    question: "What happens if my transaction fails?",
    answer:
      "Double-check your wallet's token balance and ensure you're on the correct blockchain network. After resolving any issues, retry.",
  },
  {
    question: "Can I use other wallets besides MetaMask?",
    answer:
      "Yes! Any EVM-compatible wallet, like Trust Wallet, WalletConnect, or Coinbase Wallet, can be used.",
  },
  {
    question: "How much gas fee should I expect?",
    answer:
      "Gas fees vary depending on network congestion. Use our faucet tokens to cover initial costs.",
  },
  {
    question: "What if I run out of faucet tokens?",
    answer:
      "You can request more tokens from the faucet or acquire additional tokens from exchanges.",
  },
];
const HelpLogin = () => {
  return (
    <section
      className="w-full relative"
      aria-labelledby="Minting Pody Passport"
    >
      <div className="bg-white relative">
        <div className="z-30 relative flex flex-col">
          <div className="relative w-full px-5 md:px-16 flex-1">
            <div className="max-w-5xl mx-auto">
              <div className="max-w-2xl flex flex-col gap-y-6 my-12 text-base leading-loose">
                <h1>
                  Pody Network currently offers two methods to access the
                  platform, based on your preference and convenience: Log In
                  with Pody ID or Log In as an Anonymous User.
                </h1>
                <ul className="flex flex-col gap-y-6 __pd_help">
                  <Image
                    src="/help/loginpody.webp"
                    className="w-full py-5 h-full drop-shadow-md"
                    width={2880}
                    height={1644}
                    alt="Login to Pody"
                    priority
                    loading="eager"
                    quality={75}
                  />
                  <li>
                    <h2 className="text-xl">Log In with Pody Passport</h2>
                    <p>
                      This method allows you to log in using your Pody Passport,
                      which is unique to your wallet. It provides a seamless and
                      secure way to access Pody:
                    </p>
                    <ul className="__pd_unorder">
                      <li>
                        Click the <b>"Connect Wallet"</b> button. (If wallet is
                        connected skip to step 3)
                      </li>
                      <li>
                        {" "}
                        Select your preferred wallet (e.g., MetaMask,
                        WalletConnect, etc.) from the available options and
                        approve.
                      </li>
                      <li>
                        Once connected click on the "Login" Button, you will be
                        securely logged into the platform, using your Pody
                        Passport as your unique identifier.
                      </li>
                    </ul>
                  </li>
                  <li>
                    <h2 className="text-xl">Log In as an Anonymous User</h2>
                    <p>
                      This option allows you to access Pody without Minting a
                      Pody Passport or Connecting OC ID. Here's how it works:
                    </p>
                    <ul className="__pd_unorder">
                      <li>
                        Click on the <b>"Continue as Anonymous" </b>button.
                      </li>
                      <li>
                        A temporary and unique Pody ID will be generated for
                        you.
                      </li>
                      <li>
                        This Pody ID will be used to track your session during
                        your time on the platform.
                      </li>
                    </ul>
                    <p>
                      <b>Note:</b> Any data or actions associated with this
                      login will not be linked to your identity and may be lost
                      if you log out or clear your browser data.
                    </p>
                  </li>
                </ul>
              </div>
              <div className="max-w-4xl">
                <div
                  className="max-w-sm mx-auto md:max-w-none grid md:grid-cols-3 md:-mx-6 text-sm"
                  x-data="{ isAnnual: true }"
                >
                  {/* Column with labels */}
                  <section className="md:contents [&>div:first-child]:pt-10 [&>div:first-child]:rounded-t-2xl [&>div:last-child]:pb-10 [&>div:last-child]:rounded-b-2xl">
                    {/* Pricing toggle */}
                    <div className="relative bg-white dark:bg-slate-900 px-6 flex flex-col justify-end">
                      <div className="pb-5 md:border-b border-slate-200 dark:border-slate-700">
                        {/* Toggle switch */}
                        <div className="max-md:text-center">
                          <div className="inline-flex items-center whitespace-nowrap">
                            <div className="text-sm text-slate-500 mr-2 md:max-lg:sr-only">
                              Features
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="bg-white dark:bg-slate-900 px-6 flex flex-col justify-end max-md:hidden md:order-1"
                      aria-hidden="true"
                    >
                      <div className="py-2 text-slate-900 font-medium mt-4">
                        Platform
                      </div>
                    </div>
                    <div
                      className="bg-white dark:bg-slate-900 px-6 flex flex-col justify-end max-md:hidden md:order-2"
                      aria-hidden="true"
                    >
                      <div className="py-2 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                        Dashboard
                      </div>
                    </div>
                    <div
                      className="bg-white dark:bg-slate-900 px-6 flex flex-col justify-end max-md:hidden md:order-3"
                      aria-hidden="true"
                    >
                      <div className="py-2 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                        Join Classroom
                      </div>
                    </div>
                    {/* Receipts Forward */}
                    <div
                      className="bg-white dark:bg-slate-900 px-6 flex flex-col justify-end max-md:hidden md:order-4"
                      aria-hidden="true"
                    >
                      <div className="py-2 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                        Create / Schedule Classroom
                      </div>
                    </div>
                    <div
                      className="bg-white dark:bg-slate-900 px-6 flex flex-col justify-end max-md:hidden md:order-5"
                      aria-hidden="true"
                    >
                      <div className="py-2 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                        LeaderBoard
                      </div>
                    </div>
                    <div
                      className="bg-white dark:bg-slate-900 px-6 flex flex-col justify-end max-md:hidden md:order-6"
                      aria-hidden="true"
                    >
                      <div className="py-2 text-slate-900 font-medium mt-4">
                        Points & Gifting
                      </div>
                    </div>
                    <div
                      className="bg-white dark:bg-slate-900 px-6 flex flex-col justify-end max-md:hidden md:order-7"
                      aria-hidden="true"
                    >
                      <div className="py-2 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                        Earn Points
                      </div>
                    </div>
                    <div
                      className="bg-white dark:bg-slate-900 px-6 flex flex-col justify-end max-md:hidden md:order-8"
                      aria-hidden="true"
                    >
                      <div className="py-2 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                        Mint Points
                      </div>
                    </div>
                    <div
                      className="bg-white dark:bg-slate-900 px-6 flex flex-col justify-end max-md:hidden md:order-9"
                      aria-hidden="true"
                    >
                      <div className="py-2 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                        Boost Earning Power
                      </div>
                    </div>
                    <div
                      className="bg-white dark:bg-slate-900 px-6 flex flex-col justify-end max-md:hidden md:order-10"
                      aria-hidden="true"
                    >
                      <div className="py-2 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                        Gift Participant
                      </div>
                    </div>
                    <div
                      className="bg-white dark:bg-slate-900 px-6 flex flex-col justify-end max-md:hidden md:order-11"
                      aria-hidden="true"
                    >
                      <div className="py-2 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                        Receive Gift
                      </div>
                    </div>
                  </section>
                  {/* End: Column with labels */}
                  {/* Essential table */}
                  <section className="md:contents [&>div:first-child]:pt-10 [&>div:first-child]:rounded-t-2xl [&>div:last-child]:pb-10 [&>div:last-child]:rounded-b-2xl">
                    <div className="relative bg-white dark:bg-slate-900 px-6 flex flex-col justify-end">
                      <div className="grow mb-5">
                        <div className="font-semibold text-slate-900 dark:text-slate-200 mb-0.5">
                          Log In with Pody ID
                        </div>
                        <div className="text-sm text-slate-500 mt-2">
                          Secured and enables interaction with blockchain, Earn Rewards, and maintain persistent identities.
                        </div>
                      </div>
                      <div className="pb-2 border-b border-slate-200 dark:border-slate-700"></div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 px-6 flex flex-col justify-end md:order-1">
                      <div className="py-2 text-slate-900 dark:text-slate-200 font-medium mt-4 md:sr-only">
                        Platform
                      </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 px-6 flex flex-col justify-end md:order-2">
                      <div className="flex items-center h-full border-b border-slate-200 dark:border-slate-700 py-2 text-slate-600 dark:text-slate-400">
                        <svg
                          className="shrink-0 fill-emerald-500 mr-3"
                          xmlns="http://www.w3.org/2000/svg"
                          width={12}
                          height={9}
                        >
                          <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                        </svg>
                        <span>
                          Yes <span className="md:sr-only">Dashboard</span>
                        </span>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 px-6 flex flex-col justify-end md:order-3">
                      <div className="flex items-center h-full border-b border-slate-200 dark:border-slate-700 py-2 text-slate-600 dark:text-slate-400">
                        <svg
                          className="shrink-0 fill-emerald-500 mr-3"
                          xmlns="http://www.w3.org/2000/svg"
                          width={12}
                          height={9}
                        >
                          <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                        </svg>
                        <span>
                          Yes <span className="md:sr-only">Join Classroom</span>
                        </span>
                      </div>
                    </div>
                    {/* Receipts Forward */}
                    <div className="bg-white dark:bg-slate-900 px-6 flex flex-col justify-end md:order-4">
                      <div className="flex items-center h-full border-b border-slate-200 dark:border-slate-700 py-2 text-slate-600 dark:text-slate-400">
                        <svg
                          className="shrink-0 fill-emerald-500 mr-3"
                          xmlns="http://www.w3.org/2000/svg"
                          width={12}
                          height={9}
                        >
                          <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                        </svg>
                        <span>
                          Host Controls{" "}
                          <span className="md:sr-only">
                            Create / Schedule Classroom
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 px-6 flex flex-col justify-end md:order-5">
                      <div className="flex items-center h-full border-b border-slate-200 dark:border-slate-700 py-2 text-slate-600 dark:text-slate-400">
                        <svg
                          className="shrink-0 fill-emerald-500 mr-3"
                          xmlns="http://www.w3.org/2000/svg"
                          width={12}
                          height={9}
                        >
                          <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                        </svg>
                        <span>
                          Yes <span className="md:sr-only">LeaderBoard</span>
                        </span>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 px-6 flex flex-col justify-end md:order-6">
                      <div className="py-2 text-slate-900 dark:text-slate-200 font-medium mt-4 md:sr-only">
                        Points & Gifting
                      </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 px-6 flex flex-col justify-end md:order-7">
                      <div className="flex items-center h-full border-b border-slate-200 dark:border-slate-700 py-2 text-slate-600 dark:text-slate-400">
                        <svg
                          className="shrink-0 fill-emerald-500 mr-3"
                          xmlns="http://www.w3.org/2000/svg"
                          width={12}
                          height={9}
                        >
                          <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                        </svg>
                        <span>
                          Yes
                          <span className="md:sr-only">Earn Points</span>
                        </span>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 px-6 flex flex-col justify-end md:order-8">
                      <div className="flex items-center h-full border-b border-slate-200 dark:border-slate-700 py-2 text-slate-600 dark:text-slate-400">
                        <svg
                          className="shrink-0 fill-emerald-500 mr-3"
                          xmlns="http://www.w3.org/2000/svg"
                          width={12}
                          height={9}
                        >
                          <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                        </svg>
                        <span>
                          Yes
                          <span className="md:sr-only">Mint Points</span>
                        </span>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 px-6 flex flex-col justify-end md:order-9">
                      <div className="flex items-center h-full border-b border-slate-200 dark:border-slate-700 py-2 text-slate-600 dark:text-slate-400">
                        <svg
                          className="shrink-0 fill-emerald-500 mr-3"
                          xmlns="http://www.w3.org/2000/svg"
                          width={12}
                          height={9}
                        >
                          <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                        </svg>
                        <span>
                          Yes
                          <span className="md:sr-only">
                            Boost Earning Power
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 px-6 flex flex-col justify-end md:order-10">
                      <div className="flex items-center border-b border-slate-200 dark:border-slate-700 py-2 text-slate-600 max-md:sr-only">
                        <svg
                          className="shrink-0 fill-emerald-500 mr-3"
                          xmlns="http://www.w3.org/2000/svg"
                          width={12}
                          height={9}
                        >
                          <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                        </svg>
                        <span>
                          Yes
                          <span className="md:sr-only">Gift Participant</span>
                        </span>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 px-6 flex flex-col justify-end md:order-11">
                      <div className="flex items-center border-b border-slate-200 dark:border-slate-700 py-2 text-slate-600 max-md:sr-only">
                        <svg
                          className="shrink-0 fill-emerald-500 mr-3"
                          xmlns="http://www.w3.org/2000/svg"
                          width={12}
                          height={9}
                        >
                          <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                        </svg>
                        <span>
                          Yes
                          <span className="md:sr-only">Gift Participant</span>
                        </span>
                      </div>
                    </div>
                  </section>
                  {/* End: Essential table */}
                  {/* Enterprise table */}
                  <section className="md:contents [&>div:first-child]:pt-10 [&>div:first-child]:rounded-t-2xl [&>div:last-child]:pb-10 [&>div:last-child]:rounded-b-2xl">
                    <div className="relative bg-white dark:bg-slate-900 px-6 flex flex-col justify-end">
                      <div className="grow mb-5">
                        <div className="font-semibold text-slate-900 dark:text-slate-200 mb-0.5">
                          Log In Anonymously
                        </div>
                        <div className="text-sm text-slate-500 mt-2">
                          Log in without providing identifying information, ensuring privacy and ease of access.
                        </div>
                      </div>
                      <div className="pb-2 border-b border-slate-200 dark:border-slate-700"></div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 px-6 flex flex-col justify-end md:order-1">
                      <div className="py-2 text-slate-900 dark:text-slate-200 font-medium mt-4 md:sr-only">
                        Platform
                      </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 px-6 flex flex-col justify-end md:order-2">
                      <div className="flex items-center h-full border-b border-slate-200 dark:border-slate-700 py-2 text-slate-600 dark:text-slate-400">
                        <svg
                          className="shrink-0 fill-emerald-500 mr-3"
                          xmlns="http://www.w3.org/2000/svg"
                          width={12}
                          height={9}
                        >
                          <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                        </svg>
                        <span>
                          View Mode{" "}
                          <span className="md:sr-only">Dashboard</span>
                        </span>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 px-6 flex flex-col justify-end md:order-3">
                      <div className="flex items-center h-full border-b border-slate-200 dark:border-slate-700 py-2 text-slate-600 dark:text-slate-400">
                        <svg
                          className="shrink-0 fill-emerald-500 mr-3"
                          xmlns="http://www.w3.org/2000/svg"
                          width={12}
                          height={9}
                        >
                          <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                        </svg>
                        <span>
                          Yes <span className="md:sr-only">Join Classroom</span>
                        </span>
                      </div>
                    </div>
                    {/* Receipts Forward */}
                    <div className="bg-white dark:bg-slate-900 px-6 flex flex-col justify-end md:order-4">
                      <div className="flex items-center h-full border-b border-slate-200 dark:border-slate-700 py-2 text-slate-600 dark:text-slate-400">
                        <svg
                          className="shrink-0 fill-red-500 mr-3 text-red-500"
                          xmlns="http://www.w3.org/2000/svg"
                          width={12}
                          height={12} // Ensuring square dimensions for an "X"
                        >
                          <path
                            d="M1 1L11 11M11 1L1 11"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                        <span>
                          No{" "}
                          <span className="md:sr-only">
                            Create / Schedule Classroom
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 px-6 flex flex-col justify-end md:order-5">
                      <div className="flex items-center h-full border-b border-slate-200 dark:border-slate-700 py-2 text-slate-600 dark:text-slate-400">
                        <svg
                          className="shrink-0 fill-red-500 mr-3 text-red-500"
                          xmlns="http://www.w3.org/2000/svg"
                          width={12}
                          height={12} // Ensuring square dimensions for an "X"
                        >
                          <path
                            d="M1 1L11 11M11 1L1 11"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                        <span>
                          No{" "}
                          <span className="md:sr-only">
                            Supplier Management
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 px-6 flex flex-col justify-end md:order-6">
                      <div className="py-2 text-slate-900 dark:text-slate-200 font-medium mt-4 md:sr-only">
                        Features
                      </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 px-6 flex flex-col justify-end md:order-7">
                      <div className="flex items-center h-full border-b border-slate-200 dark:border-slate-700 py-2 text-slate-600 dark:text-slate-400">
                        <svg
                          className="shrink-0 fill-red-500 mr-3 text-red-500"
                          xmlns="http://www.w3.org/2000/svg"
                          width={12}
                          height={12} // Ensuring square dimensions for an "X"
                        >
                          <path
                            d="M1 1L11 11M11 1L1 11"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                        <span>
                          No
                          <span className="md:sr-only">
                            Earn Points
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 px-6 flex flex-col justify-end md:order-8">
                      <div className="flex items-center h-full border-b border-slate-200 dark:border-slate-700 py-2 text-slate-600 dark:text-slate-400">
                        <svg
                          className="shrink-0 fill-red-500 mr-3 text-red-500"
                          xmlns="http://www.w3.org/2000/svg"
                          width={12}
                          height={12} // Ensuring square dimensions for an "X"
                        >
                          <path
                            d="M1 1L11 11M11 1L1 11"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                        <span>
                          No
                          <span className="md:sr-only">Mint Points</span>
                        </span>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 px-6 flex flex-col justify-end md:order-9">
                      <div className="flex items-center h-full border-b border-slate-200 dark:border-slate-700 py-2 text-slate-600 dark:text-slate-400">
                        <svg
                          className="shrink-0 fill-red-500 mr-3 text-red-500"
                          xmlns="http://www.w3.org/2000/svg"
                          width={12}
                          height={12} // Ensuring square dimensions for an "X"
                        >
                          <path
                            d="M1 1L11 11M11 1L1 11"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                        <span>
                          No
                          <span className="md:sr-only">Boost Earning Power</span>
                        </span>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 px-6 flex flex-col justify-end md:order-10">
                      <div className="flex items-center h-full border-b border-slate-200 dark:border-slate-700 py-2 text-slate-600 dark:text-slate-400">
                        <svg
                          className="shrink-0 fill-red-500 mr-3 text-red-500"
                          xmlns="http://www.w3.org/2000/svg"
                          width={12}
                          height={12} // Ensuring square dimensions for an "X"
                        >
                          <path
                            d="M1 1L11 11M11 1L1 11"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                        <span>
                          No
                          <span className="md:sr-only">Gift Participant</span>
                        </span>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 px-6 flex flex-col justify-end md:order-11">
                      <div className="flex items-center h-full border-b border-slate-200 dark:border-slate-700 py-2 text-slate-600 dark:text-slate-400">
                        <svg
                          className="shrink-0 fill-red-500 mr-3 text-red-500"
                          xmlns="http://www.w3.org/2000/svg"
                          width={12}
                          height={12} // Ensuring square dimensions for an "X"
                        >
                          <path
                            d="M1 1L11 11M11 1L1 11"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                        <span>
                          No
                          <span className="md:sr-only">Receive Gift</span>
                        </span>
                      </div>
                    </div>
                  </section>
                  {/* End: Enterprise table */}
                </div>
              </div>
              <div className="max-w-2xl flex flex-col gap-y-6 my-12 text-base leading-loose">
                <div>
                  <h2 className="font-bold text-2xl py-6">FAQs</h2>
                  <div className="faq-list">
                    {faqs.map((faq, index) => (
                      <div key={index} className="faq-item py-6">
                        <h3 className="faq-question font-bold text-xl text-slate-800">
                          {faq.question}
                        </h3>
                        <p className="faq-answer mt-4 text-base text-slate-700">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                    <div className="faq-item py-6 leading-loose">
                      <h3 className="faq-question font-bold text-xl text-slate-800">
                        How do I add EDU Chain testnet to my wallet?
                      </h3>
                      <div className="video-container">
                        <iframe
                          src="https://www.youtube.com/embed/o7zIV9_F670?si=JNHQldN4RSmrVvA0"
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                        ></iframe>
                      </div>
                      <ul className="faq-answer mt-4 text-base text-slate-700 __pd_unorder">
                        <li>
                          Go to{" "}
                          <a
                            href="https://edu-chain-testnet.blockscout.com/"
                            className="underline"
                            target="_blank"
                          >
                            https://edu-chain-testnet.blockscout.com/
                          </a>
                        </li>
                        <li>
                          Scroll to the bottom and click Add EDU Chain Testnet
                        </li>
                        <li>Confirm the request in your wallet</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HelpLogin;
