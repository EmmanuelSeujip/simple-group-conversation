import React from 'react';
import styles from './AuthTemplate.module.css'; // Ajustez le chemin de vos modules CSS
import logo from '../../../assets/logo.png';
interface AuthTemplateProps {
    children: React.ReactNode; // Recommandé à la place de ReactElement
}

const AuthTemplate = ({ children }: AuthTemplateProps) => {
    return (
        <section className={`${styles.background} h-screen w-full flex flex-col items-center justify-center p-7`}>
            <div className={styles.backgroundOverlay}/>
            <div className="h-fit w-full md:w-150 bg-white shadow-white shadow-md flex flex-col items-center p-5 rounded-xl">
                <div className="flex items-center justify-center gap-5">
                    <img src={logo} alt="logo" className="h-15 w-15 "/>
                    <h1 className="font-bold text-2xl text-amber-600">ByKombi</h1>
                </div>

                {children}
            </div>
        </section>
    );
};

export default AuthTemplate;