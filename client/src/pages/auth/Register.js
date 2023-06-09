import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";
import { registerService } from "@/services/auth.service";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";

const Register = () => {
  const [valueOnChange, setValueOnChange] = useState("");
  const router = useRouter();

  // const { mutate, isLoading, isSuccess, data } = useMutation(registerService, {
  //   onError: (error) => toast.error(error.response.data.message),
  // });
  // if (isSuccess) {
  //   toast.success("Tạo tài khoản thành công");
  //   router.push("/auth/Login");
  // }

  return (
    <>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          mobile: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Please enter your email")
            .required("Please fill email field"),
          name: Yup.string().required("Please fill Name field"),
          password: Yup.string().required("Please fill PassWord field"),
          mobile: Yup.string().required("Please fill PassWord field"),
        })}
        validate={(Change) => {
          setValueOnChange(Change);
        }}
        onSubmit={(user) => {
          registerService(user)
            .then((res) => {
              if (res.data.status === "ok") {
                toast.success("Tạo tài khoản thành công");
                router.push("/auth/Login");
              }
            })
            .catch((err) => toast.error(err.response.data.message));
          // mutate(user);
        }}
      >
        <div className=" text-gray-900 h-screen max-sm:bg-white">
          <ToastContainer />
          <Link href={"/"} className="flex justify-end">
            <div className="text-2xl font-bold w-6 h-6 bg-white relative top-6 right-6">
              <AiOutlineClose />
            </div>
          </Link>
          <Form className="w-1/2  py-3 mx-auto px-8 bg-white relative top-6 rounded-xl mb-4 max-sm:w-full">
            <div className="text-center font-semibold py-4 text-2xl text-gray-900">
              REGISTER
            </div>
            <div className="input-container">
              <label className={valueOnChange?.name ? "label" : "labels"}>
                Name
              </label>
              <Field
                id="name"
                name="name"
                type="text"
                className=" w-full border-2 pt-4 pl-2 pb-1 inputAcc text-gray-900"
              />
              <ErrorMessage
                name="name"
                render={(msg) => <div className="errMessage">{msg}</div>}
              />
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
            <div className="input-container">
              <label className={valueOnChange?.password ? "label" : "labels"}>
                Mobile
              </label>
              <Field
                id="mobile"
                type="mobile"
                name="mobile"
                className="w-full border-2 pt-4 pl-2 pb-1 inputAcc text-gray-900"
              />
              <ErrorMessage
                name="mobile"
                render={(msg) => <div className="errMessage">{msg}</div>}
              />
            </div>
            <div className="px-4">
              <button
                className="bg-gray-900 text-white w-full mx-auto my-4 py-2 rounded-2xl font-semibold"
                type="submit"
              >
                Tạo tài khoản
              </button>
              <div className="flex justify-center">
                <Link
                  href={"/auth/Login"}
                  className="text-center font-semibold cursor-pointer"
                >
                  Đăng nhập
                </Link>
              </div>
            </div>
          </Form>
        </div>
      </Formik>
    </>
  );
};

export default Register;
