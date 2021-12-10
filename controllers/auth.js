export const login = async (req, res) => {
  console.log(req.body);

  res.json(req.body);
};
