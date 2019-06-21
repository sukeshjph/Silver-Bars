import equal from "deep-equal";
import * as helpers from "../../helpers";
import allOrders from "../../db/orders.json";
import { Order, StringTMap } from "../../model";
import * as fileOps from "../../helpers/fileOps";

// jest.mock("../../helpers/fileOps");

describe("Order Registration", () => {
  it("should register a new Order", () => {
    const newOrder = {
      userId: "178906",
      quantity: 5.5,
      price: 300,
      orderType: "SELL"
    } as Order;
    helpers.registerOrder(newOrder);
    expect(
      JSON.parse(helpers.getAllOrdersJSON()).find(order =>
        equal(order, newOrder)
      )
    ).toBeTruthy();
  });
});

describe("Cancel Order", () => {
  it("should cancel a valid order", async () => {
    let allOrders: Order[] = await fileOps.readJsonFileAsync();
    const orderToDelete = allOrders[0];
    const result = await helpers.cancelOrder(orderToDelete);
    expect(result).toBe("Deleted the order");
    allOrders = await fileOps.readJsonFileAsync();
    expect(allOrders.find(order => equal(order, orderToDelete))).toBeFalsy();
  });

  it("invalid order", async () => {
    const result = await helpers.cancelOrder({
      userId: "178906",
      quantity: 55555555,
      price: 999999,
      orderType: "SELL"
    });
    expect(result).toBe("No Order exists");
  });
});

describe("Order Summary", () => {
  let spy;
  beforeAll(() => {
    spy = jest
      .spyOn(helpers, "generateOrderInventory")
      .mockImplementation(() => ["random text"]);
  });
  afterEach(() => {
    spy.mockClear();
    spy.mockRestore();
    spy.mockReset();
    jest.resetAllMocks();
  });
  it("should return combined sell and buy orders", async () => {
    const result = await helpers.getOrderSummary();
    expect(result.length).toBe(2);
    expect(result.every(item => item === "random text")).toBeTruthy();
  });
});

describe("Utilities", () => {
  describe("Order object keys", () => {
    let testObj;

    beforeEach(() => {
      testObj = {
        "200": ["a", "b", "c"],
        "600": ["a", "b", "c"],
        "120": ["a", "b", "c"]
      };
    });

    it("asc", () => {
      const ascSorted = Object.keys(testObj)
        .map(key => parseInt(key, 10))
        .sort((a, b) => a - b)
        .map(key => key.toString());

      expect(helpers.sortObjKeys(Object.keys(testObj), "asc")).toEqual(
        ascSorted
      );
    });

    it("desc", () => {
      const descSorted = Object.keys(testObj)
        .map(key => parseInt(key, 10))
        .sort((a, b) => b - a)
        .map(key => key.toString());

      expect(helpers.sortObjKeys(Object.keys(testObj), "desc")).toEqual(
        descSorted
      );
    });
  });

  describe("Order Inventory generation", () => {
    it("should return correct order inventory", () => {
      const grpedSellOrdersByPrice = {
        "200": [
          { userId: "1567890", quantity: 2.5, price: 200, orderType: "SELL" }
        ],
        "300": [
          { userId: "166666", quantity: 8.9, price: 300, orderType: "SELL" },
          { userId: "178906", quantity: 5.5, price: 300, orderType: "SELL" },
          { userId: "178906", quantity: 5.5, price: 300, orderType: "SELL" },
          { userId: "178906", quantity: 5.5, price: 300, orderType: "SELL" },
          { userId: "178906", quantity: 5.5, price: 300, orderType: "SELL" },
          { userId: "178906", quantity: 5.5, price: 300, orderType: "SELL" }
        ]
      } as StringTMap<Order[]>;

      expect(
        helpers.generateOrderInventory(grpedSellOrdersByPrice, "asc", "SELL")
      ).toEqual([
        "SELL:2.5kg for £200[1567890]",
        "SELL:36.4kg for £300[166666]"
      ]);
    });
  });
});
