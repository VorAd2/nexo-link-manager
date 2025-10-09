import FileCard from "@/components/FileCard"

export default function SharedPage() {
    return (
        <div className="flex flex-1">
            <div className="py-16 px-20 grid grid-cols-1">
                <section>
                    <h1 className="text-green-100 text-4xl ml-5 mb-6">ATIVOS</h1>
                    <div className="">
                        <FileCard variant="active" label="Contrato" expiration="Expira em 24 min" />
                    </div>
                </section>
                <section>
                    <h1 className="text-orange-100 text-4xl ml-5 mb-6">INATIVOS</h1>
                    <div>
                        <FileCard variant="expired" label="Papéis divórcio" expiration="Expirado há 20 dias" />
                    </div>
                </section>
            </div>
        </div>
    )
}