const operatorFilter = (attribute, value) => {
    if(value.includes(">=")) {
      const realValue = value.replace(">=", "").trim();

      return { [attribute]: { $gte: Number(realValue) } };

    } else if (value.includes("<=")) {
      const realValue = value.replace("<=", "").trim();

      return { [attribute]: { $lte: Number(realValue) } };

    } else if (value.includes(">")) {
      const realValue = value.replace(">", "").trim();

      return { [attribute]: { $gt: Number(realValue) } };

    } else if (value.includes("<")) {
      const realValue = value.replace("<", "").trim();

      return { [attribute]: { $lt: Number(realValue) } };
      
    } else {
      return { [attribute]: value };
    }
  };

module.exports = { operatorFilter };