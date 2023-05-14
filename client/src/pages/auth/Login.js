"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import Image from "next/image";

const Login = () => {
  const [valueOnChange, setValueOnChange] = useState("");
  const router = useRouter();

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Please enter your email")
            .required("Please fill email field"),
          password: Yup.string().required("Please fill PassWord field"),
        })}
        validate={(Change) => {
          setValueOnChange(Change);
        }}
        onSubmit={async (user) => {
          const result = await signIn("credentials", {
            ...user,
            redirect: false,
            // callbackUrl: "/",
          });
          if (result.error) {
            return toast.error(result.error);
          }
          router.push("/");
        }}
      >
        <div className="text-gray-900 h-screen max-sm:bg-white">
          <ToastContainer />
          <Link href={"/"} className="flex justify-end">
            <div className="text-2xl font-bold w-6 h-6 bg-white relative top-6 right-6">
              <AiOutlineClose />
            </div>
          </Link>
          <Form className="w-1/2 pt-8 mx-auto p-8 bg-white relative top-14 rounded-xl max-sm:w-full">
            <div className="text-center font-semibold text-2xl mb-4 text-gray-900">
              SIGN IN
            </div>
            <div className="input-container">
              <label className={valueOnChange?.email ? "label" : "labels"}>
                Email
              </label>
              <Field
                id="email"
                name="email"
                type="text"
                className=" w-full border-2 pt-4 pl-2 pb-1 inputAcc text-gray-900"
              />
              <ErrorMessage
                name="email"
                render={(msg) => <div className="errMessage">{msg}</div>}
              />
            </div>
            <div className="input-container">
              <label className={valueOnChange?.password ? "label" : "labels"}>
                Password
              </label>
              <Field
                id="password"
                type="password"
                name="password"
                className="w-full border-2 pt-4 pl-2 pb-1 inputAcc text-gray-900"
              />
              <ErrorMessage
                name="password"
                render={(msg) => <div className="errMessage">{msg}</div>}
              />
            </div>
            <div className="px-4">
              <button
                className="bg-gray-900 text-white w-full mx-auto my-4 py-2 rounded-2xl font-semibold"
                type="submit"
              >
                Đăng Nhập
              </button>
              <div className="flex justify-between">
                <Link
                  href={"/auth/Register"}
                  className="text-center font-semibold cursor-pointer"
                >
                  Tạo tài khoản
                </Link>
                <Link
                  href={"/auth/ForgetPassword"}
                  className="text-center font-semibold cursor-pointer"
                >
                  Quên mật khẩu
                </Link>
              </div>
              <div className="text-center font-semibold">
                ---------- Hoặc ----------
              </div>
              <div className="flex justify-center py-3">
                <Image
                  width={100}
                  height={100}
                  onClick={() => signIn("facebook", { callbackUrl: "/" })}
                  src="https://www.facebook.com/images/fb_icon_325x325.png"
                  alt=""
                  className="w-10 cursor-pointer mr-2"
                />
                <Image
                  width={100}
                  height={100}
                  onClick={() => signIn("google", { callbackUrl: "/" })}
                  src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"
                  alt=""
                  className="w-10 cursor-pointer ml-2"
                />
              </div>
            </div>
          </Form>
        </div>
      </Formik>
    </>
  );
};

export default Login;
