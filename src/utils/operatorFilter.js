const operatorFilter = (attribute, value) => {
  const operators = {
    ">=": "$gte",
    "<=": "$lte",
    ">": "$gt",
    "<": "$lt",
  };

  const operator = Object.keys(operators).find((op) => value.includes(op));

  if (operator) {
    const realValue = value.replace(operator, "").trim();
    return { [attribute]: { [operators[operator]]: Number(realValue) } };
  } else {
    return { [attribute]: value };
  }
};

module.exports = { operatorFilter };