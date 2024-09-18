import { yupResolver } from '@hookform/resolvers/yup';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import style from '../../../component/StyleChung/StyleChung.module.scss';

const editLVSchema = object({
  ma_lv3: string()
    .required('Nhóm Level 3 không được để trống')
    .matches(/^\d{3}$/, 'Nhóm Level 3 phải có 3 chữ số và phải là số'),
  ten_lv3: string()
    .required('Tên nhóm Level 3 không được để trống')
});

export default function UpdateLV({ handleCloseNhomLV, data }) {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    defaultValues: {
      ma_lv1: '',
      ma_lv2: '',
      ma_lv3: data?.ma_lv3,
      ten_lv3: data?.ten_lv3 || ''
    },
    resolver: yupResolver(editLVSchema),
    mode: 'onTouched'
  });

  const [selectedLv1, setSelectedLv1] = useState(data?.Lv1?.ma_lv1 || '');
  const [selectedLv2, setSelectedLv2] = useState(data?.Lv2?.ma_lv2 || '');

  const handleChangeLv1 = (event) => {
    const selectedValue = event.target.value;
    setSelectedLv1(selectedValue);

    // Cập nhật giá trị `ma_lv1` trong form
    setValue('ma_lv1', selectedValue);

    // Reset các giá trị Level 2 và 3 khi thay đổi Level 1
    setSelectedLv2('');
    setValue('ma_lv2', '');
    setValue('ten_lv3', '');
  };

  const handleChangeLv2 = (event) => {
    const selectedValue = event.target.value;
    setSelectedLv2(selectedValue);

    // Cập nhật giá trị `ma_lv2` trong form
    setValue('ma_lv2', selectedValue);

    // Reset giá trị Level 3 khi thay đổi Level 2
    setValue('ten_lv3', '');
  };

  return (
    <div>
      <form onSubmit={handleSubmit((formData) => console.log(formData))}>
        <div>
          <h3>CẬP NHẬT NHÓM NGÀNH HÀNG</h3>
        </div>

        <div className={style.js1}>
          <InputLabel id="lv1-select-label" className={style.js11}>
            Nhóm Level 1
          </InputLabel>
          <FormControl variant="standard" style={{ display: 'inline-block', alignItems: 'center' }}>
            <Select
              labelId="lv1-select-label"
              id="lv1-select"
              value={selectedLv1}
              onChange={handleChangeLv1}
              sx={{ minWidth: 175 }}
            >
              {/* {dataitem.map((item) => (
                <MenuItem key={item.Lv1.ma_lv1} value={item.Lv1.ma_lv1}>
                  {item.Lv1.ten_lv1}
                </MenuItem>
              ))} */}
            </Select>
          </FormControl>
        </div>

        <div className={style.js1}>
          <InputLabel id="lv2-select-label" className={style.js11}>
            Nhóm Level 2
          </InputLabel>
          <FormControl variant="standard" style={{ display: 'inline-block', alignItems: 'center' }}>
            <Select
              labelId="lv2-select-label"
              id="lv2-select"
              value={selectedLv2}
              onChange={handleChangeLv2}
              sx={{ minWidth: 175 }}
            >
              {/* {dataitem
                .filter(item => item.Lv1.ma_lv1 === selectedLv1)
                .map((item) => (
                  <MenuItem key={item.Lv2.ma_lv2} value={item.Lv2.ma_lv2}>
                    {item.Lv2.ten_lv2}
                  </MenuItem>
                ))} */}
            </Select>
          </FormControl>
        </div>

        <div className={style.js1}>
          <InputLabel id="lv3-input-label" className={style.js11}>
            Tên Nhóm Level 3
          </InputLabel>
          <TextField
            error={!!errors.ten_lv3}
            variant="standard"
            {...register('ten_lv3')}
            helperText={errors.ten_lv3?.message}
          />
        </div>

        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
