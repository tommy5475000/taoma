import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import {  object, string } from 'yup'
import style from '../../../component/StyleChung/StyleChung.module.scss'
import { Button, InputLabel, TextField } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addNcc } from '../../../apis/Ncc'
import { capitalizeFirstLetter, showAlert } from '../../../component/ModalManager/itemStyle'
import dayjs from 'dayjs'

const addNccSchema = object({
    ma_ncc: string().required("Mã nhà cung cấp không được để trống"),
    ten_thuong_goi: string().required("Tên thường gọi không được để trống"),
    ten_ncc: string().required("Tên nhà cung cấp không được để trống"),
    mst: string().required("Mã số thuế không được để trống").matches(/^\d+$/, "Mã số thuế phải là số"),
    so_dt: string().required("Số điện thoại không được để trống").matches(/^\d+$/, "Số điện thoại phải là số"),
    dia_chi: string().required("Địa chỉ không được để trống"),
    ngay_tao: string(),
})
export default function CreateMaNcc({ handleCloseNCC }) {
    const queryClient = useQueryClient();

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            ma_ncc: "",
            ten_thuong_goi: "",
            ten_ncc: "",
            mst: "",
            so_dt: "",
            dia_chi: "",
            ngay_tao: "",
        },
        resolver: yupResolver(addNccSchema),
        mode: "onTouched",
    })

    const { mutate: onSubmit } = useMutation({
        mutationFn: (values) => {
            const formattedValues = {
                ...values,
                ma_ncc: values.ma_ncc.toUpperCase(),
                ten_thuong_goi: capitalizeFirstLetter(values.ten_thuong_goi),
                ten_ncc: capitalizeFirstLetter(values.ten_ncc),
                mst: values.mst,
                so_dt: values.so_dt,
                dia_chi: capitalizeFirstLetter(values.dia_chi),
                ngay_tao: dayjs().toISOString(),
            };
            console.log(formattedValues);
            return addNcc(formattedValues);
        },
        onError: (error) => {
            const errorMessage = error.message || error.messenge || 'Đã xảy ra lỗi';
            showAlert(errorMessage, 'error');
        },
        onSuccess: () => {
            showAlert('Thành công', 'success');
            handleCloseNCC();
            queryClient.invalidateQueries({ queryKey: ['dataNcc'] });
        },
    });

    return (
        <div >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <h3>TẠO NHÀ CUNG CẤP </h3>
                </div>
                <div className={style.js1}>
                    <InputLabel id="demo-simple-select-standard-label" className={style.js11}>
                        Mã Nhà Cung Cấp
                    </InputLabel>
                    <TextField error={errors.ma_ncc} variant="standard" {...register("ma_ncc")}
                        helperText={errors.ma_ncc?.message}
                    />
                </div>

                <div className={style.js1}>
                    <InputLabel id="demo-simple-select-standard-label" className={style.js11}>
                        Tên Thường Gọi
                    </InputLabel>
                    <TextField error={errors.ten_thuong_goi} variant="standard" {...register("ten_thuong_goi")}
                        helperText={errors.ten_thuong_goi?.message}
                    />
                </div>

                <div className={style.js1}>
                    <InputLabel id="demo-simple-select-standard-label" className={style.js11}>
                        Tên Nhà Cung Cấp
                    </InputLabel>
                    <TextField error={errors.ten_ncc} variant="standard" {...register("ten_ncc")}
                        helperText={errors.ten_ncc?.message}
                    />
                </div>
                <div className={style.js1}>
                    <InputLabel id="demo-simple-select-standard-label" className={style.js11}>
                        Mã Số Thuế
                    </InputLabel>
                    <TextField error={errors.mst} variant="standard" {...register("mst")}
                        helperText={errors.mst?.message}
                    />
                </div>

                <div className={style.js1}>
                    <InputLabel id="demo-simple-select-standard-label" className={style.js11}>
                        Số Điện Thoại
                    </InputLabel>
                    <TextField error={errors.so_dt} variant="standard" {...register("so_dt")}
                        helperText={errors.so_dt?.message}
                    />
                </div>

                <div className={style.js1}>
                    <InputLabel id="demo-simple-select-standard-label" className={style.js11}>
                        Địa Chỉ
                    </InputLabel>
                    <TextField error={errors.dia_chi} variant="standard" {...register("dia_chi")}
                        helperText={errors.dia_chi?.message}
                    />
                </div>
                <div>
                    <Button type='submit'> Tạo</Button>
                    <Button onClick={handleCloseNCC}>Hủy</Button>
                </div>
            </form>
        </div>
    )
}
