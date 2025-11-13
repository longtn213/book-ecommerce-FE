"use client";

import {useState} from "react";
import Image from "next/image";
import {uploadToCloudinary} from "@/services/cloudinaryService";

type UploadImageProps = {
    label?: string;
    value?: string;
    folder?: string;
    onChange: (url: string) => void;
};

const UploadImage: React.FC<UploadImageProps> = ({
                                                     label = "Upload Image",
                                                     value = "",
                                                     folder = "bookstore/avatar",
                                                     onChange,
                                                 }) => {
    const [preview, setPreview] = useState<string>(value);
    const [loading, setLoading] = useState<boolean>(false);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setLoading(true);

        try {
            const result = await uploadToCloudinary(file, folder);
            const url = result.secure_url;

            setPreview(url);
            onChange(url);
        } catch (err) {
            alert("Upload thất bại!");
            console.error(err);
        }

        setLoading(false);
    };

    return (
        <div className="flex flex-col gap-2">
            {label && <label className="text-sm font-medium">{label}</label>}

            <div className="flex items-center gap-4">
                {/* Preview */}
                <div className="w-20 h-20 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                    {preview ? (
                        <Image
                            src={preview}
                            alt="Preview"
                            width={80}
                            height={80}
                            className="object-cover"
                        />
                    ) : (
                        <span className="text-gray-400 text-xs">No image</span>
                    )}
                </div>

                {/* Upload input */}
                <div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleUpload}
                        className="block text-sm"
                    />

                    {loading && (
                        <p className="text-xs text-blue-500 mt-1">Uploading...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UploadImage;
