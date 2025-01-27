import { Github, Linkedin, Twitter, Mail } from "lucide-react"

export default function Contact() {

  const percent = 16
  return (
    <div className="flex items-center justify-center text-white  m-4">
        <div className="max-w-4xl mx-auto px-4 py-2 text-center">
          <h2 className="text-3xl font-bold mb-2">
            <span>Launching Soon ... </span>
          </h2>
          <div className="flex items-center space-x-2 justify-center md:mb-4 mb-7">
            <progress className="progress progress-accent w-56" value={percent} max="100"></progress>
            <span className="text-sm font-mono">{percent}% complete</span>
          </div>
          <p className="text-lg text-white/90 mb-2">
            Have any inquiry, comment or suggestion, let's talk
          </p>
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">
            <a href="mailto:kalebmokua@gmail.com"
              className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-3
                rounded-full font-medium hover:bg-blue-50 transition-all transform hover:scale-105">
              <Mail className="mr-2" size={20} />
              Send me an email
            </a>
            <div className="flex justify-center space-x-4">
              <a href="https://github.com/calebomondi" target="_blank" className="bg-white/10 p-3 rounded-full hover:bg-white/20
                transition-all transform hover:scale-110">
                <Github size={24} />
              </a>
              <a href="https://www.linkedin.com/in/mokuakaleb/" target="_blank" className="bg-white/10 p-3 rounded-full hover:bg-white/20
                transition-all transform hover:scale-110">
                <Linkedin size={24} />
              </a>
              <a href="https://x.com/mokuakaleb" target="_blank" className="bg-white/10 p-3 rounded-full hover:bg-white/20
                transition-all transform hover:scale-110">
                <Twitter size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
  )
}
