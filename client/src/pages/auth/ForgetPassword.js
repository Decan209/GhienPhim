import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";
import { forgotPassword } from "@/services/auth.service";
import { ToastContainer, toast } from "react-toastify";

const ForgetPassword = () => {
  const [valueOnChange, setValueOnChange] = useState("");
  return (
    <>
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Please enter your email")
            .required("Please fill email field"),
        })}
        validate={(Change) => {
          setValueOnChange(Change);
        }}
        onSubmit={(user) => {
          forgotPassword(user).then(res=>toast.success(res.data.message)).catch(err=>toast.error(err.response.data.message))
        }}
      >
        <div className="text-gray-900 h-screen max-sm:bg-white">
          <ToastContainer/>
          <Link href={"/"} className="flex justify-end">
            <div className="text-2xl font-bold w-6 h-6 bg-white relative top-6 right-6">
              <AiOutlineClose/>
            </div>
          </Link>
          <Form className="w-1/2 pt-8 mx-auto p-8 bg-white relative top-24 rounded-xl max-sm:w-full">
            <div className="text-center font-semibold text-2xl mb-4 text-gray-900 py-4">
              FORGET PASSWORD
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
            <div className="px-4">
              <button
                className="bg-gray-900 text-white w-full mx-auto my-4 py-2 rounded-2xl font-semibold"
                type="submit"
              >
                Quên Mật Khẩu
              </button>
              <Link href={"/auth/Login"} className="text-center font-semibold">
                Đăng Nhập
              </Link>
            </div>
          </Form>
        </div>
      </Formik>
    </>
  );
};

export default ForgetPassword;
