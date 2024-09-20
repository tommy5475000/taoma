import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from 'yup'
import { Autocomplete, Button, Chip, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import style from '../../../component/StyleChung/StyleChung.module.scss'
import { useQuery } from "@tanstack/react-query";
import { getDataNcc } from "../../../apis/Ncc";
import { getDataLV } from "../../../apis/NhomNganhHang";

const schema = object().shape({
  loai_hang: string(),
  ma_ncc: string(),
  ten_sp: string().required("Tên sản phẩm không được để trống"),
  dvt: string().required("Đơn vị tính không được để trống"),
  id_nhom: string(),
  gia_ban: string(),
  size: string().optional(),
  mau: string().optional(),
});

export default function CreateSku({ handleClose }) {
  const [productVariants, setProductVariants] = useState([]);
  const [loaiHang, setLoaiHang] = useState(" ");
  const [ncc, setNcc] = useState(" ");
  const [nganhHang, setNganhHang] = useState("0");

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
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched"
  })


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
            ten_sp: watchMaHang || "Mã hàng chưa nhập",
            size: size || "Không có size",
            mau: mau || "Không có màu",
            gia_ban: "",
          });
        });
      });

      setProductVariants(variants);
    } else {
      setProductVariants([]);
    }
  }, [watchSize, watchMau, watchMaHang]);

  const onSubmit = (data) => {

    // Kiểm tra xem giá bán có được nhập khi không có size và màu
    if (!watchSize && !watchMau && !data.gia_ban) {
      alert("Vui lòng nhập giá bán.");
      return;
    }

    // Kiểm tra xem tất cả các biến thể đều có giá bán nếu size và màu đã được cung cấp
    const allVariantsValid = productVariants.every(variant => {
      return (variant.size && variant.mau) ? Boolean(variant.gia_ban) : true;
    });

    if (!allVariantsValid) {
      alert("Vui lòng nhập giá bán cho tất cả các thuộc tính.");
      return;
    }

    const combinedData = {
      ...data,
      productVariants,
    };

    console.log("Combined Data:", combinedData);
  };

  const handleVariantPriceChange = (index, event) => {
    const newVariants = [...productVariants];
    newVariants[index].gia_ban = event.target.value;
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
                --- CHỌN LOẠI HÀNG ---
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
          {/* <input {...register("ten_sp")} />
          {errors.ten_sp && <p>{errors.ten_sp.message}</p>} */}
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

        {/* Display giaBan input if no size or mau is provided */}
        {(!watchSize && !watchMau) && (
          <div>
            <label>Giá bán</label>
            <input type="number" {...register("gia_ban")} />
            {errors.gia_ban && <p>{errors.gia_ban.message}</p>}
          </div>
        )}

        <Controller
          name="size"
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <Autocomplete
              {...field}
              multiple
              id="tags-filled"
              freeSolo
              options={[]} // nếu bạn có một danh sách size có sẵn, bạn có thể đặt vào đây
              value={field.value}
              onChange={(event, newValue) => {
                field.onChange(newValue); // Cập nhật giá trị vào react-hook-form
              }}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    variant="outlined"
                    label={option}
                    {...getTagProps({ index })}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder="Nhập Size"
                  error={!!errors.size}
                  helperText={errors.size ? errors.size.message : null}
                />
              )}
            />
          )}
        />

        <div>
          <label>Size (Tùy chọn, nhập cách nhau bởi dấu phẩy)</label>
          <input {...register("size")} />
          {errors.size && <p>{errors.size.message}</p>}
        </div>

        <div>
          <label>Màu (Tùy chọn, nhập cách nhau bởi dấu phẩy)</label>
          <input {...register("mau")} />
          {errors.mau && <p>{errors.mau.message}</p>}
        </div>

        {/* Dynamically render product variants if sizes or colors are provided */}
        {productVariants.length > 0 && (
          <div>
            <h3>Danh sách biến thể sản phẩm:</h3>
            <ul>
              {productVariants.map((variant, index) => (
                <li key={index}>
                  <p>Tên sản phẩm: {variant.ten_sp}</p>
                  <p>Size: {variant.size}</p>
                  <p>Màu: {variant.mau}</p>
                  <input
                    type="number"
                    placeholder="Nhập giá bán"
                    value={variant.gia_ban}
                    onChange={(e) => handleVariantPriceChange(index, e)}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}

        <Button type="submit">Tạo mã hàng</Button>
        <Button onClick={handleClose}>Hủy</Button>
      </form>
    </div>
  );
}
