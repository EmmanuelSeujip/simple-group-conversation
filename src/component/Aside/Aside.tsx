import {messageStore} from "../../store/MessageStore.ts";
import GroupMemberSimpleView from "./GroupMemberSimpleView.tsx";

const Aside = () => {
    const lastMessage = messageStore((state) => state.lastMessage);

    return (
        <aside
            className="hidden lg:flex flex-col h-full min-h-0 bg-white
                       w-64 xl:w-72 2xl:w-80 flex-shrink-0
                       rounded-4xl shadow-2xl shadow-amber-100 border border-amber-50
                       px-3 xl:px-4 py-4 gap-4"
        >
            <div className="flex items-center justify-between gap-1 flex-shrink-0 flex-wrap">
                <div
                    className="border border-amber-200 px-2.5 py-1 rounded-full cursor-pointer text-sm
                               hover:text-white hover:bg-amber-500 hover:-translate-y-0.5
                               transition duration-300 ease-in-out"
                >
                    Tous
                </div>
                <div
                    className="border border-amber-200 px-2.5 py-1 rounded-full cursor-pointer text-sm
                               hover:text-white hover:bg-amber-500 hover:-translate-y-0.5
                               transition duration-300 ease-in-out"
                >
                    En ligne
                </div>
                <div
                    className="border border-amber-200 px-2.5 py-1 rounded-full cursor-pointer text-sm
                               hover:text-white hover:bg-amber-500 hover:-translate-y-0.5
                               transition duration-300 ease-in-out"
                >
                    Déconnecté
                </div>
            </div>

            <div className="flex flex-col gap-3 w-full flex-1 min-h-0 overflow-y-auto pr-1">
                {lastMessage.map((value, index) => (
                    <GroupMemberSimpleView message={value} key={`message${index}`} />
                ))}
            </div>
        </aside>
    );
};

export default Aside;
