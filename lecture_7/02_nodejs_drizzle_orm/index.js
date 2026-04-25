
import express from 'express';
import router from './routes/users.route.js';

const app = express()
const PORT = 8000;

app.use(express.json());

app.use('/users', router)

app.listen(PORT, () => console.log(`Http server is running on PORT ${PORT}`));