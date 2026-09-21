import type Message from "../../models/messageModel.ts";
import {LastSeen} from "./LastSeen.tsx";

interface GroupMemberSimpleViewProps {
    message: Message;
}

const GroupMemberSimpleView = ({message}: GroupMemberSimpleViewProps) => {
    return (
        <div className="flex items-center flex-nowrap w-full gap-2">
            <div
                className="flex items-center justify-center w-10 h-10 rounded-full text-white flex-shrink-0"
                style={{backgroundColor: message.user.avatarColor}}
            >
                {message.user.username && message.user.username.length > 0 ? message.user.username[0] : ""}
            </div>

            <div className="flex flex-col min-w-0 flex-1">
                <span className="truncate font-medium">{message.user.username}</span>
                <span className="truncate text-sm text-gray-500">{message.content}</span>
            </div>

            <LastSeen date={message.sentAt} />
        </div>
    );
};

export default GroupMemberSimpleView;