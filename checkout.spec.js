// 1. should create checkout.
// 2. should add an item price.
// 3. should add an item.
// 4. should calculate current total.
// 5. should add multiple items and get correct total.
// 6. should add discount rules.
// 7. should apply discount rules to total.
// 8. Exception thrown for items added without price.

const expect = require("chai").expect;
const Checkout = require("./checkout");

describe("Checkout", () => {
  let checkout;

  beforeEach(() => {
    checkout = new Checkout();
  });

  it("should calculate current total", () => {
    checkout.addPriceItem("a", 2);
    checkout.addItem("a");
    expect(checkout.getTotal()).to.eq(2);
  });

  it("should add multiple items and get correct total", () => {
    checkout.addPriceItem("a", 2);
    checkout.addPriceItem("b", 2);
    checkout.addItem("a");
    checkout.addItem("b");
    expect(checkout.getTotal()).to.eq(4);
  });

  it("should add discount rules", () => {
    checkout.addDiscRules("a", 2, 1);
  });

  it("should apply discount rules", () => {
    checkout.addPriceItem("a", 2);
    checkout.addPriceItem("b", 2);
    checkout.addItem("a");
    checkout.addItem("b");
    checkout.addItem("b");
    checkout.addItem("b");
    checkout.addDiscRules("b", 2, 1);
    expect(checkout.getTotal()).to.eq(5);
  });

  it('should throw Exception if items added without price', () => {
    expect(() => checkout.addItem('a')).to.throw('No price');
  });
});
