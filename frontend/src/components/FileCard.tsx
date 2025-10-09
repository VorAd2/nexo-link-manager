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
                flex flex-col justify-center items-center space-y-2
                p-4
                ${variant === 'active' ? 'bg-green-950' : 'bg-orange-950'} 
                border-2 rounded-4xl 
                ${variant === 'active' ? 'border-green-400' : 'border-orange-400'}
                w-28 h-44 sm:w-32 sm:h-46 xl:w-36 xl:h-48 3xl:w-40 3xl:h-52 4xl:w-44 4xl:h-54
            `}
        >
            <header className="
                flex flex-col justify-center items-center 
                space-y-2 
                text-wrap
            ">
                <span className={variant === 'active' ? 'text-green-400' : 'text-orange-400'}>
                    <FolderClosed className="size-14 sm:size-16 xl:size-18 3xl:size-20" strokeWidth={1.5} />
                </span>
                <h2 className={`
                        ${variant === 'active' ? 'text-green-100' : 'text-orange-100'}
                        text-lg sm:text-xl xl:text-2xl
                        text-center line-clamp-2 wrap-anywhere max-w-[9rem]
                    `}>{label}</h2>
            </header>
            <p className={`
                ${variant === 'active' ? 'text-green-200' : 'text-orange-200'}
                text-xs sm:text-sm xl:text-md 3xl:text-lg
            `}
            >
                {expiration}
            </p>
        </div>
    )
}