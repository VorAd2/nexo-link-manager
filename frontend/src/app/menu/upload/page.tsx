import Dropzone from "@/components/Dropzone";

export default function UploadPage() {
    return (
        <div className="flex flex-1">
            <div className="flex justify-center items-center w-full h-full">
                <Dropzone />
            </div>
        </div>
    )
}