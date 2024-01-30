const Sequelize = require("sequelize");

class Auction extends Sequelize.Model {
  static initiate(sequelize) {
    Auction.init({
      bid: {
        type: Sequelize.INTEGER,
      },
    });
  }
}
