import axios from "axios";
import type { BaseProduct } from "../types";
import { z } from "zod";

const productSchema = z.object({
  _id: z.string(),
  title: z.string(),
  price: z.number(),
  quantity: z.number(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  __v: z.number().optional(),
});

const cartItemSchema = z.object({
  _id: z.string(),
  productId: z.string(),
  title: z.string(),
  price: z.number(),
  quantity: z.number(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  __v: z.number().optional(),
});

export const getProducts = async () => {
  const { data } = await axios.get("/api/products");
  return z.array(productSchema).parse(data);
};

export const getCartItems = async () => {
  const { data } = await axios.get("/api/cart");
  return z.array(cartItemSchema).parse(data);
};

export const addProduct = async (newProduct: BaseProduct) => {
  const { data } = await axios.post("/api/products", { ...newProduct });
  return productSchema.parse(data);
};

export const updateProduct = async (
  updatedProduct: BaseProduct,
  productId: string
) => {
  const { data } = await axios.put(`/api/products/${productId}`, {
    ...updatedProduct,
  });
  return productSchema.parse(data);
};

export const deleteProduct = async (productId: string) => {
  await axios.delete(`/api/products/${productId}`);
  return null;
};

export const checkout = async () => {
  await axios.post("/api/checkout");
  return null;
};
