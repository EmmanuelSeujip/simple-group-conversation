import AuthTemplate from "../../component/template/auth/AuthTemplate";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash, faLock, faUser} from "@fortawesome/free-solid-svg-icons";
import React, {useState} from "react";
import {userStore} from "../../store/UserStore.ts";
import {useNavigate} from "react-router-dom";

const Sign = () => {
    const login=userStore((state)=>state.log)
    const navigate = useNavigate();
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

    const  submit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const reponse = await login({username: formData.username,password:formData.password,route:"signup"});
        if (reponse) {
            navigate("/");
        }
    }
    const [showPassword, setShowPassword] = useState(false)
    return (
        <AuthTemplate>
            <div className="flex flex-col items-center m-6 gap-2 w-full z-10">
                <h2 className="text-2xl font-bold"> Inscrivez - vous </h2>
                <form onSubmit={(e) => submit(e)}
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
                    <button type="submit" className="bg-amber-500 text-white py-3  rounded-full font-bold
                                                    hover:bg-amber-600 hover:-translate-y-1 cursor-pointer
                                                    transition duration-300 ease-in-out">
                        S'inscrire
                    </button>
                </form>
                <div className="mt-4"> Vous avez déjà un compte alors
                    <a href="/login" className="text-amber-500 underline ml-2">Connectez- vous</a>
                </div>
            </div>

        </AuthTemplate>
    );
};

export default Sign;