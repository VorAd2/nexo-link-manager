import Sidebar from "@/components/Sidebar"

export default function MenuLayout({ children }: { children: React.ReactNode }) {

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-neutral-900 font-display">
            <Sidebar />
            <main className="flex flex-1 w-full">
                {children}
            </main>
        </div>
    )
}
