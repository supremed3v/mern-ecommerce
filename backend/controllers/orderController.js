import Order from "../models/Order.Model.js";
import Product from "../models/Product.Model.js";

// @desc    Create new order

// @route   POST /api/v1/order/new

const newOrder = async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
  } = req.body;

  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
};

// @desc    Get single order

// @route   GET /api/v1/order/:id

const getSingleOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new Error("No order found with this ID", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
};

// @desc    Get logged in user orders

// @route   GET /api/v1/orders/me

const myOrders = async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id });

  res.status(200).json({
    success: true,
    orders,
  });
};

// @desc    Get all orders - ADMIN

// @route   GET /api/v1/admin/orders

const allOrders = async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
};

// @desc    Update / Process order - ADMIN

// @route   PUT /api/v1/admin/order/:id

const updateOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (order.orderStatus === "Delivered") {
    return next(new Error("You have already delivered this order", 400));
  }

  if (order.orderStatus === "Processing") {
    return next(new Error("You have already processed this order", 400));
  }

  if (order.orderStatus === "Shipped") {
    order.orderItems.forEach(async (item) => {
      await updateStock(item.product, item.quantity);
    });
  }

  order.orderStatus = req.body.status;
  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });

  async function updateStock(id, quantity) {
    const products = await Product.findById(id);

    products.stock -= quantity;

    await products.save({ validateBeforeSave: false });
  }
};

// @desc    Delete order

// @route   DELETE /api/v1/admin/order/:id

const deleteOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found",
    });
  }

  await order.remove();

  res.status(200).json({
    success: true,
  });
};

export {
  newOrder,
  getSingleOrder,
  myOrders,
  allOrders,
  updateOrder,
  deleteOrder,
};
