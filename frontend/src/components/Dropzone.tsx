'use client'

import { useDropzone } from 'react-dropzone'
import { FolderClosed } from 'lucide-react'

export default function Dropzone() {
    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
        onDrop: (acceptedFiles) => {
            console.log(acceptedFiles)
        },
    })

    return (
        <div
            {...getRootProps()}
            className=
            {`  w-48 h-36 sm:w-60 sm:h-48 lg:w-72 lg:h-60 3xl:w-84 3xl:h-72 4xl:w-132 4xl:h-120
                border-2 border-dashed rounded-2xl 
                flex flex-col items-center justify-center p-12
                cursor-pointer transition bg-green-950
                text-green-200
                ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-green-400 hover:border-hover-green-400'}
            `}
        >
            <input {...getInputProps()} />
            <FolderClosed className='size-64 mb-4' strokeWidth={1} />
            {isDragActive
                ? <p className="sm:text-xl lg:text-2xl 3xl:text-4xl mb-12">Solte os arquivos aqui...</p>
                : <p className="sm:text-xl lg:text-2xl 3xl:text-4xl mb-12">Arraste e solte arquivos aqui</p>
            }
        </div>
    )
}
