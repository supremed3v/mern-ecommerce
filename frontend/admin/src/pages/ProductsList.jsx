import React, { useEffect, useState } from "react";
import { useProductContext } from "../contexts/ProductContext";
import { Header } from "../components";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Resize,
  Sort,
  ContextMenu,
  Filter,
  Page,
  ExcelExport,
  PdfExport,
  Edit,
  Inject,
  Toolbar,
} from "@syncfusion/ej2-react-grids";
import { productsGrid } from "../data/dummy";
import Modal from "react-modal";

import { HiLockClosed } from "react-icons/hi";
import { ThreeDots } from "react-loader-spinner";

const ProductsList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    description: "",
    category: "",
    images: [],
    stock: 1,
  });
  const [imagesPreview, setImagesPreview] = useState([]);
  const editOptions = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
  };
  const createProductImage = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setFormData((oldData) => ({
            ...oldData,
            images: [...oldData.images, reader.result],
          }));
        }
      };
      reader.readAsDataURL(file);
    });
  };
  const toolbarOptions = ["Delete", "Update", "Cancel"];
  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "50%",
      height: "70%",
    },
  };

  const { productState, getAdminProducts } = useProductContext();
  useEffect(() => {
    getAdminProducts();
  }, []);

  const toolbarClick = (args) => {
    if (args.item.text === "Delete") {
      console.log("Added");
    }
    if (args.item.text === "PDF Export") {
      gridInstance.pdfExport();
    }
  };

  return (
    <div className="m-2 md:m-10 p2 md:p-10 bg-white rounded-3xl">
      <Header title="Products" category="Page" />
      {productState.loading ? (
        <div className="flex justify-center items-center">
          <ThreeDots />
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <div className="text-lg font-bold">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
                onClick={handleOpenModal}
              >
                Add Product
              </button>
            </div>
          </div>

          <Modal
            isOpen={isModalOpen}
            onRequestClose={handleModalClose}
            style={customStyles}
          >
            <div className="mt-8 space-y-6">
              <Header title="Add Product" />
              <div className="-space-y-px rounded-md shadow-sm">
                <div>
                  <label htmlFor="name" className="text-gray-800">
                    Name
                  </label>
                  <input
                    id="name"
                    name="Name"
                    type="text"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Email address"
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    value={formData.name}
                  />
                </div>
                <div>
                  <label htmlFor="description" className="text-gray-800">
                    Description
                  </label>
                  <input
                    id="description"
                    name="description"
                    type="text"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Password"
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    value={formData.description}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="order-first">
                    <label htmlFor="price" className="text-gray-800">
                      Price
                    </label>
                    <input
                      id="price"
                      name="price"
                      type="number"
                      required
                      className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="Password"
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      value={formData.price}
                    />
                  </div>
                  <div className="order-last">
                    <label htmlFor="stock" className="text-gray-800">
                      Stock
                    </label>
                    <input
                      id="stock"
                      name="stock"
                      type="number"
                      required
                      className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="Password"
                      onChange={(e) =>
                        setFormData({ ...formData, stock: e.target.value })
                      }
                      value={formData.stock}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="images" className="text-gray-800">
                    Images
                  </label>
                  <input
                    id="images"
                    name="images"
                    type="file"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Password"
                    onChange={createProductImage}
                    multiple
                    accept="image/*"
                  />
                </div>
                {/* Image Preview */}
                <div className="grid grid-cols-2 gap-4">
                  {imagesPreview.map((image, index) => (
                    <div key={index}>
                      <img
                        src={image}
                        alt="product"
                        className="w-32 h-32 object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <button
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  disabled={
                    formData.name === "" ||
                    formData.description === "" ||
                    formData.price === 0 ||
                    formData.stock < 0
                  }
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <HiLockClosed
                      className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                      aria-hidden="true"
                    />
                  </span>
                  Add Product
                </button>
              </div>
            </div>
          </Modal>

          <GridComponent
            id="gridcomp"
            dataSource={productState.adminProducts}
            allowPaging
            allowSorting
            editSettings={editOptions}
            toolbar={toolbarOptions}
            toolbarClick={toolbarClick}
          >
            <ColumnsDirective>
              {productsGrid.map((item) => (
                <ColumnDirective key={item._id} {...item} />
              ))}
            </ColumnsDirective>
            <Inject
              services={[
                Resize,
                Sort,
                ContextMenu,
                Filter,
                Page,
                ExcelExport,
                PdfExport,
                Edit,
                Toolbar,
              ]}
            />
          </GridComponent>
        </>
      )}
    </div>
  );
};

export default ProductsList;
