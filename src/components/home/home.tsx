import Contact from "../contacts/contact"
import logo from '/1.png'

export default function Home() {
  return (
    <div className="flex justify-center items-center flex-col h-screen
    dark:from-green-900 dark:to-blue-900
        bg-gradient-to-br from-green-400 via-yellow-600 to-yellow-600">
        <img 
            src={logo}
            alt="" 
            className="md:w-1/5 w-1/2"
        />
        <div className="md:w-1/2 md:line-clamp-3 text-center p-3 my-5 text-lg text-white">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic temporibus earum, ipsa ipsum asperiores a distinctio reprehenderit.</div>
        <Contact />
    </div>
  )
}
