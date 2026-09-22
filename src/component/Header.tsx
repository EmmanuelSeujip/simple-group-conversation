import logo from '../assets/logo.png'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faRightFromBracket, faSearch} from "@fortawesome/free-solid-svg-icons";
import {userStore} from "../store/UserStore.ts";
import {useState} from "react";


const Header = () => {
    const [viewDisconnection, setViewDisconnection] = useState(false)
    const user = userStore((state) => state.user);

    return (
        <header
            className="w-full flex-shrink-0 py-2 px-3 sm:px-5 sticky top-0 left-0
                       flex justify-between items-center gap-2 sm:gap-4
                       bg-white shadow-xs shadow-amber-200 z-10"
        >
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-shrink-0">
                <img src={logo} alt="logo" className="w-7 h-7 sm:w-8 sm:h-8 object-contain"/>
                <span className="text-sm sm:text-base font-medium">ByKombi</span>
            </div>

            <div className="relative border border-gray-300 flex-1 max-w-md lg:max-w-xl rounded-full hidden sm:block">
                <input
                    type="search"
                    placeholder="Rechercher un message ..."
                    className="w-full py-1.5 px-3 text-sm outline-none rounded-full"
                />
                <FontAwesomeIcon
                    icon={faSearch}
                    className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-500 text-sm"
                />
            </div>

            <button
                type="button"
                className="sm:hidden flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 text-gray-500"
                aria-label="Rechercher"
            >
                <FontAwesomeIcon icon={faSearch} className="text-sm"/>
            </button>

            <div className="relative flex-shrink-0">
                <div
                    onClick={() => setViewDisconnection((v) => !v)}
                    className="flex items-center justify-center gap-1.5 sm:gap-2 border border-amber-400 rounded-full
                               px-1.5 sm:px-2 py-0.5 cursor-pointer
                               hover:bg-amber-400 hover:text-white
                               transition duration-300 ease-in-out"
                >
                    <div
                        className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full text-white text-sm"
                        style={{backgroundColor: user?.avatarColor}}
                    >
                        {user?.username?.[0] ?? ""}
                    </div>
                    <span className="hidden md:inline text-sm max-w-28 truncate">{user?.username}</span>
                    <FontAwesomeIcon icon={faChevronDown} className="text-xs hidden sm:inline"/>
                </div>
                {viewDisconnection && (
                    <div
                        className="absolute right-0 top-full mt-1 bg-white border border-amber-100 rounded-xl
                                   shadow-lg px-3 py-2 flex items-center gap-2 text-sm whitespace-nowrap z-20
                                   cursor-pointer hover:bg-amber-50"
                    >
                        <FontAwesomeIcon icon={faRightFromBracket}/>
                        Se Déconnecter
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
