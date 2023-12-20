import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import toast from "react-hot-toast";
import Head from "next/head";
import Layout from "@/layout/authLayout";
import Link from "next/link";
import styles from "@/styles/form.module.css";
import { HiEnvelope, HiFingerPrint, HiUser } from "react-icons/hi2";
import { useFormik } from "formik";
import { registerValidate } from "@/lib/authValidation";
function Register() {
  const router = useRouter();
  const [show, setShow] = useState({ password: false, cpassword: false });
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      cpassword: "",
    },
    validate: registerValidate,
    onSubmit,
  });
  async function onSubmit(value) {
    const { cpassword, ...formFields } = value;
    // const requestOptions = {
    //   body: JSON.stringify(formFields),
    // };
    axios
      .post("http://localhost:4000/register", value)
      .then((res) => {
        router.push("/login");
        toast.success(res?.data?.msg);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.msg);
      });
  }

  return (
    //  {/*Title*/}
    <Layout className=" container">
      <Head>
        <title>Register</title>
      </Head>
      <section className="w-3/4 mx-auto flex flex-col gap-5">
        <div className="title">
          <h1 className="text-grey-800 text-4xl font bold py-4">
            Register Here
          </h1>
        </div>
        {/* form*/}
        <form
          className="flex flex-col gap-5 container"
          onSubmit={formik.handleSubmit}
        >
          <div
            className={`${styles.input_group} ${
              formik.errors.fullName && formik.touched.fullName
                ? "border-rose-500"
                : ""
            }`}
          >
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              className={styles.input_text}
              {...formik.getFieldProps("fullName")}
            />
            <span className="icon flex items-center px-4">
              <HiUser size={20} />
            </span>
          </div>
          {/* {formik.errors.fullName &&formik.touched.fullName?<span className='text-rose-500'>{formik.errors.fullName}</span>: <></>} */}
          <div
            className={`${styles.input_group} ${
              formik.errors.email && formik.touched.email
                ? "border-rose-500"
                : ""
            }`}
          >
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={styles.input_text}
              {...formik.getFieldProps("email")}
            />
            <span className="icon flex items-center px-4">
              <HiEnvelope size={20} />
            </span>
          </div>
          {/* {formik.errors.email &&formik.touched.email?<span className=" text-rose-500">{formik.errors.email}</span>: <></>} */}

          <div
            className={`${styles.input_group} ${
              formik.errors.password && formik.touched.password
                ? "border-rose-500"
                : ""
            }`}
          >
            <input
              type={`${show.password ? "text" : "password"}`}
              name="password"
              placeholder="Password"
              className={styles.input_text}
              {...formik.getFieldProps("password")}
            />
            <span
              onClick={() => setShow({ ...show, password: !show.password })}
              className="icon flex items-center px-4 cursor-pointer	"
            >
              <HiFingerPrint size={20} />
            </span>
          </div>
          {/* {formik.errors.password &&formik.touched.password?<span className='text-rose-500'>{formik.errors.password}</span>: <></>} */}
          <div
            className={`${styles.input_group} ${
              formik.errors.cpassword && formik.touched.cpassword
                ? "border-rose-500"
                : ""
            }`}
          >
            <input
              type={`${show.cpassword ? "text" : "password"}`}
              name="cpassword"
              placeholder="Confirm Password"
              className={styles.input_text}
              {...formik.getFieldProps("cpassword")}
            />
            <span
              onClick={() => setShow({ ...show, cpassword: !show.cpassword })}
              className="icon flex items-center px-4 cursor-pointer	"
            >
              <HiFingerPrint size={20} />
            </span>
          </div>
          {/* {formik.errors.cpassword &&formik.touched.cpassword?<span className='text-rose-500'>{formik.errors.cpassword}</span>: <></>} */}
          <div className="input_button">
            <button className={styles.button} type="submit">
              Register
            </button>
          </div>
        </form>
        {/* bottom*/}
        <p className="text-center text-gray-400">
          Already have an account?
          <Link className="text-blue-500 hover:text-blue-700" href={"/login"}>
            Login Here.
          </Link>
        </p>
      </section>
    </Layout>
  );
}

export default Register;
