import Image from "next/image";

const faqs = [
  {
    question: "What happens if my transaction fails?",
    answer:
      "Double-check your wallet’s token balance and ensure you’re on the correct blockchain network. After resolving any issues, retry.",
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
const MintingPassport = () => {
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
                  Pody Network is a decentralized platform designed to create
                  Unlimited virtual Classrooms where students can learn and earn
                  rewards by minting a one-time passport on-chain. Here’s a
                  step-by-step guide to mint your Pody Passport and get started
                  with ease.
                </h1>
                <ul className="flex flex-col gap-y-6 __pd_help">
                  <Image
                    src="/help/connectwallet.png"
                    className="w-full py-5 h-full"
                    width={2880}
                    height={1644}
                    alt="Connect EVM Wallet to Pody"
                  />
                  <li>
                    <h2 className="text-xl">Connect EVM Wallet</h2>
                    <p>
                      Before creating an account on Pody, connect to an
                      EVM-supported wallet. Here’s how:
                    </p>
                    <ul>
                      <li>
                        <h4 className="font-bold">
                          Install an EVM-Compatible Wallet:
                        </h4>
                        <p>
                          Ensure your browser or mobile device has installed a
                          wallet like MetaMask or any EVM-compatible wallet.
                        </p>
                      </li>
                      <li>
                        <h4>Connect Your Wallet:</h4>
                        <ul className="__pd_unorder">
                          <li>On the Sign-Up page, click Connect Wallet.</li>
                          <li>
                            A pop-up will prompt you to choose your wallet.
                            Select the one you installed.
                          </li>
                          <li>
                            Approve the connection request within your wallet.
                          </li>
                        </ul>
                      </li>
                    </ul>
                    <p>
                      <b>Note:</b> Ensure you’re on the{" "}
                      <a
                        href="https://edu-chain-testnet.blockscout.com/"
                        className="underline"
                        target="_blank"
                      >
                        EDU Chain testnet.
                      </a>
                    </p>
                  </li>
                  <Image
                    src="/help/educhain.png"
                    className="w-full py-5 h-full"
                    width={2880}
                    height={1644}
                    alt="Claim EduChain Faucet to mint Pody Passport"
                  />
                  <li>
                    <h2 className="text-xl">Claim Your Faucet Tokens</h2>
                    <p>
                      If you don't have the Edu Testnet token, claim the faucet
                      from the listed platform; if you already have the faucet,
                      you can skip this step. These tokens are essential for
                      paying gas fees, minting your passport, and making other
                      initial transactions on our platform.
                    </p>
                    <ul className="__pd_roman_list_number">
                      <li>
                        <p>Get $EDU Testnet Token <a href="https://drpc.org/faucet/open-campus-codex" target="_blank" className="underline">here</a></p>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <h2 className="text-xl">Mint Your Passport</h2>
                    <p>
                      Minting your Pody Passport is the final step in creating
                      your account. This passport gives you access to the
                      platform
                    </p>
                    <ul className="__pd_roman_list_number">
                      <li>
                        Enter your desired username. If you have a referral ID,
                        please include it as well.
                      </li>
                      <li>
                        <p>Click on the Mint Passport button.</p>
                      </li>
                      <li>
                        <p>
                          Review the minting details (e.g., gas fee amount).
                          Ensure you have enough tokens to cover the gas fee.
                        </p>
                      </li>
                      <li>
                        <p>
                          Your wallet will ask for approval to process the
                          transaction.
                        </p>
                      </li>
                      <li>
                        <p>
                          Wait a few seconds for confirmation. Once minted, you
                          will be redirected to the login page, where you can
                          securely log in.
                        </p>
                      </li>
                    </ul>
                  </li>
                </ul>

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
                        <li>Go to <a href="https://edu-chain-testnet.blockscout.com/" className="underline" target="_blank">https://edu-chain-testnet.blockscout.com/</a></li>
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

export default MintingPassport;
