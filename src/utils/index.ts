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

// create an array of promises by mapping each object to its getData function
// const promises = arr.map((obj) => obj.getData());

// // wait for all the promises to resolve and get an array of results
// Promise.all(promises).then((results) => {
//   // loop through the results and compare them with the target data
//   for (let i = 0; i < results.length; i++) {
//     const data = results[i];
//     const target = "Foo";
//     if (data === target) {
//       // do something if the data matches the target
//       console.log(`${arr[i].name} has the target data: ${data}`);
//     } else {
//       // do something else if the data does not match the target
//       console.log(`${arr[i].name} does not have the target data: ${data}`);
//     }
//   }
// });
