import Header from "../component/Header.tsx";
import Aside from "../component/Aside/Aside.tsx";
import ChatArea from "../component/Chat/ChatArea.tsx";

const Home = () => {
    return (
        <main className="w-screen h-dvh max-h-dvh overflow-hidden bg-amber-50 flex flex-col">
            <Header />
            <section className="flex flex-1 min-h-0 gap-3 sm:gap-4 px-3 sm:px-6 lg:px-8 py-2 sm:py-3">
                <Aside />
                <ChatArea />
            </section>
        </main>
    );
};

export default Home;
