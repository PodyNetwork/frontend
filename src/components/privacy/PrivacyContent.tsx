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
                  At Pody Network, we prioritize the privacy of our users. This
                  Privacy Policy outlines how we handle personal data when you
                  use our meeting app, Pody Network (available at pody.network).
                </h1>
                <ul className="flex flex-col gap-y-6 __pd_terms">
                  <li>
                    <h2>Data We Collect</h2>
                    <p>
                      We only collect minimal personal data to ensure the proper
                      functioning of our services. The data we collect includes:
                    </p>
                    <p>
                      Wallet Address: Used to identify and authenticate users.
                    </p>
                    <p>
                      Username: Displayed to other users during meetings and for
                      identification purposes.
                    </p>
                    <p>
                      IP Information: Collected to help us ensure security,
                      monitor usage patterns, and comply with applicable legal
                      requirements.
                    </p>
                    <p>
                      We do not collect or store any additional personal data
                      such as real names, email addresses, or physical
                      addresses.
                    </p>
                  </li>
                  <li>
                    <h2>Meeting Recordings</h2>
                    <p>
                      We respect your privacy during meetings. Pody Network does
                      not record or store any meeting content. Users can engage
                      in meetings with the assurance that their discussions
                      remain private and are not monitored by us.
                    </p>
                  </li>
                  <li>
                    <h2>Third-Party Services</h2>
                    <p>
                      Pody Network integrates certain third-party services to
                      provide a seamless meeting experience. Specifically, our
                      app is governed by the LiveKit Privacy Policy. Users of
                      Pody Network are also bound by LiveKit’s privacy terms,
                      which can be reviewed on their official website.
                    </p>
                  </li>
                  <li>
                    <h2>How We Use Your Data</h2>
                    <p>
                      The limited data we collect (wallet address, username, and
                      IP information) is used for the following purposes:
                    </p>
                    <ul className="__pd_roman_list_lower">
                      <li>To verify and authenticate users during meetings.</li>
                      <li>
                        To ensure the smooth operation of the app and its
                        features.
                      </li>
                      <li>
                        To comply with applicable security and legal
                        requirements.
                      </li>
                    </ul>
                  </li>
                  <li>
                    <h2>Data Sharing</h2>
                    <p>
                      We do not sell, rent, or trade your personal information
                      to third parties. The data we collect is solely used to
                      operate Pody Network and is shared with third-party
                      services only as required to maintain and improve the
                      app&apos;s functionality (e.g., LiveKit).
                    </p>
                  </li>
                  <li>
                    <h2>Data Security</h2>
                    <p>
                      We take the security of your personal data seriously. We
                      implement industry-standard security measures to protect
                      your information from unauthorized access, disclosure,
                      alteration, or destruction.
                    </p>
                  </li>
                  <li>
                    <h2>Changes to This Privacy Policy</h2>
                    <p>
                      This Privacy Policy may be updated from time to time. The
                      "Effective Date" at the top indicates when this policy was
                      last revised. We encourage you to review this policy
                      periodically for any updates.
                    </p>
                  </li>
                  <li>
                    <h2>Contact Us</h2>
                    <p>
                      If you have any questions or concerns regarding this
                      Privacy Policy or how your data is handled, please contact
                      us at: Email: <Link href="mailto:support@pody.network" className="text-blue-500 font-semibold">support@pody.network</Link>
                    </p>
                  </li>
                  <li>
                    <p>This policy ensures transparency while covering the key elements of privacy for Pody Network. Let me know if you&apos;d like any modifications!</p>
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

export default PrivacyContent;
