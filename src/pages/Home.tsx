import Header from "../component/Header.tsx";
import Aside from "../component/Aside/Aside.tsx";

const Home= () => {
    return <main className="w-screen h-screen bg-amber-50 flex flex-col gap-5">
        <Header/>
        <section className="flex flex-1 p-8">
            <Aside/>
        </section>
    </main>
}
export default Home;