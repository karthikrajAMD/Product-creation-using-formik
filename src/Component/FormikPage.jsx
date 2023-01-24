import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import PreviewImage from "./PreviewImage";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Button from "react-bootstrap/Button";
function FormikPage() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      image: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required Product name"),
      image: Yup.string().required("Required Image url"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  const add = async () => {
    console.log(formik);
    if (formik.values.name !== "" && formik.values.image !== "") {
      console.log(formik.values.name, formik.values.image);
      await fetch(`https://6301d5f39a1035c7f807c7e5.mockapi.io/Products`, {
        method: "POST",
        body: JSON.stringify({
          name: formik.values.name,
          image: formik.values.image,
        }),
        headers: { "Content-Type": "application/json" },
      });
      toast.success("Product added");
      // setTimeout(() => {
      //   navigate("/");
      // }, 2000);
    } else {
      toast.error("Error in adding");
    }
  };
  return (
    <>
      <div className="product-add-form">
        <form onSubmit={formik.handleSubmit} className="product-form">
          <label htmlFor="name">Product Name</label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="mb-3" style={{ color: "red" }}>
              {formik.errors.name}
            </div>
          ) : null}

          <label htmlFor="image">Image url</label>
          <input
            id="image"
            name="image" //NAME field not required in this case as image is set through onChange
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.image}
          />
          {formik.touched.image && formik.errors.image ? (
            <div className="mb-3" style={{ color: "red" }}>
              {formik.errors.image}
            </div>
          ) : null}

          {formik.values.image ? (
            <PreviewImage
              className={{ margin: "auto" }}
              width={100}
              height={100}
              file={formik.values.image}
            />
          ) : null}
          <div>
            <Button
              type="submit"
              className="mt-3"
              style={{ width: "30%" }}
              onClick={() => {
                add();
              }}
            >
              Submit
            </Button>
          </div>
        </form>
        <div className="but-product">
          <Button
            onClick={() => {
              navigate("/");
            }}
          >
            Back
          </Button>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default FormikPage;
