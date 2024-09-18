import fetcher from "./fetcher";

// ----- LẤY DANH SÁCH NHÓM NGÀNH HÀNG -----
export const getDataLV = async ()=>{
    try {
        const response = await fetcher.get('/nhomlv/LayDanhSachNhomLV');
        return response.data.content;
    } catch (error) {
        throw error.response.data?.content;
    }
}

// ----- TẠO NHÓM NGÀNH HÀNG -----
export const addNhomLV = async (payload)=>{
    try {
        const response = await fetcher.post('/nhomlv/TaoNhomLV', payload)
        return response.data?.content;
    } catch (error) {
        throw error.response.data;
    }
}

// ----- XÓA NHÓM NGÀNH HÀNG -----
export const removeNhomNH = async(selectedRows)=>{
  try {
    const response = await fetcher.delete("/nhomlv/XoaNhomLV", {
      params: {
        id: selectedRows,
      },
    });
    return response.data?.content;
  } catch (error) {
    throw error.response.data;
  }
}

// ----- TẠO LEVEL 1 -----
export const addLv1 = async (payload) => {
  try {
    const response = await fetcher.post("/lv1/TaoLv1", payload);
    return response.data?.content;
  } catch (error) {
    throw error.response.data;
  }
};

// ----- LẤY DANH SÁCH LEVEL 1 -----
export const getDataLv1 = async () => {
  try {
    const response = await fetcher.get("/lv1/LayDanhSachLv1");
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

// ----- TẠO LEVEL 2 -----
export const addLv2 = async (payload) => {
  try {
    const response = await fetcher.post("/lv2/TaoLv2", payload);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// ----- LẤY DANH SÁCH LEVEL 2 -----
export const getDataLv2 = async (ma_lv1) => {
  try {
    const response = await fetcher.get(`/lv2/LayDanhSachLv2?ma_lv1=${ma_lv1}`);
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};
