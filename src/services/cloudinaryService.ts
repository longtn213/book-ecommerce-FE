export interface CloudinaryUploadResponse {
    secure_url: string;
    public_id: string;
    url: string;
    [key: string]: any;
}

export const uploadToCloudinary = async (
    file: File,
    folder = "bookstore/avatar"
): Promise<CloudinaryUploadResponse> => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset as string);
    formData.append("folder", folder);

    const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
            method: "POST",
            body: formData,
        }
    );

    if (!res.ok) throw new Error("Upload thất bại!");

    return (await res.json()) as CloudinaryUploadResponse;
};
