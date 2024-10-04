import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { number, object, string } from 'yup'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import style from '../../../component/StyleChung/StyleChung.module.scss'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getDataNcc } from "../../../apis/Ncc";
import { getDataLV } from "../../../apis/NhomNganhHang";
import { capitalizeFirstLetter, showAlert } from "../../../component/ModalManager/itemStyle";
import dayjs from "dayjs";
import { addSku } from "../../../apis/Sku";

const schema = object().shape({
  loai_hang: string(),
  ma_ncc: string(),
  ten_sp: string().required("Tên sản phẩm không được để trống"),
  dvt: string().required("Đơn vị tính không được để trống"),
  id_nhom: string(),
  loai_thue: string(),
  gia_ban: string(),
  size: string().optional(),
  mau: string().optional(),
});

export default function CreateSku({ handleClose }) {
  const queryClient = useQueryClient();

  const [productVariants, setProductVariants] = useState([]);
  const [loaiHang, setLoaiHang] = useState(" ");
  const [ncc, setNcc] = useState(" ");
  const [nganhHang, setNganhHang] = useState("0");
  const [loaiThue, setLoaiThue] = useState(' ')

  const handleChangeVat = (event) => {
    setLoaiThue(event.target.value)

  }

  const handleChangeLoaiHang = (event) => {
    setLoaiHang(event.target.value)
  }

  const handleChangeNcc = (event) => {
    setNcc(event.target.value)
  }

  const handleChangeLV = (event) => {
    setNganhHang(event.target.value)
  }

  const { data: dataNcc = [] } = useQuery({
    queryKey: ['dataNcc'],
    queryFn: getDataNcc
  })

  const { data: dataNhomLV = [] } = useQuery({
    queryKey: ["dataNhomLV"],
    queryFn: getDataLV
  })

  const {
    register,
    watch,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm({
    defaultValues: {
      loai_hang: "",
      ma_ncc: "",
      ten_sp: "",
      dvt: "",
      id_nhom: "",
      size: "",
      mau: "",
      loai_thue: "",
      gia_ban: "",
      ngay_tao: "",
    },
    resolver: yupResolver(schema),
    mode: "onTouched"
  });

  const watchSize = watch("size");
  const watchMau = watch("mau");
  const watchMaHang = watch("ten_sp");

  useEffect(() => {
    if (watchSize || watchMau) {
      let variants = [];
      const sizes = watchSize ? watchSize.split(",").map(size => size.trim()) : [""];
      const colors = watchMau ? watchMau.split(",").map(mau => mau.trim()) : [""];

      sizes.forEach(size => {
        colors.forEach(mau => {
          variants.push({
            ten_sp: watchMaHang ? capitalizeFirstLetter(watchMaHang) : "Mã hàng chưa nhập",
            size: size ? capitalizeFirstLetter(size) : "",
            mau: mau ? capitalizeFirstLetter(mau) : "",
            gia_ban: "",
            loai_thue: loaiThue,
          });
        });
      });

      setProductVariants(variants);
    } else {
      setProductVariants([]);
    }
  }, [watchSize, watchMau, watchMaHang]);

  const { mutate: onSubmit } = useMutation({
    mutationFn: (values) => {

      // Kiểm tra xem giá bán có được nhập khi không có size và màu
      if (!watchSize && !watchMau && !values.gia_ban) {
        alert("Vui lòng nhập giá bán.");
        return Promise.reject(); // sẽ báo không đúng sẽ dừng ngay
      }

      if (!watchSize && !watchMau && values.gia_ban <= 0) {
        alert("Giá bán phải lớn hơn 0.");
        return Promise.reject(); // Dừng và trả về lỗi nếu giá bán nhỏ hơn hoặc bằng 0
      }

      // Kiểm tra xem tất cả các biến thể đều có giá bán nếu size và màu đã được cung cấp
      const allVariantsValid = productVariants.every(variant => {
        return (variant.gia_ban && variant.gia_ban > 0); // Kiểm tra giá bán phải lớn hơn 0
      });

      if (!allVariantsValid) {
        alert("Vui lòng nhập giá bán hợp lệ (lớn hơn 0) cho tất cả các thuộc tính.");
        return Promise.reject();
      }

      const defaultValues = {
        ...values,
        loai_hang: loaiHang,
        ma_ncc: ncc,
        ten_sp: capitalizeFirstLetter(values.ten_sp),
        dvt: capitalizeFirstLetter(values.dvt),
        id_nhom: nganhHang,
        loai_thue: loaiThue,
        gia_ban: values.gia_ban,
        ngay_tao: dayjs().toISOString(),
        productVariants,
      }

      console.log("Combined Data:", defaultValues);
      return addSku(defaultValues)
    },
    onError: (error) => {
      const errorMessage = error.message || error.messenge || 'Đã xảy ra lỗi';
      showAlert(errorMessage, 'error');
    },
    onSuccess: () => {
      showAlert('Thành công', 'success')
      handleClose();
      queryClient.invalidateQueries({
        queryKey: ['dataSku']
      })
    },
  })

  const handleVariantPriceChange = (index, event) => {
    // Loại bỏ ký tự không phải số
    const value = event.target.value.replace(/[^0-9]/g, '');
    // Lưu giá trị thực (số nguyên) vào state
    const newVariants = [...productVariants];
    newVariants[index].gia_ban = value;  // Không định dạng tại đây, chỉ lưu số nguyên
    setProductVariants(newVariants);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h3>TẠO MÃ HÀNG</h3>
        </div>

        <div className={style.js1}>
          <InputLabel className={style.js11}>
            Loại hàng
          </InputLabel>

          <FormControl
            variant="standard"
            className={style.js2}
          >
            <Select
              value={loaiHang}
              onChange={handleChangeLoaiHang}
              className={style.js21}
            >
              <MenuItem
                value={' '}
                disabled
              >
                --- Chọn loại hàng ---
              </MenuItem>

              <MenuItem
                value={'T'}
              >
                Thu mua
              </MenuItem>

              <MenuItem
                value={'K'}
              >
                Ký gửi
              </MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className={style.js1}>
          <InputLabel className={style.js11}>
            Mã nhà cung cấp
          </InputLabel>

          <FormControl
            variant="standard"
            className={style.js2}
          >
            <Select
              value={ncc}
              onChange={handleChangeNcc}
              className={style.js21}
            >
              {dataNcc.map((item) => (
                <MenuItem
                  key={item.ma_ncc}
                  value={item.ma_ncc}
                  disabled={item.ma_ncc === " "}
                >
                  {item.ten_thuong_goi}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className={style.js1}>
          <InputLabel className={style.js11}>
            Tên hàng hóa
          </InputLabel>
          <TextField
            error={errors.ten_sp}
            {...register("ten_sp")}
            helperText={errors.ten_sp?.message}
            variant="standard"
            className={style.js12}
            placeholder="Vui lòng nhập tên hàng"
          />
        </div>

        <div className={style.js1}>
          <InputLabel className={style.js11}>
            Đơn vị tính
          </InputLabel>
          <TextField
            error={errors.dvt}
            {...register("dvt")}
            helperText={errors.dvt?.message}
            variant="standard"
            className={style.js12}
            placeholder="Vui lòng nhập đơn vị tính"
          />
        </div>

        <div className={style.js1}>
          <InputLabel className={style.js11}>
            Nhóm ngành hàng
          </InputLabel>

          <FormControl
            variant="standard"
            className={style.js2}
          >
            <Select
              value={nganhHang}
              onChange={handleChangeLV}
              className={style.js21}
            >
              {dataNhomLV.map((item) => (
                <MenuItem
                  key={item.id_nhom}
                  value={item.id_nhom}
                  disabled={item.id_nhom === 0}
                >
                  {item.ten_lv3}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className={style.js1}>
          <InputLabel className={style.js11}>
            Thuộc tính size
          </InputLabel>
          <TextField
            variant="standard"
            error={errors.size}
            {...register("size")}
            helperText={errors.size?.message}
            className={style.js12}
            placeholder="nhập cách nhau bởi dấu phẩy"
          />
        </div>

        <div className={style.js1}>
          <InputLabel className={style.js11}>
            Thuộc tính màu
          </InputLabel>
          <TextField
            variant="standard"
            error={errors.mau}
            {...register("mau")}
            helperText={errors.mau?.message}
            className={style.js12}
            placeholder="nhập cách nhau bởi dấu phẩy"
          />
        </div>

        <div className={style.js1}>
          <InputLabel className={style.js11}>
            Loại thuế
          </InputLabel>
          <FormControl
            className={style.js12}
            variant="standard"
          >
            <Select
              value={loaiThue}
              onChange={handleChangeVat}
            >
              <MenuItem value={" "} disabled>
                --- Chọn loại thuế ---
              </MenuItem>
              <MenuItem value={0}>
                0%
              </MenuItem>
              <MenuItem value={5}>
                5%
              </MenuItem>
              <MenuItem value={8}>
                8%
              </MenuItem>
              <MenuItem value={10}>
                10%
              </MenuItem>
            </Select>
          </FormControl>
        </div>

        {(!watchSize && !watchMau) && (
          <div className={style.js1}>
            <InputLabel className={style.js11}>
              Giá bán
            </InputLabel>
            <TextField
              type="text"
              error={errors.gia_ban}
              {...register("gia_ban", {
                onChange: (event) => {
                  const value = event.target.value.replace(/[^0-9]/g, ''); // Loại bỏ các ký tự không phải số
                  const formattedValue = new Intl.NumberFormat().format(value); // Định dạng số
                  event.target.value = formattedValue; // Đặt giá trị đã định dạng
                },
              })}
              helperText={errors.gia_ban?.message}
              variant="standard"
              className={style.js12}
              placeholder="Vui lòng nhập giá bán"
            />

          </div>
        )}

        {/* Dynamically render product variants if sizes or colors are provided */}
        {productVariants.length > 0 && (
          <div>
            <h3>Danh sách sản phẩm có thuộc tính:</h3>
            <ol>
              {productVariants.map((variant, index) => (
                <li key={index}>
                  <p>Tên sản phẩm: {variant.ten_sp}</p>
                  <p>Size: {variant.size}</p>
                  <p>Màu: {variant.mau}</p>
                  <TextField
                    variant="standard"
                    type="text"
                    placeholder="Nhập giá bán"
                    value={new Intl.NumberFormat().format(variant.gia_ban)}  // Định dạng lại khi hiển thị
                    onChange={(e) => handleVariantPriceChange(index, e)}
                  />
                </li>
              ))}
            </ol>
          </div>
        )}

        <Button type="submit">Tạo mã hàng</Button>
        <Button onClick={handleClose}>Hủy</Button>
      </form>
    </div>
  );
}
