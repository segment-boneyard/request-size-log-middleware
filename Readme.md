# request-size-log-middleware

  Log a request if the request body or response body is too large.

## Example

```js
var sizeLog = require('request-size-log-middleware');
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


## License

```
WWWWWW||WWWWWW
 W W W||W W W
      ||
    ( OO )__________
     /  |           \
    /o o|    MIT     \
    \___/||_||__||_|| *
         || ||  || ||
        _||_|| _||_||
       (__|__|(__|__|
```