import { userAuth } from "../Context/userAuth"
import BlogsPage from "./Blogs"
import LoginBtn from "./common/LoginBtn"
import Header from "./Header"

type Props = {}

export default function HomePage({}: Props) {
  const { isLoggedIn } = userAuth();
  return (
    <>
        {!isLoggedIn() && <LoginBtn />}
        <BlogsPage />
    </>
  )
}