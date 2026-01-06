import { api } from "./api";

// UPLOAD
export async function uploadFile(file: File, userID: number) {
  const formData = new FormData();
  formData.append("archive", file); // nome EXATO do multer
  formData.append("userID", userID.toString());

  const response = await api.post("/api/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}

// LISTAR TODOS
export async function getAllFiles() {
  const response = await api.get("/api/dev/getallfiles");
  return response.data.files;
}

// DOWNLOAD
export async function downloadFile(filename: string) {
  const response = await api.get(
    `/api/downloadfile/${filename}`,
    { responseType: "blob" }
  );

  return response.data;
}
