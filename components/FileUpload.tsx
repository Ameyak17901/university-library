/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useToast } from "@/hooks/use-toast";
import config from "@/lib/config";
import { ImageKitProvider, IKUpload, IKImage } from "imagekitio-next";
import Image from "next/image";
import { useRef, useState } from "react";

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Authentication request failed: ${errorText}, status: ${response.status}`
      );
    }

    const data = await response.json();
    const { signature, token, expire } = data;

    return { signature, token, expire };
  } catch (error) {
    throw new Error(`Authentication Request failed: ${error}`);
  }
};

const ImageUpload = ({
  onFileUpload,
}: {
  onFileUpload: (filePath: string) => void;
}) => {
  const IkUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);
  const { toast } = useToast();

  const onError = (error: any) => {
    console.error(error);

    toast({
      title: "Failed to upload",
      description: "Your image could not be uploaded, Please try again",
      variant: "destructive",
    });
  };
  const onSuccess = (res: any) => {
    setFile(res);
    onFileUpload(res.filePath);
    toast({
      title: "Image uploaded successfully...",
      description: `${res.filePath} uploaded`,
    });
  };

  return (
    <ImageKitProvider
      authenticator={authenticator}
      publicKey={config.env.imagekit.publicKey}
      urlEndpoint={config.env.imagekit.urlEndpoint}
    >
      <IKUpload
        ref={IkUploadRef}
        className="hidden"
        onError={onError}
        onSuccess={onSuccess}
      />
      <button
        className="upload-btn"
        onClick={(e) => {
          e.preventDefault();
          if (IkUploadRef.current) {
            // @ts-expect-error: IKUploadRef.current may not have a click method, but we expect it to work here
            IkUploadRef.current.click();
          }
        }}
      >
        <Image
          src="/icons/upload.svg"
          alt="upload-icon"
          className="object-contain"
          width={20}
          height={20}
        />
      </button>
      <p className="text-base text-light-100 "> Upload a file</p>
      {file && (
        <>
          <p className="upload-filename">{file.filePath}</p>
        </>
      )}
      {file && (
        <IKImage
          alt={file.filePath}
          path={file.filePath}
          width={500}
          height={300}
        />
      )}
    </ImageKitProvider>
  );
};

export default ImageUpload;
