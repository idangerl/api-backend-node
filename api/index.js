const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handler');

app.use(express.json());
const whiteList = ['https://localhost:8000', 'https://myapp.co', 'local'];
const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  },
};
app.use(cors(options));

app.get('/api', (req, res) => {
  res.send('Hola mi server en express');
});

app.get('/api/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Mi port' + port);
});
