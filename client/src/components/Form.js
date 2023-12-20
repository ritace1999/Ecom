import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import styles from "../styles/form.module.css";
import { HiEnvelope, HiFingerPrint, HiUser } from "react-icons/hi2";
import { updateUserProfile } from "@/services/apiServices";

const Form = ({ data }) => {
  const [show, setShow] = useState({ oldPassword: false, newPassword: false });
  console.log(data);
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      oldPassword: "",
      newPassword: "",
    },

    onSubmit: async (values, data) => {
      console.log(values);
      await updateUserProfile(
        JSON.parse(localStorage.getItem("account")),
        values
      )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });
  useEffect(() => {
    // Populate the form with profile data if it's available and loading has completed
    if (data) {
      formik.setValues({
        fullName: data?.user?.fullName || "",
        email: data?.user?.email || "",
        oldPassword: null,
        newPassword: "",
      });
    }
  }, [data]);
  return (
    <div className="flex h-[80vh]">
      <div className="md:mt-[4px] mx-auto shadow-2xl shadow-blue-500/60 bg-slate-50  rounded-md w-[75%] md:w-[78%] lg:w-[45%]  md:h-[85%] ">
        <div>
          <div className="text-center mt-20">
            <section className="w-[90%] mx-auto flex flex-col gap-2 md:w-[65%] lg:w-[50%]">
              <form
                className="flex flex-col gap-4 container"
                onSubmit={formik.handleSubmit}
              >
                <div className={`${styles.input_group} `}>
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

                <div className={`${styles.input_group} `}>
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

                <div className={`${styles.input_group} `}>
                  <input
                    type={`${show.oldPassword ? "text" : "password"}`}
                    name="oldPassword"
                    placeholder="Old Password"
                    className={styles.input_text}
                    {...formik.getFieldProps("oldPassword")}
                  />
                  <span
                    onClick={() =>
                      setShow({ ...show, oldPassword: !show.oldPassword })
                    }
                    className="icon flex items-center px-4 cursor-pointer	"
                  >
                    <HiFingerPrint size={20} />
                  </span>
                </div>

                <div className={`${styles.input_group} `}>
                  <input
                    type={`${show.newPassword ? "text" : "password"}`}
                    name="newPassword"
                    placeholder="New Password"
                    className={styles.input_text}
                    {...formik.getFieldProps("newPassword")}
                  />
                  <span
                    onClick={() =>
                      setShow({ ...show, newPassword: !show.newPassword })
                    }
                    className="icon flex items-center px-4 cursor-pointer	"
                  >
                    <HiFingerPrint size={20} />
                  </span>
                </div>

                <div className="input_button">
                  <button className={styles.button} type="submit">
                    {"Update"}
                  </button>
                </div>
              </form>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
