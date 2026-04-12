function globalErrorHandler(err, req, res, next) {
  console.error("Error:", err);

  if (process.env.NODE_ENV === "development") {
    return res.status(err.statusCode || 500).json({
      error: err.message,
      stack: err.stack,
    });
  }

  // productional error response
  return res.status(err.statusCode || 500).json({
    error: err.message || "Something went wrong, please try again",
  });
}

export default globalErrorHandler;
