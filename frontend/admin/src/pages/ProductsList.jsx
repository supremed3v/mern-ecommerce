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

const ProductsList = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    images: [],
    stock: 1,
  });
  const editOptions = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
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
      height: "50%",
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
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="text-gray-800">
                Name
              </label>
              <input
                id="email-address"
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
              <label htmlFor="password" className="sr-only">
                Description
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Password"
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                value={formData.description}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <br />
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <HiLockClosed
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
              </span>
              Sign in
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
    </div>
  );
};

export default ProductsList;
