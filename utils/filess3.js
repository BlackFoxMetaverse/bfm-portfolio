import instance from "./axios";

async function getFiles(fileUrl) {
  try {
    const response = await instance.get("/main/files", {
      headers: {
        s3Url: fileUrl,
      },
    });

    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
}

export default getFiles;
