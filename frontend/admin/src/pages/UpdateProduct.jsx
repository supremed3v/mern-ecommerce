import React, { useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import { Header } from "../components";
import { useProductContext } from "../contexts/ProductContext";

const UpdateProduct = () => {
  const { id } = useParams();
  const productId = id;
  const { productState, getProductDetails, updateProduct } =
    useProductContext();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  useEffect(() => {
    if (
      productState.productDetails &&
      productId !== productState.productDetails._id
    ) {
      getProductDetails(productId);
    } else {
      setName(productState.productDetails.name);
      setPrice(productState.productDetails.price);
      setDescription(productState.productDetails.description);
      setCategory(productState.productDetails.category);
      setStock(productState.productDetails.stock);
      setOldImages(productState.productDetails.images);
    }
  }, [productState.productDetails, productId]);

  const updateProductHandler = () => {
    const formData = new FormData();
    formData.set("name", name);
    formData.set("price", price);
    formData.set("description", description);
    formData.set("category", category);
    formData.set("stock", stock);

    images.forEach((image) => {
      formData.append("images", image);
    });
    updateProduct(productId, formData);
  };

  const changeHandler = (e) => {
    const files = Array.from(e.target.files);

    setImagesPreview([]);
    setImages([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="m-2 md:m-10 p2 md:p-10 bg-white rounded-3xl">
      <Header title={"Update Product"} />
      {productState.loading ? (
        <div className="flex justify-center items-center">
          <ThreeDots />
        </div>
      ) : (
        <div>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col w-full md:w-1/2">
              <div className="flex flex-col">
                <label htmlFor="name_field">Name</label>
                <input
                  type="text"
                  id="name_field"
                  className="p-2 border border-gray-300 rounded-md"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <label htmlFor="price_field" className="mt-3">
                  Price
                </label>
                <input
                  type="number"
                  id="price_field"
                  className="p-2 border border-gray-300 rounded-md"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />

                <label htmlFor="description_field" className="mt-3">
                  Description
                </label>
                <textarea
                  className="p-2 border border-gray-300 rounded-md"
                  id="description_field"
                  rows="8"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>

                <label htmlFor="category_field" className="mt-3">
                  Category
                </label>
                <select
                  className="p-2 border border-gray-300 rounded-md"
                  id="category_field"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>

                <label htmlFor="stock_field" className="mt-3">
                  Stock
                </label>
                <input
                  type="number"
                  id="stock_field"
                  className="p-2 border border-gray-300 rounded-md"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />

                <label htmlFor="product_images" className="mt-3">
                  Images
                </label>
                <div className="flex items-center">
                  <input
                    type="file"
                    name="product_images"
                    id="product_images"
                    accept="image/*"
                    multiple
                    onChange={changeHandler}
                  />
                </div>

                <div className="flex items-center justify-center mt-3">
                  {oldImages &&
                    oldImages.map((image) => (
                      <img
                        key={image.public_id}
                        src={image.url}
                        alt={image.public_id}
                        className="mt-3 mr-2 w-20 h-20"
                      />
                    ))}
                </div>

                <div className="flex items-center justify-center mt-3">
                  {imagesPreview.map((image) => (
                    <img
                      key={image}
                      src={image}
                      alt="Images Preview"
                      className="mt-3 mr-2 w-20 h-20"
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={updateProductHandler}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateProduct;
