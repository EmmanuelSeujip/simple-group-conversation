import {useState, useCallback, type FormEvent, type KeyboardEvent} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {messageStore} from "../../store/MessageStore.ts";

const MessageComposer = () => {
    const [content, setContent] = useState("");
    const sendMessage = messageStore((state) => state.sendMessage);
    const sendTyping = messageStore((state) => state.sendTyping);
    const wsConnected = messageStore((state) => state.wsConnected);

    const send = useCallback(() => {
        const trimmed = content.trim();
        if (!trimmed || !wsConnected) return;

        sendMessage(trimmed);
        setContent("");
    }, [content, wsConnected, sendMessage]);

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

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
        // Envoie le signal typing à chaque frappe
        if (e.target.value.trim()) {
            sendTyping();
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex items-end gap-2 sm:gap-3 border-t border-amber-100 pt-3 px-1"
        >
            <textarea
                value={content}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder={wsConnected ? "Écrire un message…" : "Connexion en cours…"}
                disabled={!wsConnected}
                rows={1}
                className="flex-1 resize-none rounded-2xl border border-amber-200 bg-amber-50/50
                           px-4 py-2.5 text-sm sm:text-base outline-none
                           focus:border-amber-400 focus:ring-2 focus:ring-amber-200
                           max-h-28 overflow-y-auto
                           disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
                type="submit"
                disabled={!content.trim() || !wsConnected}
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
