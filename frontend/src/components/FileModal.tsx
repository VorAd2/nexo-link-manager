import { X, FolderClosed, Hourglass } from "lucide-react"

type FileModalProps = {
    data: FileData | undefined,
    onClose: () => void
}

export default function FileModal({data, onClose}: FileModalProps) {
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
                        <X size={24} />
                    </button>
                    <div className="flex justify-center items-center space-x-6">
                        <span className='text-green-200'>
                            <FolderClosed className="size-14 sm:size-16 xl:size-18 3xl:size-20" strokeWidth={1.5} />
                        </span>
                        <h2 className="text-3xl text-green-200 text-center">
                            Nome arquivo
                        </h2>
                    </div>
                </header>

                <div className="flex flex-col space-y-4 justify-center items-center text-green-200 text-2xl">
                    <div className="flex justify-center items-center space-x-6">
                        <h3>expira em: {data?.expiração}</h3>
                        <button className="bg-green-400 p-2 rounded-2xl cursor-pointer hover:bg-hover-green-400">
                            <Hourglass size={18} className="text-green-950"/>
                        </button>
                    </div>
                    <h3></h3>
                    <h3>criador: {data?.criador}</h3>
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
                        Copiar link
                    </button>
                </footer>
            </div>
        </div>
    )
}