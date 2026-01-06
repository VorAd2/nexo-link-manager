"use client";

import { useState } from "react";
import { X } from "lucide-react";

type UploadModalProps = {
    file: File | null;
    onConfirm: () => void;
    onClose: () => void;
};

export default function UploadModal({file, onConfirm, onClose   }: UploadModalProps) {
    const [fileName, setFileName] = useState("");
    const [expiration, setExpiration] = useState(1);

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 px-4">
            <div className="
                relative
                w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%]
                bg-neutral-900 p-6 rounded-xl shadow-xl text-white
                flex flex-col items-center space-y-8
            ">

                <header>
                    <button
                        onClick={onClose}
                        className="absolute top-4 left-4 text-green-400"
                    >
                        <X size={28} />
                    </button>
                    <h2 className="text-3xl sm:text-4xl text-green-200 text-center">
                        ARQUIVO.RAR
                    </h2>
                </header>

                <div className="flex flex-col w-full px-4 sm:w-[70%]">
                    <label className="mb-1 ml-2 text-lg text-green-200">Nome</label>
                    <input
                        value={fileName}
                        onChange={(e) => setFileName(e.target.value)}
                        placeholder="Nomeie o arquivo"
                        className="
                            w-full rounded-full px-4 py-3
                            bg-green-950 border border-green-400 text-green-200
                            placeholder-green-900
                            focus:outline-none focus:border-2 focus:border-green-400
                            transition-colors duration-200
                            text-base sm:text-lg
                        "
                    />
                </div>
                <div className="flex flex-col w-full px-4 sm:w-[70%]">
                    <label className="mb-1 ml-2 text-lg text-green-200">Expiração</label>
                    <input
                        type="number"
                        min="0"
                        step="1"
                        value={expiration}
                        onKeyDown={(e) => {
                            if (["e", "E", "+", "-", ".", ","].includes(e.key)) {
                                e.preventDefault();
                            }
                        }}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (value === "") {
                                setExpiration(1);
                                return;
                            }
                            const num = Number(value);
                            if (Number.isInteger(num) && num >= 0) {
                                setExpiration(num);
                            }
                        }}
                        placeholder="Tempo (horas) para expiração"
                        className="
                            w-full rounded-full px-4 py-3
                            bg-green-950 border border-green-400 text-green-200
                            placeholder-green-900
                            focus:outline-none focus:border-2 focus:border-green-400
                            transition-colors duration-200
                            text-base sm:text-lg
                        "
                    />
                </div>

                <footer className="flex justify-center items-center w-full">
                    <button
                        onClick={onClose}
                        className="
                        w-full sm:w-[70%] py-3 px-4 mt-4 rounded-full
                        bg-green-400 text-green-950 border-2 border-green-200
                        hover:bg-hover-green-400 transition-colors duration-200
                        text-base sm:text-lg
                    "
                    >
                        Confirmar
                    </button>
                </footer>
            </div>
        </div>
    );
}
