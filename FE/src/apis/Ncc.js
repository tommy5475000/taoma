import fetcher from "./fetcher";

// ----- LÁY DANH SÁCH NHÀ CUNG CẤP ----- //
export const getDataNcc = async () => {
  try {
    const response = await fetcher.get("/ncc/LayDanhSachNCC");
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

// ----- TẠO NHÀ CUNG CẤP ----- //
export const addNcc = async (payload) => {
  try {
    const response = await fetcher.post("/ncc/TaoNCC", payload);
    return response.data?.content;
  } catch (error) {
    throw error.response.data;
  }
};

// ----- XÓA NHÀ CUNG CẤP ----- //
export const removeNcc = async (selectedRows) => {
  try {
    const response = await fetcher.delete("/ncc/XoaNCC", {
      params: {
        id: selectedRows,
      },
    });
    return response.data?.content;
  } catch (error) {
    throw error.response.data;
  }
};

// ----- EDIT NHÀ CUNG CẤP ----- //
export const editNcc = async (payload) => {
  try {
    const response = await fetcher.post('/ncc/EditNCC', payload);
    return response.data?.content;
  } catch (error) {
    throw error.response.data;
  }
};


