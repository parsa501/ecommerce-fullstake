import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import Order from "../Models/OrderMd.js";
import Address from "../Models/AddressMd.js";
import DiscountCode from "../Models/DiscountCodeMd.js";
import Cart from "../Models/CartMd.js";
import { checkCode } from "./DiscountCodeCn.js";
import {
  createPayment,
  verifyPayment,
  ZARINPAL,
} from "../Services/ZarinpalService.js";
import ProductVariant from "../Models/ProductVariantMd.js";
import User from "../Models/UserMd.js";
import Product from "../Models/ProductMd.js";

export const getAll = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Order, req.query, req?.role)
    .addManualFilters(
      req.role == "admin" || req.role == "superAdmin"
        ? {}
        : { userId: req.userId }
    )
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate([
      { path: "userId", select: "phoneNumber fullName" },
      { path: "discountCodeId", select: "code discountType value" },
    ]);

  const result = await features.execute();

  return res.status(200).json({
    success: true,
    message: "لیست سفارش‌ها با موفقیت دریافت شد",
    result,
  });
});

export const getOne = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Order, req.query, req?.role)
    .addManualFilters(
      req.role == "admin" || req.role == "superAdmin"
        ? { _id: req.params.id }
        : { userId: req.userId, _id: req.params.id }
    )
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate([
      { path: "userId", select: "phoneNumber fullName" },
      { path: "discountCodeId", select: "code discountType value" },
    ]);

  const result = await features.execute();

  return res.status(200).json({
    success: true,
    message: "سفارش با موفقیت دریافت شد",
    result,
  });
});

export const update = catchAsync(async (req, res, next) => {
  const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!order) {
    return next(new HandleERROR("سفارشی با این شناسه یافت نشد", 404));
  }
  return res.status(200).json({
    success: true,
    message: "سفارش با موفقیت به‌روزرسانی شد",
    data: order,
  });
});

export const payment = catchAsync(async (req, res, next) => {
  const { code = null, addressId = null } = req.body;
  if (!addressId) {
    return next(new HandleERROR("شناسه آدرس الزامی است", 400));
  }

  const address = await Address.findById(addressId);
  if (!address || address.userId.toString() != req.userId.toString()) {
    return next(
      new HandleERROR("آدرسی با این شناسه یافت نشد یا متعلق به شما نیست", 404)
    );
  }

  const cart = await Cart.findOne({ userId: req.userId }).populate([
    { path: "items.productId", select: "title images" },
    { path: "items.productVariantId", populate: { path: "variantId" } },
    { path: "items.categoryId", select: "title" },
  ]);

  if (cart?.items.length === 0 || cart?.totalPriceAfterDiscount <= 0) {
    return next(new HandleERROR("سبد خرید شما خالی است", 400));
  }

  let discount;
  if (code) {
    discount = await DiscountCode.findOne({ code });
    if (!discount) {
      return next(new HandleERROR("کد تخفیف وارد شده معتبر نیست", 404));
    }
    const checkDiscount = checkCode(
      discount,
      cart?.totalPriceAfterDiscount,
      req?.userId
    );
    if (!checkDiscount.success) {
      return next(new HandleERROR(checkDiscount.message, 400));
    }
  }

  let newTotalPrice = 0;
  let newTotalPriceAfterDiscount = 0;
  let changeQuantity = false;

  const newCart = [];

  for (const item of cart.items) {
    const pv = item.productVariantId || {};
    const availableQty = Number(pv.quantity ?? 0);
    const price = Number(pv.price ?? item.price ?? 0);
    const priceAfterDiscount = Number(
      pv.priceAfterDiscount ?? item.priceAfterDiscount ?? price
    );

    let qty = Number(item.cartQuantity ?? 0);
    if (qty > availableQty) {
      changeQuantity = true;
      qty = availableQty;
    }

    if (qty <= 0) {
      continue;
    }

    const normalizedItem = {
      ...item.toObject?.(),
      cartQuantity: qty,
      productVariantId: pv,
      price,
      priceAfterDiscount,
    };

    newCart.push(normalizedItem);

    newTotalPrice += qty * price;
    newTotalPriceAfterDiscount += qty * priceAfterDiscount;
  }

  if (
    changeQuantity ||
    newTotalPriceAfterDiscount !== cart.totalPriceAfterDiscount ||
    newTotalPrice !== cart.totalPrice
  ) {
    cart.totalPrice = newTotalPrice;
    cart.totalPriceAfterDiscount = newTotalPriceAfterDiscount;
    cart.items = newCart;
    const updatedCart = await cart.save();
    return res.status(400).json({
      success: false,
      message: "موجودی برخی از کالاها تغییر کرده است. لطفاً بررسی کنید.",
      data: updatedCart,
    });
  }

  let paymentPrice = !discount
    ? newTotalPriceAfterDiscount
    : discount.discountType == "amount"
    ? newTotalPriceAfterDiscount - discount.value
    : newTotalPriceAfterDiscount * (1 - discount.value / 100);

  const order = await Order.create({
    userId: req.userId,
    items: newCart,
    status: "pending",
    totalPrice: newTotalPrice,
    totalPriceAfterDiscount: paymentPrice,
    address,
    discountCodeId: discount ? discount._id : null,
  });

  const paymentBankRequest = await createPayment(
    paymentPrice,
    "پرداخت سفارش از فروشگاه اینترنتی",
    order._id
  );

  if (paymentBankRequest?.data?.code != 100) {
    await Order.findByIdAndDelete(order._id);
    return next(new HandleERROR("در ایجاد پرداخت خطایی رخ داده است", 400));
  }

  order.authority = paymentBankRequest?.data?.authority;
  await order.save();

  for (let item of order.items) {
    await ProductVariant.findByIdAndUpdate(item?.productVariantId._id, {
      $inc: { quantity: -item.cartQuantity },
    });
    await Product.findByIdAndUpdate(item?.productId._id, {
      $inc: { userBoughtCount: 1 },
    });
    await User.findByIdAndUpdate(req.userId, {
      $push: { boughtProducts: item?.productId._id },
    });
  }

  if (discount) {
    discount.userIdsUsed.push(req.userId);
    await discount.save();
  }

  cart.items = [];
  cart.totalPrice = 0;
  cart.totalPriceAfterDiscount = 0;
  await cart.save();

  return res.status(200).json({
    success: true,
    message: "پرداخت با موفقیت ایجاد شد. در حال انتقال به درگاه پرداخت...",
    data: {
      paymentUrl: ZARINPAL.GATEWAY + paymentBankRequest?.data?.authority,
      orderId: order._id,
    },
  });
});

