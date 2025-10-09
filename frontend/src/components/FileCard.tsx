import { FolderClosed } from "lucide-react"
import { Variant } from "@/types/ui"

interface FileCardProps {
    label: string,
    variant: Variant,
    expiration: string
}

export default function FileCard({ variant, label, expiration }: FileCardProps) {
    let background
    let primary
    let secondary

    switch (variant) {
        case 'active':
            background = 'bg-green-950'
            primary = 'green-400'
            secondary = 'green-100'
            break
        case 'expired':
            background = 'bg-orange-950'
            primary = 'orange-400'
            secondary = 'orange-100'
    }

    return (
        <div
            className={`
                flex flex-col justify-center items-center
                p-4 
                ${background} 
                border-2 rounded-4xl border-${primary} 
                w-40 h-56
                text-${secondary}    
            `}
        >
            <header>
                <span className={`text-${primary}`}><FolderClosed /></span>
                <h2 className={`text-${secondary}`}>{label}</h2>
            </header>
            <p className={`text-${primary}`}>{expiration}</p>
        </div>
    )
}