import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";
import { changePassword } from "@/services/auth.service";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";

const ChangePassword = () => {
  const router = useRouter();
  const token = router.query
  const [valueOnChange, setValueOnChange] = useState("");
  return (
    <>
      <Formik
        initialValues={{
          newPassword: "",
          confirmPassword: "",
        }}
        validationSchema={Yup.object({
          newPassword: Yup.string().required("Please fill Password field"),
          confirmPassword: Yup.string().required("Please fill Password field"),
        })}
        validate={(Change) => {
          setValueOnChange(Change);
          const errors = {};

          if (Change.newPassword !== Change.confirmPassword) {
            errors.confirmPassword =
              "Mật khẩu mới và mật khẩu nhập lại phải khớp nhau";
          }
          return errors;
        }}
        onSubmit={(info) => {
          const user = {...info,token}
          console.log(user);
          changePassword(user)
            .then((res) => {
              if (res.data.status === "ok") {
                toast.success("Thay đổi mật khẩu thành công");
                router.push("/auth/Login");
              }
            })
            .catch((err) => toast.error(err.response.data.message));
        }}
      >
        <div className="text-gray-900 h-screen max-sm:bg-white">
          <ToastContainer />
          <Link href={"/"} className="flex justify-end">
            <div className="text-2xl font-bold w-6 h-6 bg-white relative top-6 right-6">
              <AiOutlineClose />
            </div>
          </Link>
          <Form className="w-1/2 pt-8 mx-auto p-8 bg-white relative top-24 rounded-xl max-sm:w-full">
            <div className="text-center font-semibold text-2xl mb-4 text-gray-900 py-4">
              Change Password
            </div>
            <div className="input-container">
              <label
                className={valueOnChange?.newPassword ? "label" : "labels"}
              >
                Nhập mật khẩu mới
              </label>
              <Field
                id="newPassword"
                name="newPassword"
                type="password"
                className=" w-full border-2 pt-4 pl-2 pb-1 inputAcc text-gray-900"
              />
              <ErrorMessage
                name="newPassword"
                render={(msg) => <div className="errMessage">{msg}</div>}
              />
            </div>
            <div className="input-container">
              <label
                className={valueOnChange?.confirmPassword ? "label" : "labels"}
              >
                Nhập lại mật khẩu
              </label>
              <Field
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                className=" w-full border-2 pt-4 pl-2 pb-1 inputAcc text-gray-900"
              />
              <ErrorMessage
                name="confirmPassword"
                render={(msg) => <div className="errMessage">{msg}</div>}
              />
            </div>
            <div className="px-4">
              <button
                className="bg-gray-900 text-white w-full mx-auto my-4 py-2 rounded-2xl font-semibold"
                type="submit"
              >
                Thay đổi Mật Khẩu
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

export default ChangePassword;
