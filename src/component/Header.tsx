import logo from '../assets/logo.png'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faRightFromBracket, faSearch} from "@fortawesome/free-solid-svg-icons";
import {userStore} from "../store/UserStore.ts";
import {useState} from "react";


const Header= () => {
    const [viewDisconnection, setViewDisconnection] = useState(false)
    const user = userStore((state) => state.user);
    return <header className="w-screen py-5 px-5 sticky top-0 left-0 flex justify-between items-center bg-white shadow-xs shadow-amber-200">
        <div className="flex items-center justify-center gap-2">
            <img src={logo} alt="logo" className="w-10"/>
            ByKombi
        </div>
        <div className="relative border border-gray-400 lg:w-100 rounded-full">
            <input type="search" placeholder="Rechercher un message ..." className="w-full py-2 px-4"/>
            <FontAwesomeIcon icon={faSearch} className="absolute top-[50%] translate-y-[-50%] right-3 text-gray-500"/>
        </div>
        <div>
            <div className="flex items-center justify-center gap-2 border border-amber-400 rounded-full px-2 py-1
                            cursor-pointer hover:bg-amber-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2
                            transition duration-300 ease-in-out
            ">
                <div className="flex items-center justify-center w-10 h-10 rounded-full text-white" style={{backgroundColor:user.avatarColor}}>
                    {user.username && user.username.length>0 ? user.username[0] : ""}
                </div>
                {user.username}
                <FontAwesomeIcon icon={faChevronDown}/>
            </div>
            {viewDisconnection && <div>
                <FontAwesomeIcon icon={faRightFromBracket}/>
                Se Déconnecter
            </div>}
        </div>
    </header>;
}
export default Header