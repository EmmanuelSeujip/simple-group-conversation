import {useState, type FormEvent, type KeyboardEvent} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {messageStore} from "../../store/MessageStore.ts";
import {userStore} from "../../store/UserStore.ts";

const MessageComposer = () => {
    const [content, setContent] = useState("");
    const addMessage = messageStore((state) => state.addMessage);
    const user = userStore((state) => state.user);

    const send = () => {
        const trimmed = content.trim();
        if (!trimmed) return;

        addMessage({
            content: trimmed,
            sentAt: new Date(),
            type: "CHAT",
            user: {...user},
        });
        setContent("");
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        send();
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            send();
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex items-end gap-2 sm:gap-3 border-t border-amber-100 pt-3 px-1"
        >
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Écrire un message..."
                rows={1}
                className="flex-1 resize-none rounded-2xl border border-amber-200 bg-amber-50/50
                           px-4 py-2.5 text-sm sm:text-base outline-none
                           focus:border-amber-400 focus:ring-2 focus:ring-amber-200
                           max-h-28 overflow-y-auto"
            />
            <button
                type="submit"
                disabled={!content.trim()}
                aria-label="Envoyer"
                className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full
                           bg-amber-500 text-white flex-shrink-0
                           hover:bg-amber-600 disabled:opacity-40 disabled:cursor-not-allowed
                           transition duration-200"
            >
                <FontAwesomeIcon icon={faPaperPlane} />
            </button>
        </form>
    );
};

export default MessageComposer;
