// ----- TIÊU ĐỀ NHÀ CUNG CẤP -----
export const columnsNcc = [
  { field: "ma_ncc", headerName: "MÃ NHÀ CUNG CẤP", width: 200 },
  { field: "ten_thuong_goi", headerName: "TÊN NHÀ CUNG CẤP", width: 250 },
  { field: "so_dt", headerName: "SỐ ĐIỆN THOẠI", width: 130 },
  {
    field: "mst",
    headerName: "MÃ SỐ THUẾ",
    width: 130,
  },
  // {field: 'ai', headerName:'Trạng thái',width:130}
];

// ----- TIÊU ĐỀ SKU -----
export const columnsSku = [
  { field: "ma_sku", headerName: "MÃ SKU", width: 200 },
  { field: "ten_sp", headerName: "TÊN SẢN PHẨM", width: 250 },
  { field: "ten_full", headerName: "TÊN SP + THUỘC TÍNH ", width: 300 },
  {
    field: "ma_vach",
    headerName: "BARCODE",
    width: 150,
  },
  { field: "ten_thuong_goi", headerName: "TÊN THƯỜNG GỌI", width: 150 },
  { field: "gia_von", headerName: "GIÁ VỐN", width: 100 },
  { field: "gia_ban", headerName: "GIÁ BÁN", width: 100 },
  { field: "loai_hang", headerName: "LOẠI HÀNG", width: 100 },
];

// ----- TIÊU ĐỀ HEADER -----
export const items = [
  {
    key: "1",
    label: "Hàng Hóa",
  },
  {
    key: "2",
    label: "Đối Tác",
  },
  {
    key: "3",
    label: "Nhóm Ngành Hàng",
  },
  {
    key: "5",
    label: "",
  },
];

// ----- TIÊU ĐỀ NHÓM NGÀNH HÀNG -----
export const columnsLV = [
  { field: "ma_lv1", headerName: "LEVEL 1", width: 150 },
  {
    field: "ten_lv1",
    headerName: "TÊN NHÓM LV1",
    width: 250,
  },
  { field: "ma_lv2", headerName: "LEVEL 2", width: 150 },
  { field: "ten_lv2", headerName: "TÊN NHÓM LV2", width: 250,

   },
  { field: "ma_lv3", headerName: "LEVEL 3", width: 150 },
  { field: "ten_lv3", headerName: "TÊN NHÓM LV3", width: 250 },
];
