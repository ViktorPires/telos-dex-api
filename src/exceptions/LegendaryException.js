class LegendaryException extends Error {
    constructor(message) {
      super(message);
      this.name = "LegendaryException";
    }
}

module.exports = {
    LegendaryException,
}