import HelpHeader from '@/components/Help/HelpHeader'
import HelpLogin from '@/components/Help/HelpLogin'
import Footer from '@/components/homepage/Global/Footer'

const PodyLogin = () => {
  return (
    <>
      <main
        className="relative float-left w-full h-full overflow-hidden"
        aria-label="Terms"
      >
        <HelpHeader title='Pody Login' publishedData='Learn and Earn Rewards in real-time' />
        <HelpLogin />
        <Footer />
      </main>
    </>
  )
}

export default PodyLogin