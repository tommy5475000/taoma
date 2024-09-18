import { yupResolver } from '@hookform/resolvers/yup'
import { Button, InputLabel, TextField } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import { object, string } from 'yup'
import style from '../../../../component/StyleChung/StyleChung.module.scss'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { showAlert, capitalizeFirstLetter } from '../../../../component/ModalManager/itemStyle'
import { addLv1 } from '../../../../apis/NhomNganhHang'
import dayjs from 'dayjs'


const addLv1Schema = object({
    ma_lv1: string()
    .required("Nhóm Level 1 không được để trống")
    .matches(/^\d{3}$/, 'Nhóm Level 1 phải có 3 chữ số và phải là số'),
    ten_lv1: string().required("Tên nhóm Level 3 không được để trống"),
})

export default function Lv1({handleClose}) {
    const queryClient = useQueryClient()

    const { handleSubmit, register, formState: { errors } } = useForm({
        defaultValues: {
            ma_lv1: "",
            ten_lv1: "",
            ngay_tao: "",
        },
        resolver: yupResolver(addLv1Schema),
        mode: 'onTouched',
    })

     const { mutate: onSubmit } = useMutation({
        mutationFn: (values) => {
            const formattedValues = {
                ...values,
                ma_lv1: values.ma_lv1,
                ten_lv1: capitalizeFirstLetter(values.ten_lv1),
                ngay_tao: dayjs().toISOString(),
            };
            return addLv1(formattedValues);
        },
        onError: (error) => {
            const errorMessage = error.message || error.messenge || 'Đã xảy ra lỗi';
            showAlert(errorMessage, 'error');
        },
        onSuccess: () => {
            showAlert('Thành công', 'success');
            handleClose(handleClose)
            queryClient.invalidateQueries({ queryKey: ['dataLv1'] });
        },
    })


    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <h3>TẠO NHÓM LEVEL 1</h3>
                </div>

                <div className={style.js1}>
                    <InputLabel id="demo-simple-select-standard-label" className={style.js11}>
                        Nhóm Level 1
                    </InputLabel>
                    <TextField error={errors.ma_lv1} variant="standard" {...register("ma_lv1")}
                        helperText={errors.ma_lv1?.message}
                    />
                </div>

                <div className={style.js1}>
                    <InputLabel id="demo-simple-select-standard-label" className={style.js11}>
                        Tên Level 1
                    </InputLabel>
                    <TextField error={errors.ten_lv1} variant="standard" {...register("ten_lv1")}
                        helperText={errors.ten_lv1?.message}
                    />
                </div>

                <div>
                    <Button type='submit'>Tạo</Button>
                    <Button onClick={handleClose} >Hủy</Button>
                </div>

            </form>
        </div>
    )
}
