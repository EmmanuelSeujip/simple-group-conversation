import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faHouse, faMessage } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo.png';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden px-6
            bg-gradient-to-br from-amber-500 via-amber-400 to-amber-200">
            <div
                className="pointer-events-none absolute inset-0 opacity-40"
                style={{
                    backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Ccircle cx='30' cy='30' r='20'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                }}
            />

            <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/20 blur-3xl animate-pulse" />
            <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-amber-600/30 blur-3xl" />

            <div className="relative z-10 flex w-full max-w-lg flex-col items-center text-center">
                <Link
                    to="/login"
                    className="mb-10 flex items-center gap-3 transition duration-200 hover:scale-[1.02]"
                >
                    <img src={logo} alt="ByKombi" className="h-12 w-12 drop-shadow-md" />
                    <span className="text-2xl font-bold text-white drop-shadow-sm">ByKombi</span>
                </Link>

                <div className="relative mb-6">
                    <p className="select-none text-[8rem] leading-none font-extrabold tracking-tighter text-white/25 sm:text-[10rem]">
                        404
                    </p>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg shadow-amber-700/20
                            animate-[bounce_2.5s_ease-in-out_infinite]">
                            <FontAwesomeIcon icon={faMessage} className="text-3xl text-amber-500" />
                        </div>
                    </div>
                </div>

                <h1 className="mb-3 text-3xl font-bold text-white drop-shadow-sm sm:text-4xl">
                    Page introuvable
                </h1>
                <p className="mb-10 max-w-sm text-base text-amber-50/90 leading-relaxed">
                    Oups — cette conversation n&apos;existe pas. Le lien est peut‑être cassé,
                    ou la page a changé d&apos;adresse.
                </p>

                <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/40
                            bg-white/10 px-6 py-3.5 font-semibold text-white backdrop-blur-sm
                            transition duration-200 hover:bg-white/20 hover:border-white/60 cursor-pointer"
                    >
                        <FontAwesomeIcon icon={faArrowLeft} />
                        Retour
                    </button>
                    <Link
                        to="/login"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5
                            font-semibold text-amber-600 shadow-lg shadow-amber-800/20
                            transition duration-200 hover:bg-amber-50 hover:scale-[1.02]"
                    >
                        <FontAwesomeIcon icon={faHouse} />
                        Accueil
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default NotFound;
