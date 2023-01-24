import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";
import PreviewImage from "./PreviewImage";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import "../product.css";
import LoadingPage from "../LoadingPage";
import { useNavigate } from "react-router-dom";
function Product() {
  const [product, setProduct] = useState("");
  const [popupShow, setPopupShow] = useState(false);
  const [reload, setLoad] = useState([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const loadData = async () => {
    await fetch(`https://6301d5f39a1035c7f807c7e5.mockapi.io/Products`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((result) => {
        setProduct(result);
        console.log(product);
      });
  };
  const deleteProduct = async (n) => {
    if (window.confirm("Press OK to confirm")) {
      toast.success("Data deleted successfully");
      await fetch(`https://6301d5f39a1035c7f807c7e5.mockapi.io/Products/${n}`, {
        method: "DELETE",
      });
      setLoad(["1"]);
    } else {
      toast.error("Data not deleted");
    }
  };
  const handleClose = () => {
    setPopupShow(false);
  };
  async function editData(n) {
    setId(n.id);
    setName(n.name);
    setImage(n.image);
  }
  useEffect(() => {
    loadData();
  }, [reload]);

  return (
    <div className="container">
      <Modal
        className="p-5"
        show={popupShow}
        onHide={handleClose}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Update product data
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="dashboardPopupForm">
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image url</Form.Label>
              <Form.Control
                type="text"
                placeholder="Roll.No"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <PreviewImage
                className={{ margin: "auto" }}
                width={100}
                height={100}
                file={image}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          <Button
            variant="primary"
            onClick={() => {
              fetch(
                `https://6301d5f39a1035c7f807c7e5.mockapi.io/Products/${id}`,
                {
                  method: "PUT",
                  body: JSON.stringify({
                    name,
                    image,
                  }),
                  headers: { "Content-Type": "application/json" },
                }
              )
                .then((data) => data.json())
                .then((data) => console.log(data));
              handleClose();
              reload.push("");
              toast.success("Product updated");
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <div>
        {product !== "" ? (
          <div className="m-5 laptop-products ">
            {product.map((e) => {
              return (
                <div className="single-products">
                  <img src={e.image} alt={e.name} className="product-image" />
                  <div className="three-views">
                    <h4>{e.name}</h4>
                    <DeleteIcon
                      onClick={() => {
                        deleteProduct(e.id);
                      }}
                    />
                    <ModeEditIcon
                      onClick={() => {
                        setPopupShow(true);
                        editData(e);
                      }}
                    />
                  </div>
                </div>
              );
            })}
            <Button className=" back-but" onClick={() => navigate("/")}>
              Back
            </Button>
          </div>
        ) : (
          <LoadingPage />
        )}
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
    </div>
  );
}

export default Product;
