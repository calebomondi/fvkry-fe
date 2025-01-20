import Contact from "../contacts/contact"
import logo from '/1.png'

export default function Home() {
    const descr = 'A blockchain-based platform that acts as a locked savings account, enabling virtual asset owners to cultivate financial discipline by locking assets for a specified duration to prevent premature withdrawals while maintaining flexibility for emergency access and periodic lock adjustments.'

  return (
    <div className="flex justify-center items-center flex-col h-screen
    dark:from-green-900 dark:to-blue-900
        bg-gradient-to-br from-green-500 to-yellow-600">
        <img 
            src={logo}
            alt="" 
            className="md:w-1/5 w-1/2"
        />
        <div className="md:w-1/2 md:line-clamp-5 text-center p-3 my-5 text-lg text-white">{descr}</div>
        <Contact />
    </div>
  )
}
