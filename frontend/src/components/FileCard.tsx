import { FolderClosed } from "lucide-react"
import { Variant } from "@/types/ui"

interface FileCardProps {
    label: string,
    variant: Variant,
    expiration: string
}

export default function FileCard({ variant, label, expiration }: FileCardProps) {

    return (
        <div
            className={`
                flex flex-col justify-center items-center
                p-4 
                ${variant === 'active' ? 'bg-green-950' : 'bg-orange-950'} 
                border-2 rounded-4xl 
                ${variant === 'active' ? 'border-green-400' : 'border-orange-400'}
                w-40 h-56    
            `}
        >
            <header>
                <span className={variant === 'active' ? 'text-green-400' : 'text-orange-400'}><FolderClosed /></span>
                <h2 className={variant === 'active' ? 'text-green-100' : 'text-orange-100'}>{label}</h2>
            </header>
            <p className={variant === 'active' ? 'text-green-400' : 'text-orange-400'}>{expiration}</p>
        </div>
    )
}