import { Order, OrderDetailItem, OrderSheet } from "../models/order.model";
import { httpClient, requestHandler } from "./http";

//중복되는 요청 부분을 requestHandler로 처리한다
export const order = async (orderData: OrderSheet) => {
  return await requestHandler("post", "/orders", orderData);
};

export const fetchOrders = async () => {
  const response = await httpClient.get<Order[]>("/orders");

  return response.data;
};

export const fetchOrder = async (orderId: number) => {
  const response = await httpClient.get<OrderDetailItem[]>(
    `/orders/${orderId}`
  );

  return response.data;
};
