import type Message from "../../models/messageModel.ts";
import {LastSeen} from "../Aside/LastSeen.tsx";

interface MessageBubbleProps {
    message: Message;
    isOwn: boolean;
}

const MessageBubble = ({message, isOwn}: MessageBubbleProps) => {
    return (
        <div className={`flex gap-2 max-w-[85%] sm:max-w-[75%] ${isOwn ? "ml-auto flex-row-reverse" : ""}`}>
            {!isOwn && (
                <div
                    className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full text-white text-sm flex-shrink-0 mt-1"
                    style={{backgroundColor: message.user.avatarColor}}
                >
                    {message.user.username?.[0] ?? ""}
                </div>
            )}

            <div className={`flex flex-col gap-1 min-w-0 ${isOwn ? "items-end" : "items-start"}`}>
                {!isOwn && (
                    <span className="text-xs font-medium text-amber-700 px-1">
                        {message.user.username}
                    </span>
                )}
                <div
                    className={`px-3 py-2 rounded-2xl text-sm sm:text-base break-words ${
                        isOwn
                            ? "bg-white shadow-md shadow-amber-100/80 border border-amber-50 rounded-br-md"
                            : "bg-amber-100/70 text-gray-800 rounded-bl-md"
                    }`}
                >
                    {message.content}
                </div>
                <span className="text-[11px] text-gray-400 px-1">
                    <LastSeen date={message.sentAt} />
                </span>
            </div>
        </div>
    );
};

export default MessageBubble;
