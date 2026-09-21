import {messageStore} from "../../store/MessageStore.ts";
import {useEffect} from "react";
import GroupMemberSimpleView from "./GroupMemberSimpleView.tsx";

const Aside = () => {
    const setLastMessage = messageStore((state)=>state.setLastMessage)
    const lastMessage = messageStore((state)=>state.lastMessage)
    useEffect(()=>{
        setLastMessage()
    },[setLastMessage])
    return <aside className="hidden lg:flex flex-col h-full bg-white w-5/16 rounded-4xl shadow-2xl shadow-amber-100 border border-amber-50
                             px-4 py-6 gap-8">
        <div className="flex items-center justify-between">
            <div className="border border-amber-200 px-3 py-1 rounded-full cursor-pointer
                            hover:text-white hover:bg-amber-500 hover:-translate-y-0.5
                            transition duration-300 ease-in-out
            ">
                Tous</div>
            <div className="border border-amber-200 px-3 py-1 rounded-full cursor-pointer
                            hover:text-white hover:bg-amber-500 hover:-translate-y-0.5
                            transition duration-300 ease-in-out
            ">
                En ligne</div>
            <div className="border border-amber-200 px-3 py-1 rounded-full cursor-pointer
                            hover:text-white hover:bg-amber-500 hover:-translate-y-0.5
                            transition duration-300 ease-in-out
            ">
                Deconnecter</div>
        </div>
        <div className="flex flex-col gap-3 w-full">
            {lastMessage.map((value,index) => (
                <GroupMemberSimpleView message={value} key={`message${index}`} />
            ))}
        </div>

    </aside>
}
export default Aside;