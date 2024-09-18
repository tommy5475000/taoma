import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import style from "../SignUp/styleSignUp.module.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { useMutation } from "@tanstack/react-query";
// import { signin } from "../../../apis/user";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
// import { useUserContext } from "../../../contexts/UserContext/UserContext";
import PersonIcon from "@mui/icons-material/Person";

const signinSchema = object({
  taiKhoan: string().required("Tài khoản không được để trống"),
  matKhau: string()
    .required("Mật khẩu không được để trống")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      "Mật khẩu ít nhất 8 kí tự, 1 kí tự hoa, 1 kí tự thường và 1 số"
    ),
});

export default function SignIn() {
  // const { currentUser, handleSignin: onSigninSuccess } = useUserContext();

  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
    },
    resolver: yupResolver(signinSchema),
    mode: "onTouched",
  });

  const {
    mutate: handleSignin,
    isLoading,
    error,
  } = useMutation({
    // mutationFn: (payload) => signin(payload),
    onSuccess: (data) => {
      // onSigninSuccess(data);
    },
  });

  const onSubmit = (values) => {
    handleSignin(values);
  };

  // if (currentUser) {
  //   const redirectTo = searchParams.get("redirectTo");
  //   return <Navigate to={redirectTo || "/"} replace />;
  // }

  return (
    <div className={style.backgroud}>
      <Grid sx={{ mx: 65 }}>
        <Container maxWidth="xs">
          <Grid>
            <Grid container>
              <Grid className={style.form}>
                <div className={style.js1}>
                  <Avatar className={style.icon}>
                    <PersonIcon fontSize="medium" />
                  </Avatar>
                  <h3 className={style.h3}>Đăng Nhập</h3>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Box
                    component="form"
                    sx={{
                      "& > :not(style)": { m: 1, width: "40ch" },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      id="outlined-basic"
                      label="Tài Khoản"
                      {...register("taiKhoan")}
                      error={!!errors.taiKhoan}
                      helperText={errors.taiKhoan?.message}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Mật Khẩu"
                      type="password"
                      {...register("matKhau")}
                      error={!!errors.matKhau}
                      helperText={errors.matKhau?.message}
                    />
                  </Box>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className={style.signButton}
                  >
                    Đăng Nhập
                  </Button>
                  {error && <p>{error}</p>}
                </form>
                <div className={style.js2} onClick={() => navigate("/sign-up")}>
                  Bạn chưa có tài khoản? Bấm vào để đăng ký
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </div>
  );
}
