type Props = {}

export default function LoginBtn({}: Props) {
  return (
    <div className="LoginBtn">
        <a href="/login">
            <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Login</button>
        </a>
        
    </div>
  )
}