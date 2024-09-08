import { useState } from "react";
import ImgCrop from "antd-img-crop";
import { Upload, UploadFile } from "antd";
import getSrcFromFile, { File } from "../../services/uploadFile.service";

interface UploadGuestPhotoProps {
    setPhotoUrl: (photo: string) => void;
}

const UploadGuestPhoto = ({ setPhotoUrl }: UploadGuestPhotoProps) => {
    const [fileList, setFileList] = useState<
        { url: string | ArrayBuffer | null }[]
    >([]);

    const beforeUpload = (file: Blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setFileList([...fileList, { url: reader.result }]);
            setPhotoUrl(reader.result as string);
        };

        // then upload `file` from the argument manually
        return false;
    };

    const onPreview = async (file: UploadFile) => {
        const src: string | ArrayBuffer | null = file.url || await getSrcFromFile(file as File);

        const imgWindow = window.open(src?.toString());

        if (imgWindow) {
            const image = new Image();
            image.src = src?.toString() || "";
            imgWindow.document.write(image.outerHTML);
        } else {
            window.location.href = src?.toString() || "";
        }
    };

    return (
        <ImgCrop showGrid rotationSlider aspectSlider showReset>
            <Upload
                name="photo"
                listType="picture-card"
                fileList={fileList as Array<UploadFile>}
                beforeUpload={beforeUpload}
                onPreview={onPreview}
                onRemove={() => {
                    setFileList([]);
                    setPhotoUrl("");
                }}
            >
                {fileList.length < 1 && "+ Subir Foto"}
            </Upload>
        </ImgCrop>
    );
};

export default UploadGuestPhoto;
