const express = require('express');
const app = express();
const PORT = process.env.PORT || 3012;
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

app.listen(PORT, () => {
    console.log('Server is running at ' + PORT);
});