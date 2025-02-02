import Link from "next/link";
import React from "react";

const PrivacyContent = () => {
  return (
    <section className="w-full relative" aria-labelledby="Terms content">
      <div className="bg-white relative">
        <div className="z-30 relative flex flex-col">
          <div className="relative w-full px-5 md:px-16 flex-1">
            <div className="max-w-5xl mx-auto">
              <div className="max-w-2xl flex flex-col gap-y-6 my-12 text-sm leading-relaxed">
                <h1>
                  At Pody Network, we are committed to protecting your privacy
                  and ensuring that your personal data is handled securely. This
                  Privacy Policy explains how we collect, use, share, and
                  protect your information when you use our decentralized
                  virtual classrooms, Meet-to-Earn sessions, NFT Passport
                  system, and all associated features (“Services”). By using our
                  Services, you consent to the data practices described in this
                  policy.
                </h1>
                <ol className="flex flex-col gap-y-6 __pd_terms">
                  <li>
                    <h2>Information We Collect</h2>
                    <ul className="__sub_list">
                      <li>
                        <h4>
                          <b>Identity Information</b>
                        </h4>
                        <ul className="__pd_unorder">
                          <li>NFT Passport details</li>
                          <li>Wallet addresses</li>
                          <li>Social media identities (if linked)</li>
                          <li>Usernames and email addresses</li>
                        </ul>
                      </li>
                      <li>
                        <h4>
                          <b>Usage Data</b>
                        </h4>
                        <ul className="__pd_unorder">
                          <li>Participation metrics in virtual classrooms</li>
                          <li>Real-time point accrual data</li>
                        </ul>
                      </li>
                      <li>
                        <h4>
                          <b>Device and Connection Information</b>
                        </h4>
                        <ul className="__pd_unorder">
                          <li>IP addresses</li>
                          <li>Browser types</li>
                          <li>Operating systems</li>
                          <li>
                            Other device-specific data collected automatically
                            through cookies or similar technologies
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <h2>How We Use Your Data</h2>
                    <p>Your data is used for the following purposes:</p>
                    <ul className="__sub_list">
                      <li>
                        <h4>
                          <b>Platform Operation</b>
                        </h4>
                        <ul className="__pd_unorder">
                          <li>Verifying and managing digital identities</li>
                          <li>Processing transactions and rewards</li>
                          <li>Administering platform features</li>
                        </ul>
                      </li>
                      <li>
                        <h4>
                          <b>Enhancing Experience</b>
                        </h4>
                        <ul className="__pd_unorder">
                          <li>
                            Personalizing interactions and improving user
                            experience based on behavior patterns
                          </li>
                        </ul>
                      </li>
                      <li>
                        <h4>
                          <b>Security</b>
                        </h4>
                        <ul className="__pd_unorder">
                          <li>
                            Monitoring, detecting, and preventing fraudulent or
                            abusive behavior
                          </li>
                        </ul>
                      </li>
                      <li>
                        <h4>
                          <b>Legal Compliance</b>
                        </h4>
                        <ul className="__pd_unorder">
                          <li>
                            Meeting regulatory obligations and responding to
                            legal requests
                          </li>
                        </ul>
                      </li>
                      <li>
                        <h4>
                          <b>Marketing Purposes</b>
                        </h4>
                        <ul className="__pd_unorder">
                          <li>
                            With your consent, we may use your data to inform
                            you about updates, new features, and promotional
                            offers
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <h2>Tracking Technologies</h2>
                    <p>
                      To improve functionality, we use tracking tools, including
                      but not limited to:
                    </p>
                    <ul className="__pd_unorder">
                      <li>
                        <b>Google Analytics</b> – For analyzing user behavior
                        and traffic patterns
                      </li>
                      <li>
                        <b>Microsoft Clarity </b> – For tracking user
                        interactions and engagement through session recordings
                        and heatmaps
                      </li>
                    </ul>
                    <p>
                      These tools collect data in an aggregated form for
                      optimization purposes. Refer to their respective privacy
                      policies for more details.
                    </p>
                  </li>
                  <li>
                    <h2>Data Sharing and Third-Party Disclosures</h2>
                    <p>
                      We do not sell or rent your personal information. However,
                      we may share data in the following instances:
                    </p>
                  </li>
                  <li>
                    <h2>Service Providers</h2>
                    <ul className="__pd_unorder">
                      <li>
                        With trusted third parties that assist in platform
                        operations under strict data protection agreements
                      </li>
                    </ul>
                  </li>
                  <li>
                    <h2>Legal Authorities</h2>
                    <ul className="__pd_unorder">
                      <li>
                        When required to comply with legal obligations,
                        subpoenas, or court orders
                      </li>
                    </ul>
                  </li>
                  <li>
                    <h2>Business Transfers</h2>
                    <ul className="__pd_unorder">
                      <li>
                        In case of mergers, acquisitions, or asset sales,
                        provided that your data is handled under the same
                        privacy standards
                      </li>
                    </ul>
                  </li>
                  <li>
                    <h2>Account Security and User Responsibility</h2>
                    <ul className="__pd_unorder">
                      <li>
                        You are responsible for maintaining the confidentiality
                        of your account credentials
                      </li>
                      <li>
                        If you suspect unauthorized use, notify us immediately
                      </li>
                      <li>
                        We implement security measures to protect your data, but
                        you acknowledge that no online platform is completely
                        secure
                      </li>
                    </ul>
                  </li>
                  <li>
                    <h2>Data Retention and User Rights</h2>
                    <ul className="__pd_unorder">
                      <li>
                        We retain your data only for as long as necessary to
                        provide Services and comply with legal obligations
                      </li>
                      <li>
                        You have the right to request access, correction, or
                        deletion of your personal data
                      </li>
                    </ul>
                  </li>
                  <li>
                    <h2>Changes to this Privacy Policy</h2>
                    <p>
                      We reserve the right to update this Privacy Policy at any
                      time. Changes will be communicated via the platform or
                      email (if applicable). Continued use of our Services after
                      updates means you accept the revised policy.
                    </p>
                  </li>
                  <li>
                    <h2>Contact Information</h2>
                    <p>For privacy-related inquiries, please contact us at:</p>
                    <p>
                      <b>Email:</b>{" "}
                      <Link
                        href="mailto: hello@pody.network
"
                        className="text-blue-500 font-medium"
                      >
                        hello@pody.network
                      </Link>
                    </p>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyContent;
