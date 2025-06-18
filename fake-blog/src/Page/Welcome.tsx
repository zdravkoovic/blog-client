import LoginBtn from "./common/LoginBtn"

type Props = {}

export default function Welcome({}: Props) {
  return (
    <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('./assets/background.jpg')" }}>
          <div className="absolute inset-0 bg-black/20 z-10"></div>
          <div className="h-screen relative z-20 flex-1/3 content-center mx-auto max-w-7xl px-6 lg:px-8">
            <div className="dark:text-gray-50 mx-auto max-w-2xl lg:mx-0" >
              <h2 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">From the blog</h2>
              <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl">Learn how to grow your business with our expert advice.</p>
            </div>
            <div className="relative z-20 mt-20 px-6 py-3 font-medium rounded-lg transition-colors duration-200">
              <LoginBtn />
            </div>
          </div>
        </div>
  )
}