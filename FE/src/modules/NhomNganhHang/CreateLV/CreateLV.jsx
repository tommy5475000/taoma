import { yupResolver } from '@hookform/resolvers/yup'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {  object, string } from 'yup'
import style from '../../../component/StyleChung/StyleChung.module.scss'
import AddSharpIcon from '@mui/icons-material/AddSharp'
import ModalWrapper from '../../../component/ModalManager/ModalManager'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addNhomLV, getDataLv1, getDataLv2 } from '../../../apis/NhomNganhHang'
import Lv1 from './LV1/Lv1'
import Lv2 from './LV2/Lv2'
import { capitalizeFirstLetter, showAlert } from '../../../component/ModalManager/itemStyle'
import dayjs from 'dayjs'

const addLvSchema = object({
    // ma_lv1: string().required('Level 1 không được để trống'),
    // ma_lv2: string().required('Level 2 không được để trống'),
    ma_lv3: string()
        .required("Nhóm Level 3 không được để trống")
        .matches(/^\d{3}$/, 'Nhóm Level 3 phải có 3 chữ số và phải là số'),
    ten_lv3: string().required("Tên nhóm Level 3 không được để trống"),
})

export default function CreateLV({ handleClose }) {
    const queryClient = useQueryClient()

    const [selectedLv1, setSelectedLv1] = useState("0");
    const [selectedLv2, setselectedLv2] = useState('0');

    const { data: dataLv1 = [] } = useQuery({
        queryKey: ['dataLv1'],
        queryFn: getDataLv1
    })

    const { data: dataLv2 = [], refetch: refetchLv2 } = useQuery({
        queryKey: ['dataLv2'],
        queryFn: () => getDataLv2(selectedLv1),
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            ma_lv1: "",
            ma_lv2: "",
            ma_lv3: "",
            ten_lv3: "",
            ngay_tao: "",
        },
        resolver: yupResolver(addLvSchema),
        mode: "onTouched",
    })

    const handleChangeLv1 = (event) => {
        setSelectedLv1(event.target.value);
    };

    //----- modal tạo LV1 -----
    const [openLV1, setOpenLV1] = useState(false);
    const handleOpenLV1 = () => {
        setOpenLV1(true);
    };
    const handleCloseLV1 = () => {
        setOpenLV1(false);
    };
    //----- modal tạo LV1 -----


    const handleChangeLv2 = (event) => {
        setselectedLv2(event.target.value);
    };

    //----- modal tạo LV2 -----
    const [openLV2, setOpenLV2] = useState(false);
    const handleOpenLV2 = () => {
        setOpenLV2(true);
    };
    const handleCloseLV2 = () => {
        setOpenLV2(false)
    };
    //----- modal tạo LV2 -----

    useEffect(() => {
        if (selectedLv1 && selectedLv1 !== "0") {
            refetchLv2();
        }
    }, [selectedLv1, refetchLv2]);

    const { mutate: onSubmit } = useMutation({
        mutationFn: (values) => {
            const formattedValues = {
                ...values,
                ma_lv1: selectedLv1,
                ma_lv2: selectedLv2,
                ma_lv3: values.ma_lv3,
                ten_lv3: capitalizeFirstLetter(values.ten_lv3),
                ngay_tao: dayjs().toISOString(),
            };
            return addNhomLV(formattedValues)
        },
        onError: (errors) => {
            const erroMessage = errors.message || errors.message || 'Đã xảy ra lỗi';
            showAlert(erroMessage, 'error')
        },
        onSuccess: () => {
            showAlert('Thành công', 'success');
            handleClose(handleClose)
            queryClient.invalidateQueries({
                queryKey: ['dataNhomLV']
            })
        }
    })

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <h3>TẠO NHÓM NGÀNH HÀNG</h3>
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
                        <Button onClick={handleOpenLV1}>
                            <AddSharpIcon />
                        </Button>
                    </FormControl>
                </div>

                <div className={style.js1}>
                    <InputLabel id="demo-simple-select-standard-label" className={style.js11}>
                        Nhóm Level 2
                    </InputLabel>
                    <FormControl variant="standard" style={{ display: 'inline-block', alignItems: 'center' }}  >
                        <Select
                            labelId="demo-simple-select-required-label"
                            id="demo-simple-select-required"
                            sx={{ minWidth: 175 }}
                            value={selectedLv2}
                            onChange={handleChangeLv2}
                            disabled={selectedLv1 === '0'}
                        >
                            {dataLv2.map((item) => (
                                <MenuItem key={item.ma_lv2} value={item.ma_lv2}>
                                    {item.ten_lv2}
                                </MenuItem>
                            ))}
                        </Select>
                        <Button onClick={handleOpenLV2} disabled={selectedLv1 === '0'}>
                            <AddSharpIcon />
                        </Button>
                    </FormControl>
                </div>

                <div className={style.js1}>
                    <InputLabel id="demo-simple-select-standard-label" className={style.js11}>
                        Nhóm Level 3
                    </InputLabel>
                    <TextField disabled={selectedLv2 === '0'} error={errors.ma_lv3} variant="standard" {...register("ma_lv3")}
                        helperText={errors.ma_lv3?.message}
                    />
                </div>

                <div className={style.js1}>
                    <InputLabel id="demo-simple-select-standard-label" className={style.js11}>
                        Tên Level 3
                    </InputLabel>
                    <TextField disabled={selectedLv2 === '0'} error={errors.ten_lv3} variant="standard" {...register("ten_lv3")}
                        helperText={errors.ten_lv3?.message}
                    />
                </div>

                <div>
                    <Button type='submit'>Tạo</Button>
                    <Button onClick={handleClose}>Hủy</Button>
                </div>
            </form >

            <ModalWrapper
                open={openLV1}
                handleClose={handleCloseLV1}
            >
                <Lv1 handleClose={handleCloseLV1} />
            </ModalWrapper>

            <ModalWrapper
                open={openLV2}
                handleClose={handleCloseLV2}
            >
                <Lv2 handleClose={handleCloseLV2} />
            </ModalWrapper>


        </div >
    )
}
