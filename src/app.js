// EXTERNAL DEPENDENCIES
import express from 'express';

// INTERNAL DEPENDENCIES
import renderer from './server/renderer';

const app = express();
const port = 3000;

app.locals.pretty = true;
app.use(express.static(__dirname));

app.use('/', renderer);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');

  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);

    return;
  }

  console.log(`Listening on port ${port}`);
});
