export interface File {
    originFileObj: Blob;
    url: string | ArrayBuffer | null;
}

const getSrcFromFile = (file: File) => {
    return new Promise<string | null | ArrayBuffer>((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
    });
};

export default getSrcFromFile;
