'use client'

import { useDropzone } from 'react-dropzone'
import { FolderClosed } from 'lucide-react'

export default function Dropzone() {
    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
        onDrop: (acceptedFiles) => {
            console.log(acceptedFiles)
        },
    })

    const instructionClassName = `
        text-md sm:text-xl lg:text-2xl 3xl:text-4xl 
        mb-2
    `

    return (
        <div
            {...getRootProps()}
            className=
            {`  w-48 h-36 sm:w-60 sm:h-48 md:w-66 md:h-54 lg:w-78 lg:h-66 xl:w-90 xl:h-78 3xl:w-110 3xl:h-96 4xl:w-136 4xl:h-124
                border-2 border-dashed rounded-2xl 
                flex flex-col items-center justify-center
                p-2 md:p-5 lg:p-7 xl:p-9 3xl:p-10
                cursor-pointer transition hover:bg-hover-green-950 active:border-blue-500
                text-green-200
                ${isDragActive ? 'bg-hover-green-950 border-blue-500 ' : 'bg-green-950 border-green-400 hover:border-hover-green-400'}
            `}
        >
            <input {...getInputProps()} />
            <FolderClosed
                className='
                w-22 h-22 sm:w-26 sm:h-26 md:w-30 md:h-30 lg:w-34 lg:h-34 
                xl:w-38 xl:h-38 3xl:w-48 3xl:h-48 4xl:w-60 4xl:h-60 mb-2 
            '
                strokeWidth={0.5}
            />
            {isDragActive
                ? <p className={instructionClassName}>Solte os arquivos aqui...</p>
                : <p className={instructionClassName}>Arraste e solte arquivos aqui</p>
            }
        </div>
    )
}
