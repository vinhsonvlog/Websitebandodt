require('dotenv').config();

const app = require('./app');

const PORT = Number(process.env.PORT) || 1124;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
