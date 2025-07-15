import { Link } from "react-router-dom"

type Props = {}

export default function LoginBtn({}: Props) {
  return (
    <div className="LoginBtn">
        <Link to="/login">
            <button type="button" className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-2 px-4 rounded shadow-md">Login</button>
        </Link>
        
    </div>
  )
}