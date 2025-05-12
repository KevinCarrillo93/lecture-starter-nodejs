const responseMiddleware = (req, res) => {
  if (res.err) {
    const statusCode = res.statusCode || 500;
    return res.status(statusCode).json({ error: true, message: res.err.message });
  }

  if (res.data !== undefined) {
    const statusCode = res.statusCode || 200; 
    return res.status(statusCode).json({ error: false, data: res.data });
  }

  return res.status(res.statusCode || 204).send();
};

export { responseMiddleware };