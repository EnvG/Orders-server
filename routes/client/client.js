module.exports = {
  auth: {
    endpoint: '/',
    get: (req, res) => {
      res.render('./auth', { error: null });
    },
  },
};
