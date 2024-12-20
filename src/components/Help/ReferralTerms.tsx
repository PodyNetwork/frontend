const ReferralTerms = () => {
  return (
    <section
      className="w-full relative"
      aria-labelledby="Minting Pody Passport"
    >
      <div className="bg-white relative">
        <div className="z-30 relative flex flex-col">
          <div className="relative w-full px-5 md:px-16 flex-1">
            <div className="max-w-5xl mx-auto">
              <div className="max-w-2xl flex flex-col gap-y-6 my-12 text-sm leading-loose">
                <ul className="flex flex-col gap-y-6 __pd_help">
                  <li>
                    <h2 className="text-lg">Eligibility</h2>
                    <p>
                      To participate in the Program, you must be a resident of a
                      jurisdiction where such participation is not prohibited by
                      law.
                    </p>
                  </li>
                  <li>
                    <h2 className="text-lg">Program Details</h2>
                    <p>
                      Pody is offering a referral reward of $10,000 USD, which
                      will be distributed among the top three referrers in the
                      equivalent of PodyToken at the time of the Token launch.
                    </p>
                    <ul>
                      <li>
                        <h4>
                          The referral rewards will be divided as follows:
                        </h4>
                        <ul className="__pd_unorder">
                          <li>First Place: $5,000</li>
                          <li>Second Place: $3,000</li>
                          <li>Third Place: $2,000</li>
                        </ul>
                      </li>
                    </ul>
                    <p>
                      <b>Note:</b> The amount in PodyToken is calculated based
                      on the equivalent value at the token launch.
                    </p>
                  </li>
                  <li>
                    <h2 className="text-lg">How to Participate</h2>
                    <p>
                      To be eligible for referral rewards, you must refer new
                      participants who register on the Pody by sharing your
                      referral code.
                    </p>
                    <p>
                      You need to ensure that referred users complete the
                      sign-up process for the referral to be valid.
                    </p>
                  </li>
                  <li>
                    <h2 className="text-lg">Sybil Attack Prevention</h2>
                    <p>
                      Participants who attempt to engage in Sybil attacks,
                      including but not limited to creating multiple fake
                      accounts to receive rewards, will not be counted as valid
                      referrersal.
                    </p>
                    <p>
                      Pody uses various methods to identify and prevent
                      fraudulent activities. Accounts identified as part of a
                      Sybil attack may lose any earned rewards and be banned
                      from future participation in the Program.
                    </p>
                  </li>
                  <li>
                    <h2 className="text-lg">Reward Distribution</h2>
                    <p>
                      Rewards will be given to the top three referrers once
                      PodyToken is officially launched and its value is
                      determined.
                    </p>
                    <p>
                      The rewards will be distributed in the equivalent value of
                      PyToken at the time of the token launch to the designated
                      wallet addresses of the referrers.
                    </p>
                  </li>
                  <li>
                    <h2 className="text-lg">
                      Program Modification and Termination
                    </h2>
                    <p>
                      Pody reserves the right to modify, suspend, or terminate
                      the Program at any time without prior notice.
                    </p>
                    <p>
                      If the Program is terminated, all participants agree to
                      forfeit any claims to rewards earned up to that point.
                    </p>
                  </li>
                  <li>
                    <h2 className="text-lg">General Terms</h2>
                    <p>
                      Pody is not responsible for any technical issues, errors,
                      or failures that may affect the Program or the
                      distribution of rewards.
                    </p>
                    <p>
                      Participation in the Program is subject to Pody's general
                      Terms of Service and Privacy Policy.
                    </p>
                    <p>
                      By participating in the Program, you acknowledge that
                      Pody's decisions regarding the Program are final and
                      binding.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReferralTerms;