export const callBackPayment = catchAsync(async (req, res, next) => {
  const { orderId } = req.query;
  const order = await Order.findById(orderId);
  const verifyBankPayment = await verifyPayment(
    order.totalPriceAfterDiscount,
    order?.authority
  );

  if (verifyBankPayment?.data?.code != 100) {
    order.status = "failed";
    for (let item of order.items) {
      await ProductVariant.findByIdAndUpdate(item?.productVariantId._id, {
        $inc: { quantity: item.cartQuantity },
      });
      await Product.findByIdAndUpdate(item?.productId._id, {
        $inc: { userBoughtCount: -1 },
      });
      await User.findByIdAndUpdate(req.userId, {
        $pull: { boughtProducts: item?.productId._id },
      });
    }
    if (order?.discountCodeId) {
      await DiscountCode.findByIdAndUpdate(order.discountCodeId, {
        $pull: { userIdsUsed: order.userId },
      });
    }
    await order.save();
    return res.redirect("https://example.com/payment/failed");
  }

  order.status = "success";
  order.refId = verifyBankPayment?.data?.ref_id;
  await order.save();
  return res.redirect("https://example.com/payment/success");
});

export const orderCron = async () => {
  try {
    const orders = await Order.find({
      $and: [
        { status: "pending" },
        { createdAt: { $lt: Date.now() - 15 * 60 * 1000 } },
        { createdAt: { $gt: Date.now() - 60 * 60 * 1000 } },
      ],
    });
    for (let order of orders) {
      order.status = "failed";
      for (let item of order.items) {
        await ProductVariant.findByIdAndUpdate(item?.productVariantId._id, {
          $inc: { quantity: item.cartQuantity },
        });
        await Product.findByIdAndUpdate(item?.productId._id, {
          $inc: { userBoughtCount: -1 },
        });
        await User.findByIdAndUpdate(order.userId, {
          $pull: { boughtProducts: item?.productId._id },
        });
      }
      if (order?.discountCodeId) {
        await DiscountCode.findByIdAndUpdate(order.discountCodeId, {
          $pull: { userIdsUsed: order.userId },
        });
      }
      await order.save();
    }
  } catch (error) {
    console.log(error);
  }
};
