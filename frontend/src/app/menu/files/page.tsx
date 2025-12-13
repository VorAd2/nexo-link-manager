'use client'

import { useEffect, useState } from "react"
import FileCard from "@/components/FileCard"
import FileModal from "@/components/FileModal"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface FileData {
    nome: string;
    expiração: string;
    criador: string;
}

export default function FilesPage() {
    const [itemsPerPage, setItemsPerPage] = useState(2)
    const [currentPageActive, setCurrentPageActive] = useState(1)
    const [currentPageExpired, setCurrentPageExpired] = useState(1)
    const [currentFileData, setCurrentFileData] = useState<FileData | undefined>()
    const [isFileModalOpen, setFileModalOpen] = useState(false)

    const allActiveFiles = Array.from({ length: 15 }, (_, i) => ({ id: i, label: `Contrato ${i + 1}`, variant: 'active' as const }));
    const allExpiredFiles = Array.from({ length: 12 }, (_, i) => ({ id: i, label: `Multa ${i + 1}`, variant: 'expired' as const }));
    const totalPagesActive = Math.ceil(allActiveFiles.length / itemsPerPage)
    const totalPagesExpired = Math.ceil(allExpiredFiles.length / itemsPerPage)
    const paginate = (data: any[], currentPage: number) => {
        const startIndex = (currentPage - 1) * itemsPerPage
        return data.slice(startIndex, startIndex + itemsPerPage)
    }

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth < 500) setItemsPerPage(2)
            else if (window.innerWidth < 1000) setItemsPerPage(3)
            else if (window.innerWidth < 1200) setItemsPerPage(4)
            else if (window.innerWidth < 1920) setItemsPerPage(5)
            else setItemsPerPage(6)
        }
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    const PaginationControls = ({ current, total, setPage }: { current: number, total: number, setPage: (p: number) => void }) => (
        <div className="flex justify-center items-center mt-8 space-x-4">
            <button
                onClick={() => setPage(Math.max(current - 1, 1))}
                disabled={current === 1}
                className="p-2 rounded-full bg-gray-800 text-white disabled:opacity-30 hover:bg-gray-700 transition"
            >
                <ChevronLeft size={20} />
            </button>
            <div className="flex space-x-2">
                {Array.from({ length: total }).map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setPage(i + 1)}
                        className={`w-8 h-8 rounded-md flex items-center justify-center transition ${current === i + 1 ? 'bg-green-200 text-black font-bold' : 'bg-gray-800 text-white hover:bg-gray-700'
                            }`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
            <button
                onClick={() => setPage(Math.min(current + 1, total))}
                disabled={current === total}
                className="p-2 rounded-full bg-gray-800 text-white disabled:opacity-30 hover:bg-gray-700 transition"
            >
                <ChevronRight size={20} />
            </button>
        </div>
    )

    return (
        <div className="flex flex-1">
            <div className="grid grid-cols-1 w-full py-8 px-12 xl:py-16 xl:px-20">
                <section>
                    <h1 className="text-green-100 text-2xl sm:text-3xl ml-2 mb-4 xl:ml-5 xl:mb-6 uppercase tracking-wider font-bold">
                        Compartilhamento Ativo
                    </h1>
                    <div className="flex flex-row space-x-6 ml-1 xl:ml-0 overflow-hidden">
                        {paginate(allActiveFiles, currentPageActive).map((file) => (
                            <FileCard
                                key={file.id}
                                variant="active"
                                label={file.label}
                                expiration="Expira em 24 min"
                                onClick={() => {
                                    setCurrentFileData({
                                        nome: file.label,
                                        expiração: '1 hora e 5 minutos',
                                        criador: 'LOUIS VITÃO'
                                    });
                                    setFileModalOpen(true)
                                }}
                            />
                        ))}
                    </div>
                    {totalPagesActive > 1 && (
                        <PaginationControls
                            current={currentPageActive}
                            total={totalPagesActive}
                            setPage={setCurrentPageActive}
                        />
                    )}
                </section>
                <section className="mt-16">
                    <h1 className="text-orange-100 text-2xl sm:text-3xl ml-2 mb-4 xl:ml-5 xl:mb-6 uppercase tracking-wider font-bold">
                        Compartilhamento Inativo
                    </h1>
                    <div className="flex flex-row space-x-6 ml-1 xl:ml-0">
                        {paginate(allExpiredFiles, currentPageExpired).map((file) => (
                            <FileCard
                                key={file.id}
                                variant="expired"
                                label={file.label}
                                expiration="Expira em 20 dias"
                                onClick={() => {
                                    setCurrentFileData({
                                        nome: file.label,
                                        expiração: 'Expirado',
                                        criador: 'Louis Vitão'
                                    });
                                    setFileModalOpen(true)
                                }}
                            />
                        ))}
                    </div>
                    {totalPagesExpired > 1 && (
                        <PaginationControls
                            current={currentPageExpired}
                            total={totalPagesExpired}
                            setPage={setCurrentPageExpired}
                        />
                    )}
                </section>
                {isFileModalOpen && <FileModal data={currentFileData} onClose={() => setFileModalOpen(false)} />}
            </div>
        </div>
    )
}