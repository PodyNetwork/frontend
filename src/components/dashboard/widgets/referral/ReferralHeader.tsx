
const ReferralHeader = () => {
  return (
    <section className="w-full md:max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start gap-6">
      <div className="bg-pody-primary rounded-2xl w-full __img_reward_grab">
        <div className="__img_veil_grab p-10">
          <h2 className="text-[2.3rem] leading-tight font-semibold text-white">
          Share Pody and Earn <br /> Rewards Points.
          </h2>
          <p className="text-sm mt-6 max-w-lg text-slate-100">
          Invite your friends to Pody and earn Points! You will receive Points for each successful referral, and your friend will also earn Points using your referral ID. The more you share, the more Points you earn. Start referring now and watch the Points roll in!
          </p>
        </div>
        <div></div>
      </div>
    </section>
  );
};

export default ReferralHeader;
