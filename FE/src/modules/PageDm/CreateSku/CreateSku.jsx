import React, { useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = Yup.object().shape({
  maHang: Yup.string().required("Mã hàng là bắt buộc"),
  giaBan: Yup.lazy((value, context) => {
    const { size, mau } = context.parent;
    if (size && mau) {
      return Yup.number()
        .required("Giá bán là bắt buộc khi có size và màu")
        .positive("Giá bán phải là số dương");
    }
    if (!size && !mau) {
      return Yup.number()
        .required("Giá bán là bắt buộc khi không có size và màu")
        .positive("Giá bán phải là số dương");
    }
    return Yup.number().optional(); // Nếu chỉ có size hoặc màu, giá bán là tùy chọn
  }),
  size: Yup.string().optional(),
  mau: Yup.string().optional(),
});

const ProductForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [productVariants, setProductVariants] = useState([]);

  const watchSize = watch("size");
  const watchMau = watch("mau");

  const onSubmit = (data) => {
    let variants = [];

    const sizes = data.size ? data.size.split(",").map((size) => size.trim()) : [""];
    const colors = data.mau ? data.mau.split(",").map((mau) => mau.trim()) : [""];

    if (sizes.length > 1 || colors.length > 1 || sizes[0] || colors[0]) {
      sizes.forEach((size) => {
        colors.forEach((mau) => {
          variants.push({
            maHang: data.maHang,
            size: size || "Không có size",
            mau: mau || "Không có màu",
            giaBan: "",
          });
        });
      });
    } else {
      variants.push({
        maHang: data.maHang,
        size: "Không có size",
        mau: "Không có màu",
        giaBan: data.giaBan,
      });
    }

    setProductVariants(variants);
  };

  const handleVariantPriceChange = (index, event) => {
    const newVariants = [...productVariants];
    newVariants[index].giaBan = event.target.value;
    setProductVariants(newVariants);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Mã hàng</label>
          <input {...register("maHang")} />
          {errors.maHang && <p>{errors.maHang.message}</p>}
        </div>

        {(!watchSize && !watchMau) && (
          <div>
            <label>Giá bán</label>
            <input type="number" {...register("giaBan")} />
            {errors.giaBan && <p>{errors.giaBan.message}</p>}
          </div>
        )}

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

        <button type="submit">Tạo mã hàng</button>
      </form>

      {productVariants.length > 0 && (
        <div>
          <h3>Danh sách biến thể sản phẩm:</h3>
          <ul>
            {productVariants.map((variant, index) => (
              <li key={index}>
                <p>Tên sản phẩm: {variant.maHang}</p>
                <p>Size: {variant.size}</p>
                <p>Màu: {variant.mau}</p>
                <input
                  type="number"
                  placeholder="Nhập giá bán"
                  value={variant.giaBan}
                  onChange={(e) => handleVariantPriceChange(index, e)}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProductForm;
