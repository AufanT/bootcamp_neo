const express =  require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./dokumentasi-api.yaml');

const app = express();
const port = 3000;
const dotenv = require('dotenv');

dotenv.config();

const developerRoutes = require('./routes/Developer.routes');
const gameRoutes = require('./routes/Game.routes');
const authRoutes = require('./routes/Auth.routes');

app.use(express.json());
app.use('/developers', developerRoutes);
app.use('/games', gameRoutes);
app.use('/auth', authRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});