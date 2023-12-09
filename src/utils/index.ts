/* eslint-disable @typescript-eslint/no-explicit-any */
export const convertImage2base64 = async (imageFile: any): Promise<string> => {
  let base64Image = null;
  const binaryImage = await imageFile.arrayBuffer();
  base64Image = btoa(
    new Uint8Array(binaryImage).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ''
    )
  );
  return base64Image;
};
