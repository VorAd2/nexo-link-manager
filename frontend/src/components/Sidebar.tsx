import { Logo } from "@/components/Logo"
import { CircleUserRound } from 'lucide-react';
import Link from "next/link";

export default function Sidebar() {
    return (
        <aside
            className="
            bg-neutral-950 w-full md:w-1/5 flex md:flex-col 
            items-center md:items-start justify-between md:justify-normal 
            p-4 md:p-0
            border-b-2 border-neutral-800 md:border-b-0 md:border-r-2
            "
        >
            <header className="flex items-center justify-center md:justify-start mt-2 md:mt-7 md:ml-12">
                <Link href={"/menu"}><Logo className="text-md lg:text-6xl 4xl:text-7xl" /></Link>
            </header>


            <nav className="flex md:hidden space-x-8 text-xl sm:text-2xl mt-2"
                aria-label="Navegação da Sidebar Mobile"
            >
                <Link href="/menu/upload" className="text-green-400">Upload</Link>
                <Link href="/menu/shared" className="text-green-300">Compartilhado</Link>
            </nav>

            <nav className="
                    hidden md:flex h-full flex-col justify-center items-start 
                    space-y-12 px-6 lg:px-12 
                    text-xl lg:text-2xl xl:text-3xl 
                    3xl:text-4xl 4xl:text-5xl
                "
                aria-label="Navegação da Sidebar Desktop">
                <Link href="/menu/upload" className="text-green-300">Upload</Link>
                <Link href="/menu/shared" className="text-green-300">Compartilhado</Link>
            </nav>

            <footer>
                <Link
                    href={"/menu/profile"}
                    className="flex justify-start items-center space-x-2 px-2 md:px-6 lg:px-12 mt-2 md:mt-20 mb-2 md:mb-8"
                >
                    <CircleUserRound
                        className="text-green-400 md:size-5 lg:size-6 3xl:size-7 4xl:size-8"
                        aria-hidden="true"
                    />
                    <span className="
                        hidden sm:inline 
                        text-green-400 text-lg lg:text-xl xl:text-xl 
                        3xl:text-2xl 4xl:text-3xl
                    "
                        aria-label="Usuário logado"
                    >
                        ADA_LOVELACE
                    </span>
                </Link>
            </footer>
        </aside>
    )
}