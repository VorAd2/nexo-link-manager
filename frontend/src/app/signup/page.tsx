"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import NexoIcon2 from "../../assets/nexo-icon2.svg";

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const router = useRouter();

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-neutral-950 font-display">
            <span
                aria-hidden="true"
                className="hidden lg:flex absolute top-8 right-8 xl:top-16 xl:right-36"
            >
                <NexoIcon2 />
            </span>

            <div className="w-full max-w-md md:max-w-lg lg:max-w-xl p-6 sm:p-8">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl text-center font-extralight text-green-200 mb-6 lg:mb-8">
                    Crie sua conta
                </h1>

                <form className="space-y-6">
                    <div className="flex flex-col">
                        <label htmlFor="email" className="mb-1 ml-6 text-lg lg:text-xl text-green-200">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Digite seu email"
                            className="
                w-full rounded-full border-1 px-4 py-3 lg:px-5 lg:py-4
                bg-green-950 border-green-400 text-green-200
                placeholder-green-900
                focus:outline-none focus:border-2 focus:border-green-400
                transition-colors duration-200
                text-base lg:text-xl
              "
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="password" className="mb-1 ml-6 text-lg lg:text-xl text-green-200">
                            Senha
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Digite sua senha"
                            className="
                w-full rounded-full border-1 px-4 py-3 lg:px-5 lg:py-4
                bg-green-950 border-green-400 text-green-200
                placeholder-green-900
                focus:outline-none focus:border-2 focus:border-green-400
                transition-colors duration-200
                text-base lg:text-xl
              "
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="confirmPass" className="mb-1 ml-6 text-lg lg:text-xl text-green-200">
                            Confirme sua senha
                        </label>
                        <input
                            id="confirmPass"
                            type="password"
                            value={confirmPass}
                            onChange={(e) => setConfirmPass(e.target.value)}
                            placeholder="Digite sua senha"
                            className="
                w-full rounded-full border-1 px-4 py-3 lg:px-5 lg:py-4
                bg-green-950 border-green-400 text-green-200
                placeholder-green-900
                focus:outline-none focus:border-2 focus:border-green-400
                transition-colors duration-200
                text-base lg:text-xl
              "
                        />
                    </div>

                    <button
                        type="submit"
                        className="
              w-full py-3 px-4 lg:py-4 mt-4 rounded-full bg-green-400 text-green-950
              border-[2px] border-green-200
              hover:bg-hover-green-400 focus:outline-none focus:ring-2 hover:cursor-pointer
              focus:ring-offset-2 focus:ring-offset-neutral-950 focus:ring-hover-green-400
              transition-colors duration-200
              text-base lg:text-xl
            "
                    >
                        Criar
                    </button>

                    <button
                        type="button"
                        onClick={() => router.push("/signin")}
                        className="
              w-full bg-transparent
              text-base lg:text-xl text-green-400
              hover:underline hover:cursor-pointer
              focus:text-hover-green-400
            "
                    >
                        Já tem uma conta? Faça login
                    </button>
                </form>
            </div>
        </div>
    );
}
