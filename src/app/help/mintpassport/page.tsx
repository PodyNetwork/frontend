import HelpHeader from '@/components/Help/HelpHeader'
import MintingPassport from '@/components/Help/MintingPassport'
import Footer from '@/components/homepage/Global/Footer'

const MintPassport = () => {
  return (
    <>
      <main
        className="relative float-left w-full h-full overflow-hidden"
        aria-label="Terms"
      >
        <HelpHeader title='Minting Pody Passport' publishedDate='Dec 19, 2024' />
        <MintingPassport />
        <Footer />
      </main>
    </>
  )
}

export default MintPassport