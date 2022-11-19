module.exports = class Checkout {
  constructor() {
    this.prices = {};
    this.discounts = {};
    this.items = {};
  }

  addPriceItem(item, price) {
    this.prices[item] = price;
  }

  addItem(item) {
    if (!this.prices[item]) {
        throw('No price');
    }
    if (this.items[item]) {
      this.items[item]++;
    } else {
      this.items[item] = 1;
    }
  }

  getTotal() {
    let total = 0;
    for (let item in this.items) {
      let discount = this.discounts[item];
      if (discount) {
        let numsDisc = Math.floor(this.items[item] / discount.count);
        total += numsDisc * discount.price;
        let rem = this.items[item] % discount.count;
        total += rem * this.prices[item];
      } else {
        total += this.items[item] * this.prices[item];
      }
    }
    return total;
  }

  addDiscRules(item, count, price) {
    this.discounts[item] = { count, price };
  }
};
