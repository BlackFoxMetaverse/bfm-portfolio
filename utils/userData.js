import instance from "./axios";

export async function getSellerProfile(username) {
  try {
    const response = await instance.get(`/main/sellerProfile/${username}`);

    return Promise.resolve(response?.data);
  } catch (error) {
    return Promise.reject(error);
  }
}
