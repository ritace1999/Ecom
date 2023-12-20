import React, { useState } from "react";
import Head from "next/head";
import Layout from "@/layout/authLayout";
import Link from "next/link";
import styles from "@/styles/form.module.css";
import { HiEnvelope, HiFingerPrint } from "react-icons/hi2";
import { useFormik } from "formik";
import { loginValidate } from "@/lib/authValidation";
import axios from "axios";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
function Login() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: loginValidate,
    onSubmit,
  });
  async function onSubmit(value) {
    axios
      .post("http://localhost:4000/login", value)
      .then((res) => {
        console.log(res?.data?.token);
        localStorage.setItem("account", JSON.stringify(res?.data?.token));
        router.push("/");
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
        <title>Login</title>
      </Head>
      <section className="w-3/4 mx-auto flex flex-col gap-10">
        <div className="title">
          <h1 className="text-grey-800 text-4xl font bold py-4">Login Here</h1>
        </div>
        {/* form*/}
        <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
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
              {" "}
              <HiEnvelope size={20} />
            </span>
          </div>

          <div
            className={`${styles.input_group} ${
              formik.errors.password && formik.touched.password
                ? "border-rose-500"
                : ""
            }`}
          >
            <input
              type={`${show ? "text" : "password"}`}
              name="password"
              placeholder="Password"
              className={styles.input_text}
              {...formik.getFieldProps("password")}
            />
            <span
              onClick={() => setShow(!show)}
              className="icon flex items-center px-4 cursor-pointer	"
            >
              {" "}
              <HiFingerPrint size={20} />
            </span>
          </div>
          <div className="input_button">
            <button className={styles.button} type="submit">
              Login
            </button>
          </div>
        </form>
        {/* bottom*/}
        <p className="text-center text-gray-400">
          Don't have an account yet?{" "}
          <Link
            className="text-blue-500 hover:text-blue-700"
            href={"/register"}
          >
            {" "}
            Register Here.{" "}
          </Link>
        </p>
      </section>
    </Layout>
  );
}

export default Login;
