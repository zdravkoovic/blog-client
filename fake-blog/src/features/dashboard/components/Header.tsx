import CompanyLogo from "@/components/ui/CompanyLogo";
import { UserContext } from "@/Context/userContext";
import SearchBar from "@/features/blog/components/SearchBar";
import Welcome from "@/pages/Welcome";
import { useContext, useState } from "react";
import MenuAvatar from "./MenuAvatar";

type Props = {}

export default function Header({}: Props) {
  const user = useContext(UserContext);

  const isLoggedIn = () => user !== null;


  const [headerOffset] = useState(0);

  // useEffect(() => {
  //     const handleScroll = () => {
  //     const currentScrollY = window.scrollY;
  //     const diff = currentScrollY - lastScrollY.current;

  //     let newOffset = headerOffset - diff * DAMPING;
  //     newOffset = Math.min(0, Math.max(newOffset, -HEADER_HEIGHT));

  //     setHeaderOffset(newOffset);
  //     lastScrollY.current = currentScrollY;
  //   };

  //   window.addEventListener('scroll', handleScroll, { passive: true });  

  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, [headerOffset])

  return (
    <>
      {!isLoggedIn() ? (
        <Welcome />
      ) : (
        <div
          id="dashboard-header"
          className="sticky top-0 left-0 w-full z-20 bg-blue-900 text-white shadow-md transition-transform"
          style={{ 
            transform: `translateY(${headerOffset}px)`,
          }}
        >
          <div className="flex items-center justify-between px-4 py-2">
            
            <CompanyLogo />

            <SearchBar />

            <div className="flex items-center">

              <MenuAvatar />

            </div>
          </div>
        </div>
      )}
    </>
  )
}
