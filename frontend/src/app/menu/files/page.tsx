'use client'
//window so existe no lado do client

import { useEffect, useState } from "react"
import FileCard from "@/components/FileCard"

export default function FilesPage() {
    const [length, setLength] = useState(2)

    const activeList = Array.from({ length: length }).map((_, i) =>
        <FileCard key={i} variant="active" label="Contrato" expiration="Expira em 24 min" />
    )
    const expiredList = Array.from({ length: length }).map((_, i) =>
        <FileCard key={i} variant="expired" label="Multa trânsito" expiration="Expira em 20 dias" />
    )

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth < 500) setLength(2)
            else if (window.innerWidth < 1000) setLength(3)
            else if (window.innerWidth < 1200) setLength(4)
            else if (window.innerWidth < 1920) setLength(5)
            else return setLength(6)
        }
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
        <div className="flex flex-1">
            <div className="
                grid grid-cols-1 w-full 
                py-8 px-12 xl:py-16 xl:px-20
            ">
                <section>
                    <h1 className="
                    text-green-100 text-2xl sm:text-3xl
                    ml-2 mb-4 xl:ml-5 xl:mb-6
                    ">COMPARTILHAMENTO ATIVO</h1>
                    <div className="
                        flex flex-row space-x-10 
                        ml-1 xl:ml-0
                    "
                    >
                        {activeList}
                    </div>
                    <div className="
                        flex justify-center items-center 
                        mt-8 PAGINATION
                    "
                    >
                        <span className="text-white text-xl">1..2..3</span>
                    </div>
                </section>
                <section className="mt-8">
                    <h1 className="
                    text-orange-100 text-2xl sm:text-3xl
                    ml-2 mb-4 xl:ml-5 xl:mb-6
                    ">COMPARTILHAMENTO INATIVO</h1>
                    <div className="
                    flex flex-row space-x-10 
                    ml-1 xl:ml-0
                    ">
                        {expiredList}
                    </div>
                    <div className="flex justify-center items-center mt-8 PAGINATION">
                        <span className="text-white text-xl">1..2..3</span>
                    </div>
                </section>
            </div>
        </div>
    )
}