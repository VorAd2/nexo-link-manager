
export interface FileRecord {
    id: number;
    user_id: number;
    filename: string;
    path: string; // Caminho no servidor (ex: /uploads/a1b2c3d4e5f6.pdf)
    created_at: Date;
}

export interface FileLink {
    id: number;
    name: string;
    downloadLink: string; // Link público para download (ex: /api/download/documento.pdf)
}
