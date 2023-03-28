import app from './app';
require('dotenv').config();


app.listen(process.env.PORT, (): void => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
