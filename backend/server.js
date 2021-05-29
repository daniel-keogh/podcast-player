const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const passport = require('passport');
const path = require('path');
const mongoose = require('mongoose');

dotenv.config();

const errorHandler = require('./middleware/errorHandler');
const { jwtStrategy } = require('./middleware/passport');

const authRoutes = require('./routes/auth');
const searchRoutes = require('./routes/search');
const subscriptionRoutes = require('./routes/subscriptions');
const userRoutes = require('./routes/users');

const app = express();

app.use(express.static(path.join(__dirname, '../build')));
app.use(express.json());
app.use(cors({ origin: /^.+localhost:3000$/ }));
app.use(helmet());
app.use(morgan('dev'));

// Passport
app.use(passport.initialize());
passport.use(jwtStrategy);

// Routes
app.use('/api', authRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/users', userRoutes);

app.all('/api/*', (req, res, next) => {
    // Return a JSON response instead of the default Express HTML one
    const error = new Error(`Cannot ${req.method} to the specified path`);
    error.status = 404;
    next(error);
});

app.get('*', (req, res) => {
    // Send the client application
    res.sendFile(path.join(__dirname + '/../build/index.html'));
});

app.use(errorHandler);

mongoose
    .connect(process.env.MONGO_URI, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((db) => {
        console.log(
            `[info]: Connected to MongoDB at "${db.connection.host}:${db.connection.port}"`
        );
    })
    .catch((err) => {
        console.error(`[error]: ${err.message}`);
        process.exit(1);
    });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`[info]: Server listening on port ${PORT}`));
