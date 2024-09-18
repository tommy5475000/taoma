import { yupResolver } from '@hookform/resolvers/yup'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { object, string } from 'yup'
import style from '../../../../component/StyleChung/StyleChung.module.scss'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { capitalizeFirstLetter, showAlert } from '../../../../component/ModalManager/itemStyle'
import { addLv2, getDataLv1 } from '../../../../apis/NhomNganhHang'
import dayjs from 'dayjs'


const addLv2Schema = object({
    ma_lv1: string(),
    ma_lv2: string()
        .required("Nhóm Level 2 không được để trống")
        .matches(/^\d{3}$/, 'Nhóm Level 2 phải có 3 chữ số và phải là số'),
    ten_lv2: string().required('Tên Level 2 không được để trống')
})

export default function Lv2({ handleClose }) {
    const queryClient = useQueryClient()

    const [selectedLv1, setSelectedLv1] = useState('0')

    const handleChangeLv1 = (event) => {
        setSelectedLv1(event.target.value)
    }

    const { data: dataLv1 = [] } = useQuery({
        queryKey: ['dataLv1'],
        queryFn: getDataLv1
    })

    const { handleSubmit, register, formState: { errors } } = useForm({
        defaultValues: {

            ma_lv2: "",
            ten_lv2: "",
            ngay_tao: "",
        },
        resolver: yupResolver(addLv2Schema),
        mode: 'onTouched,',
    })

    const { mutate: onSubmit } = useMutation({
        mutationFn: (values) => {
            const formatedValues = {
                ...values,
                ma_lv1: selectedLv1,
                ma_lv2: values.ma_lv2,
                ten_lv2: capitalizeFirstLetter(values.ten_lv2),
                ngay_tao: dayjs().toISOString(),
            };
            console.log(formatedValues);
            return addLv2(formatedValues)

        },
        onError: (errors) => {
            const errorMessage = errors.message || errors.message || 'Đã xảy ra lỗi';
            showAlert(errorMessage, 'error');
        },
        onSuccess: () => {
            showAlert('Thành công', 'success');
            handleClose(handleClose)
            queryClient.invalidateQueries({ queryKey: ['dataLv2'] })
        }
    })

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <h3>TẠO NHÓM LEVEL 2</h3>
                </div>

                <div className={style.js1}>
                    <InputLabel id="demo-simple-select-standard-label" className={style.js11}>
                        Nhóm Level 1
                    </InputLabel>

                    <FormControl variant="standard" style={{ display: 'inline-block', alignItems: 'center' }}  >
                        <Select
                            labelId="demo-simple-select-required-label"
                            id="demo-simple-select-required"
                            sx={{ minWidth: 175 }}
                            value={selectedLv1}
                            onChange={handleChangeLv1}
                        >
                            {dataLv1.map((item) => (
                                <MenuItem key={item.ma_lv1} value={item.ma_lv1} disabled={item.ma_lv1 === '0'}>
                                    {item.ten_lv1}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>

                <div className={style.js1}>
                    <InputLabel id="demo-simple-select-standard-label" className={style.js11}>
                        Nhóm Level 2
                    </InputLabel>
                    <TextField disabled={selectedLv1 === '0'} error={errors.ma_lv2} variant="standard" {...register("ma_lv2")}
                        helperText={errors.ma_lv2?.message}
                    />
                </div>

                <div className={style.js1}>
                    <InputLabel id="demo-simple-select-standard-label" className={style.js11}>
                        Tên Level 2
                    </InputLabel>
                    <TextField disabled={selectedLv1 === '0'} error={errors.ten_lv2} variant="standard" {...register("ten_lv2")}
                        helperText={errors.ten_lv2?.message}
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
