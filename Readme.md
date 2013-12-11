# size-middleware

    A size log middleware that will log when a request size or a response size is too large.

## Example

```js
var sizeLog = require('sizelog-middleware);
var logger = new require('winston').Logger();

var app = express();

app.configure('production', function () {
  app.use(sizeLog(logger));
});
```

## API

### sizeLog(logger, thresholds)

    Return a sizelog middleware with custom `thresholds`:

```js
{
    "warn": bytes('1mb'), // logger.warn after 1mb
    "error": bytes('2mb') // logger.error after 2mb
}
```

