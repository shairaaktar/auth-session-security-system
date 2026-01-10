export const success = (res, data, message = "Success") => {
  return res.status(200).json({
    status: "success",
    message,
    data
  });
};

export const failure = (res, error, statusCode = 400) => {
  return res.status(statusCode).json({
    status: "error",
    error
  });
};
