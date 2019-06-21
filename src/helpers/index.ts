import equal from "deep-equal";
import groupby from "lodash.groupby";
import { Order, sortOrderType, StringTMap, OrderType } from "../model";
import orderData from "../db/orders.json";
import * as fileOps from "./fileOps";
import { OrderTypes } from "../constants";

export const getAllOrdersJSON = (): string =>
  JSON.stringify(fileOps.readJsonFile());

export const registerOrder = async (newOrder: Order): Promise<any> => {
  const oldOrders = await fileOps.readJsonFileAsync();
  const updatedOrderWithNewOrder = [...oldOrders,newOrder];  
  return await fileOps.writeJsonFileAsync(
    JSON.stringify(updatedOrderWithNewOrder)
  ); 
};

export const sortObjKeys = (
  inputObjectKeys: string[],
  sortOrder: sortOrderType
): string[] => {
  if (sortOrder === "desc") {
    return inputObjectKeys
      .map(key => parseInt(key, 10))
      .sort((a, b) => b - a)
      .map(key => key.toString());
  }
  return inputObjectKeys
    .map(key => parseInt(key, 10))
    .sort((a, b) => a - b)
    .map(key => key.toString());
};

export const generateOrderInventory = (
  OrdersGrpByOrderType: StringTMap<Order[]>,
  sortType: sortOrderType,
  orderType: OrderType
): string[] =>
  sortObjKeys(Object.keys(OrdersGrpByOrderType), sortType).reduce(
    (acc, curKey) => {
      const totalQunatityPerPrice = OrdersGrpByOrderType[curKey]
        .map(order => order.quantity)
        .reduce((sumQuantity, curQuantity) => sumQuantity + curQuantity);
      return [
        ...acc,
        `${orderType}:${totalQunatityPerPrice}kg for £${curKey}[${
          OrdersGrpByOrderType[curKey][0].userId
        }]`
      ];
    },
    [] as string[]
  );

export const getOrderSummary = async (): Promise<string[]> => {
  const allOrders: Order[] = await fileOps.readJsonFileAsync();

  const sellOrders = generateOrderInventory(
    groupby(
      allOrders.filter(({ orderType }) => orderType === OrderTypes.SELL),
      "price"
    ),
    "asc",
    OrderTypes.SELL as OrderType
  );

  const BuyOrders = generateOrderInventory(
    groupby(
      allOrders.filter(order => order.orderType === OrderTypes.BUY),
      "price"
    ),
    "desc",
    OrderTypes.BUY as OrderType
  );

  return [...sellOrders, ...BuyOrders];
};

export const cancelOrder = async (orderToDelete: Order): Promise<string> => {
  const allOrders: Order[] = await fileOps.readJsonFileAsync();
  const doesOrderExists = allOrders.findIndex(order =>
    equal(order, orderToDelete)
  );

  if (doesOrderExists !== -1) {
    const updatedOrders = allOrders.filter(
      (order: Order) => !equal(order, orderToDelete)
    );

    await fileOps.writeJsonFileAsync(JSON.stringify(updatedOrders));
    return "Deleted the order";
  }

  return "No Order exists";
};
