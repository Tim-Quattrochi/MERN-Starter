const api = async (req, res) => {
  return res
    .status(200)
    .json({ message: "This is the user endpoint." });
};

module.exports = { api };
