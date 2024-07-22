const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const memberRoutes = require('./routes/member');
const ratingRoutes = require('./routes/rating');
const indexRoutes = require('./routes/index');
const createError = require('http-errors');

const app = express();

// Set up the view engine
app.set('view engine', 'ejs'); // or 'pug', 'hbs', etc.
app.set('views', 'views'); // Directory where view templates are stored

app.use(bodyParser.json());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/member', memberRoutes);
app.use('/api', ratingRoutes); // Base route for the API
app.use('/', indexRoutes);

app.use(function(req, res, next) {
    next(createError(404));
});

app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error'); // Ensure 'error.ejs' or equivalent exists in the 'views' directory
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
