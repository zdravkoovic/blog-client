import { Link } from "react-router-dom"

type Props = {}

export default function CompanyLogo({}: Props) {
  return (
    <Link to='/'>
        <img
        alt="Your Company"
        src="/assets/logo2.jpg"
        className="h-13 w-13 rounded-full object-cover"
        />
    </Link>
  )
}