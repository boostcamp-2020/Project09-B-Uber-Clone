const context = ({ req, res }) => {
  res.set('Access-Control-Allow-Origin', process.env.CLIENT_HOST);
  return { req, res };
};

export default context;
