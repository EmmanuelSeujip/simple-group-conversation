import AuthTemplate from "../../component/template/auth/AuthTemplate";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash, faLock, faUser} from "@fortawesome/free-solid-svg-icons";
import React, {useState} from "react";

const Sign = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const [showPassword, setShowPassword] = useState(false)
    return (
        <AuthTemplate>
            <div className="flex flex-col items-center m-6 gap-2 w-full z-10">
                <h2 className="text-2xl font-bold"> Connectez - vous </h2>
                <p className="text-gray-500">Bon retour dans la conversation</p>
                <form onSubmit={(e) => e.preventDefault()}
                      className="flex flex-col w-full gap-5 mt-10">
                    <div className="flex flex-col gap-3">
                        <div className="flex gap-2 items-center
                            outline-0 focus:shadow-amber-200 focus:border-amber-200
                            transition duration-150 ease-in-out
                        ">
                            <FontAwesomeIcon icon={faUser} className="text-amber-500" />
                            Nom d'utilisateur
                        </div>
                        <input
                            type="text"
                            placeholder="Entrez votre nom d'utilisateur"
                            className="w-full p-3 border border-gray-300 rounded outline-0
                                        outline-0 focus:shadow-amber-200 focus:border-amber-200
                                        transition duration-150 ease-in-out"
                            name="username"
                            onChange={handleChange}
                            value={formData.username}
                        />
                    </div>
                    <div className="flex flex-col gap-3 relative">
                        <div className="flex gap-2 items-center">
                            <FontAwesomeIcon icon={faLock} className="text-amber-500" />
                            Mot de passe
                        </div>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Entrez votre mot de passe"
                                className="w-full p-3 border border-gray-300 rounded
                                            outline-0 focus:shadow-amber-200 focus:border-amber-200
                                            transition duration-150 ease-in-out"
                                name="password"
                                onChange={handleChange}
                                value={formData.password}
                            />
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye}
                                             className="absolute top-[50%] translate-y-[-50%] right-1.5 cursor-pointer"
                                             onClick={() => setShowPassword(!showPassword)}/>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 relative">
                        <div className="flex gap-2 items-center">
                            <FontAwesomeIcon icon={faLock} className="text-amber-500" />
                            Confirmer le mot de passe
                        </div>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Confirmez le mot de passe"
                                className="w-full p-3 border border-gray-300 rounded
                                            outline-0 focus:shadow-amber-200 focus:border-amber-200
                                            transition duration-150 ease-in-out"
                                name="confirmPassword"
                                onChange={handleChange}
                                value={formData.confirmPassword}
                            />
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye}
                                             className="absolute top-[50%] translate-y-[-50%] right-1.5 cursor-pointer"
                                             onClick={() => setShowPassword(!showPassword)}/>
                        </div>
                    </div>
                </form>
            </div>

        </AuthTemplate>
    );
};

export default Sign;