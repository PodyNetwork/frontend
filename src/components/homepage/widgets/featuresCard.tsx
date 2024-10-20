import rewardforparticipation from "/public/illustration/reward.png"
import decentralizedandprivate from "/public/illustration/privacy.png"
import ecosystem from '../data/ecosystem.json'
import Image from 'next/image'
import ReadyToGo from './readyToGo'

const FeaturesCard = () => {
  return (
    <>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 _features_card_x2'>
            <div className='p-7 relative rounded-xl shadow-xl overflow-hidden'>
                <ReadyToGo />
            </div>
            <div className='p-7 relative rounded-xl shadow-xl overflow-hidden'>
                <div className='_grad_card_main_2'></div>
                <div className='relative z-50 h-full flex flex-col'>
                    <h3 className='text-xl font-medium text-slate-200'>Advanced Host Management</h3>
                    <p className='text-sm mt-1.5 text-slate-400 flex items-center flex-wrap gap-x-2 leading-relaxed'>You can remove students from the call or grant them speaking privileges.</p>
                </div>
            </div>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 _features_card_x3'>
            <div className='p-6 relative rounded-xl shadow-xl overflow-hidden'>
                <div className='_grad_card_base'></div>
                <div className='relative z-50 flex flex-col h-full'>
                    <h3 className='text-xl font-medium text-slate-200'>Earn Rewards for Participation</h3>
                    <p className='text-sm mt-1.5 text-slate-400 flex items-center leading-relaxed'>
                    Not ready to start the class right away? You can schedule it for later.
                    </p>
                    <div className='flex-grow'></div>
                    <div className='flex flex-col gap-y-4 text-sm pt-8'>
                        <Image src={rewardforparticipation} className='object-cover h-52 rounded-xl' alt="Rewards for Participation" />
                    </div>
                </div>
            </div>
            <div className='p-6 relative rounded-xl shadow-xl overflow-hidden'>
                <div className='_grad_card_base'></div>
                <div className='relative z-50 flex flex-col h-full'>
                    <h3 className='text-xl font-medium text-slate-200'>Earning Power Boost</h3>
                    <p className='text-sm mt-1.5 text-slate-400 flex items-center leading-relaxed'>You can increase your earnings per second by minting more NFTs directly from the dashboard.</p>
                    <div className='flex flex-col gap-y-4 text-sm mt-auto pt-8'>
                       <div className='ic_cr_container mx-auto flex-wrap animate-pulse'>
                            {ecosystem.map((ecosystemdata, index) => (
                                <div className='w-[40px] h-[40px] rounded-full flex items-center justify-center ic_cr_icon' style={{'background' : ecosystemdata.color ? ecosystemdata.color : '#000000'  }} key={index}>
                                    <Image src={ecosystemdata.url} alt={ecosystemdata.name} className='w-6 h-6 object-contain' width={200} height={200} />
                                </div>
                            ))}
                       </div>
                    </div>
                </div>
            </div>
            <div className='p-6 relative rounded-xl shadow-xl overflow-hidden'>
                <div className='_grad_card_base'></div>
                <div className='relative z-50 h-full flex flex-col'>
                    <h3 className='text-xl font-medium text-slate-200'>View Earning Statistics</h3>
                    <p className='text-sm mt-1.5 text-slate-400 flex items-center'>Track your points in real-time, redeem them, and seamlessly transfer them on-chain.</p>
                    <div className='flex-grow'></div>
                    <div className='flex flex-col gap-y-4 text-sm pt-8'>
                        <Image src={decentralizedandprivate} className='object-cover h-52 rounded-xl' alt="Rewards for Participation" />
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default FeaturesCard