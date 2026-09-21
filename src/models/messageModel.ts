import type User from "./userModel.ts";
import type {MessageType} from "./messageType.ts";

export default interface Message {
    content: string,
    sentAt: Date,
    type: MessageType,
    user: User
}