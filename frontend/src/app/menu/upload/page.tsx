'use client'

import Dropzone from "@/components/Dropzone";
import UploadModal from "@/components/UploadModal";
import { useState } from "react";

export default function UploadPage() {
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
    return (
        <div className="flex flex-1">
            <div className="flex justify-center items-center w-full h-full">
                <Dropzone onDrop={(acceptedFiles) => {setIsUploadModalOpen(true)}}/>
                {isUploadModalOpen && <UploadModal onClose={()=>{setIsUploadModalOpen(false)}}/>}
            </div>
        </div>
    )
}