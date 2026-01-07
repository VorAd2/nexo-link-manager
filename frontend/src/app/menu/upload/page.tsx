'use client'

import { getLoggedUser } from "@/app/utils/loggedUser";
import Dropzone from "@/components/Dropzone";
import UploadModal from "@/components/UploadModal";
import { uploadFile } from "@/services/fileService";
import { useState } from "react";

export default function UploadPage() {
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const user = getLoggedUser();
    const userID = user.id;
    async function handleUpload() {
        if (!selectedFile) return;

        try {
            await uploadFile(selectedFile, userID);
            alert("Upload realizado com sucesso!");
            setIsUploadModalOpen(false);
            setSelectedFile(null);
        } catch (err) {
            console.error("Erro no upload", err);
            alert("Erro ao enviar arquivo");
        }
    }

    return (
        <div className="flex flex-1">
            <div className="flex justify-center items-center w-full h-full">
                <Dropzone
                    onDrop={(acceptedFiles) => {
                        setSelectedFile(acceptedFiles[0]);
                        setIsUploadModalOpen(true);
                    }}
                />

                {isUploadModalOpen && (
                    <UploadModal
                        file={selectedFile}
                        onConfirm={handleUpload}
                        onClose={() => {
                            setIsUploadModalOpen(false);
                            setSelectedFile(null);
                        }}
                    />
                )}
            </div>
        </div>
    );
}