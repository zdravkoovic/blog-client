import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { LogOutIcon, SettingsIcon } from "lucide-react";
import AddIcon from "@mui/icons-material/Add";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { UserContext } from "@/Context/userContext";
import axiosSSR from "@/components/auth/axiosSSR";
import SettingsModal from "./Settings";
import CreateBlogModal from "./CreateBlogModal";

type Props = {};

export default function MenuAvatar({}: Props) {
    const user = useContext(UserContext);
    const [showCreateBlog, setShowCreateBlog] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const { handleSubmit } = useForm();

    const openModal = () => setShowCreateBlog(true);
    const closeModal = () => setShowCreateBlog(false);
    const openSettings = () => setShowSettings(true);

    const handleLogout = async () => {
        const message = await axiosSSR.post("/logout", {}, { withCredentials: true });
        if (message.status === 200) {
            window.location.href = "/";
        }
    };

    return (
        <>
            {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
            <CreateBlogModal show={showCreateBlog} onHide={closeModal} />
            <Menu as="div" className="relative ml-3">
                <div>
                    <MenuButton className="relative flex rounded-b-full text-sm focus:outline-none">
                        <div className="flex items-center space-x-4 text-gray-600">
                            <Avatar className="w-12 h-12 rounded-full overflow-hidden">
                                <AvatarImage src={user?.avatar_url} className="object-cover w-full h-full" />
                            </Avatar>
                        </div>
                    </MenuButton>
                </div>
                <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-gray-50 dark:bg-blue-950 shadow-lg ring-1 ring-black/5 focus:outline-none">
                    <MenuItem>
                        <button
                            onClick={openModal}
                            className="text-gray-700 dark:text-gray-200 group flex w-full items-center px-4 py-2 text-sm hover:bg-gray-100 hover:dark:bg-blue-900 hover:text-gray-900 hover:dark:text-white"
                        >
                            <AddIcon className="mr-3 h-5 w-5" />
                            Create blog
                        </button>
                    </MenuItem>
                    <MenuItem>
                        <button
                            onClick={openSettings}
                            className="text-gray-700 dark:text-gray-200 group flex w-full items-center px-4 py-2 text-sm hover:bg-gray-100 hover:dark:bg-blue-900 hover:text-gray-900 hover:dark:text-white"
                        >
                            <SettingsIcon className="mr-3 h-5 w-5" />
                            Settings
                        </button>
                    </MenuItem>
                    <MenuItem>
                        <form onSubmit={handleSubmit(handleLogout)} method="POST" className="w-full">
                            <button
                                type="submit"
                                className="text-gray-700 dark:text-gray-200 group flex w-full items-center px-4 py-2 text-sm hover:bg-gray-100 hover:dark:bg-blue-900 hover:text-gray-900 hover:dark:text-white"
                            >
                                <LogOutIcon className="mr-3 h-5 w-5" />
                                Sign out
                            </button>
                        </form>
                    </MenuItem>
                </MenuItems>
            </Menu>
        </>
    );
}
