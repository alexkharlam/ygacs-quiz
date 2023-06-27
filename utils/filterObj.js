const filterObj = (obj, ...allowFields) => {
  const newObj = {};

  Object.keys(obj).forEach((el) => {
    if (allowFields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};

export default filterObj;
