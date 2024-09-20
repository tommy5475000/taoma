import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from 'yup'

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
  const ProductForm = () => {
    const {
      register,
      watch,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(schema),
    });

    const [productVariants, setProductVariants] = useState([]);

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
            <label>Mã hàng</label>
            <input {...register("ten_sp")} />
            {errors.ten_sp && <p>{errors.ten_sp.message}</p>}
          </div>

          {/* Display giaBan input if no size or mau is provided */}
          {(!watchSize && !watchMau) && (
            <div>
              <label>Giá bán</label>
              <input type="number" {...register("gia_ban")} />
              {errors.gia_ban && <p>{errors.gia_ban.message}</p>}
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

          <button type="submit">Tạo mã hàng</button>
        </form>
      </div>
    );
  }
}