import Contact from "../contacts/contact"
import logo from '/1.png'

export default function Home() {
    const descr = 'We enable virtual asset owners to cultivate financial discipline by locking assets for a specified duration to prevent premature withdrawals to allow asset valuation growth over time either for savings or for trading.'

  return (
    <div className="flex justify-center items-center flex-col md:h-screen overflow-y-auto
    dark:from-green-900 dark:to-blue-900
        bg-gradient-to-br from-green-500 to-yellow-600">
        <div className="flex flex-col md:flex-row-reverse justify-evenly items-center">
          <div className="md:w-1/2 grid place-items-center">
            <img 
              src={logo}
              alt="" 
              className=""
            />
          </div>
          <div className="md:w-1/2 text-center p-3 my-5 text-lg text-white space-y-4">
            <p className="text-5xl font-semibold">Avoid Impulsive Spending and Trading</p>
            <p className="text-4xl">Lock Your Cryptos, Invest In Your Future!</p>
            <p>{descr}</p>
          </div>
        </div>
        <hr className="w-1/3 my-5 md:my-1"/>
        <Contact />
    </div>
  )
}
