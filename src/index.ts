import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/', (req, res, next) => {
  res.send({message: 'Hello world'});
});

const httpServer = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});