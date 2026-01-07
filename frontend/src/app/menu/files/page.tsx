'use client'

import { useEffect, useState } from "react"
import FileCard from "@/components/FileCard"
import FileModal from "@/components/FileModal"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { getAllFiles } from "@/services/fileService"


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

    const [activeFiles, setActiveFiles] = useState<BackendFile[]>([]);

    const [expiredFiles, setExpiredFiles] = useState([])

    const totalPagesActive = Math.ceil(activeFiles.length / itemsPerPage)
    const totalPagesExpired = Math.ceil(expiredFiles.length / itemsPerPage)
    const paginate = (data: any[], currentPage: number) => {
        const startIndex = (currentPage - 1) * itemsPerPage
        return data.slice(startIndex, startIndex + itemsPerPage)
    }

//     useEffect(() => {
//   async function loadFiles() {
//     try {
//       const files = await getAllFiles();
//        console.log("FILES RECEBIDOS:", files);
//       setActiveFiles(files);
//       setExpiredFiles([]);
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   loadFiles();

//   window.addEventListener("focus", loadFiles);
//   return () => window.removeEventListener("focus", loadFiles);
// }, []);

useEffect(() => {
  async function loadFiles() {
    try {
      const files: BackendFile[] = await getAllFiles();
      console.log("FILES RECEBIDOS:", files);
      console.log("QTD:", files.length);
      console.log("PRIMEIRO:", files[0]);
      setActiveFiles(files);
    } catch (err) {
      console.error(err);
    }
  }

  loadFiles();
}, []);

    const PaginationControls = ({ current, total, setPage }: { current: number, total: number, setPage: (p: number) => void }) => (
        <div className="flex justify-center items-center mt-8 space-x-4">
            <button
                onClick={() => setPage(Math.max(current - 1, 1))}
                disabled={current === 1}
                className={`p-2 rounded-full bg-gray-800 text-white disabled:opacity-30 
                transition ${current !== 1 && 'hover:bg-gray-700 hover:cursor-pointer'}`
                }
            >
                <ChevronLeft size={20} />
            </button>
            <div className="flex space-x-2">
                {Array.from({ length: total }).map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setPage(i + 1)}
                        className={`
                            w-8 h-8 rounded-md flex items-center justify-center transition 
                            hover:cursor-pointer 
                            ${current === i + 1 ? 'bg-green-200 text-green-950 font-bold' : 'bg-gray-800 text-white hover:bg-gray-700'
                            }`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
            <button
                onClick={() => setPage(Math.min(current + 1, total))}
                disabled={current === total}
                className={`p-2 rounded-full bg-gray-800 text-white disabled:opacity-30 
                transition ${current !== total && 'hover:bg-gray-700 hover:cursor-pointer'}`
                }
            >
                <ChevronRight size={20} />
            </button>
        </div>
    )
console.log("ACTIVE FILES:", activeFiles);

    return (
        <div className="flex flex-1">
            <div className="grid grid-cols-1 w-full py-8 px-12 xl:py-16 xl:px-20">
                <section>
                    <h1 className="text-green-100 text-2xl sm:text-3xl ml-2 mb-4 xl:ml-5 xl:mb-6 uppercase tracking-wider font-bold">
                        Compartilhamento Ativo
                    </h1>
                    <div className="flex flex-row space-x-6 ml-1 xl:ml-0 ">
                        {paginate(activeFiles, currentPageActive).map((file, index) => (
                            <FileCard
                                key={index}
                                variant="active"
                                label={file.download_link}
                                expiration="Expira em 24 min"
                                onClick={() => {
                                    setCurrentFileData({
                                        nome: file.download_link,
                                        expiração: '1 hora e 5 minutos',
                                        criador: file.username
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
                        {paginate(expiredFiles, currentPageExpired).map((file, index) => (
                            <FileCard
                                key={index}
                                variant="expired"
                                label={file.download_link}
                                expiration="Expira em 20 dias"
                                onClick={() => {
                                    setCurrentFileData({
                                        nome: file.download_link,
                                        expiração: 'Expirado',
                                        criador: file.username
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