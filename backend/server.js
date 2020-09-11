const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const redis = require('./db/redis');
const errorHandler = require('./middleware/errorHandler');

const searchRoutes = require('./routes/search');
const subscriptionRoutes = require('./routes/subscriptions');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.static(path.join(__dirname, '../build')));

app.use(express.json());
app.use(cors({
    origin: /^.+localhost:3000$/,
}));
app.use(helmet());
app.use(morgan('dev'));

// Routes
app.use('/api/search', searchRoutes);
app.use('/api/subscriptions', subscriptionRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../build/index.html'));
});

app.use(errorHandler);

mongoose.connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(db => {
    console.log(`[info]: Connected to MongoDB at "${db.connection.host}"`);
}).catch(err => {
    console.error(`[error]: ${err.message}`);
    process.exit(1);
});

app.listen(PORT, () => console.log(`[info]: Server listening on port ${PORT}`));
