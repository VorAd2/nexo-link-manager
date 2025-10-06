import { Logo } from "@/components/Logo"
import { CircleUserRound } from 'lucide-react';

export default function MenuLayout({ children }: { children: React.ReactNode }) {

    return (
        <div className="flex min-h-screen bg-neutral-900 font-display">
            <aside
                className="w-1/5 bg-neutral-950 flex flex-col"
            >
                <div className="mt-7 ml-12">
                    <span><Logo size="lg" /></span>
                </div>
                <div className="h-full flex flex-col justify-center items-start space-y-12 px-12 text-4xl">
                    <span className="text-green-400">Upload</span>
                    <span className="text-green-300">Compartilhado</span>
                </div>
                <div
                    className="flex justify-start items-center space-x-4 px-12 mb-8 mt-20 text-green-400 text-3xl">
                    <span><CircleUserRound size={36} /></span>
                    <span>ALAN_TURING</span>
                </div>
            </aside>
            <main className="w-screen">
                {/* Renderiza o conteudo do page.tsx correspondente à URL atual */}
                {children}
            </main>
        </div>
    )
}