import fetcher from "./fetcher";

// ----- LẤY DANH SÁCH SKU ----- //
export const getDataSku = async () => {
  try {
    const response = await fetcher.get("/sku/LayDanhSachSku");
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

// ----- TẠO MÃ SKU ----- //
export const addSku = async (payload) => {
  console.log('gui sv',payload);
  try {
    const response = await fetcher.post("/sku/TaoSku", payload);
    
    return response.data?.content;
  } catch (error) {
    throw error.response.data;
  }
};
