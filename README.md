# Ray.so API

[![version](https://badgen.net/npm/v/rayso-api)](https://npmjs.com/package/rayso-api)
[![downloads](https://badgen.net/npm/dm/rayso-api)](https://www.npmjs.com/package/rayso-api)
[![author on telegram](https://img.shields.io/badge/Author%20on%20-Telegram-blue)](https://t.me/vychs)

[![logotype](/assets/rayso-api-preview.png)](https://npmjs.com/package/rayso-api)

Unofficial API for ray.so that turns your code into beautiful images. Choose from a range of syntax colors, hide or show the background, and toggle between a dark and light window.

## Navigation

-   [Installing](#installing)
-   [Usage](#usage)
-   [Parameters](#parameters)
-   [Examples](#examples)
    -   [Default](#default-output)
    -   [Custom](#custom-parameters)
    -   [No Background](#output-without-background)
-   [Credits](#credits)

## Installing

```bash
$ npm i rayso-api
```

## Usage

```javascript
const RaySo = require('rayso-api');
const raySo = new RaySo({
    // parameters, if you want to customize the output
    // you'll find detailed info about parameters below
});

raySo
    .cook(`console.log('Hello, World!');`)
    .then((response) => {
        // response is image buffer
    })
    .catch((err) => {
        console.error(err);
    });
```

👮‍♂️ **Attention!** The API will not work if you don't have any kind of Chrome browser (Chromium). So, make sure to set your full local path to `chrome.exe` in `broswerPath` parameter (or any other execution file of the browser based on Chromium).

## Parameters

| Parameter      | Default value                                               | Type             | Description                                                                                                                                    |
| -------------- | ----------------------------------------------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `title `       | `"Untitled-1"`                                              | String           | The title will be displayed on top of the code box.                                                                                            |
| `theme`        | `"breeze"`                                                  | String           | There are several options of how your box will look like. Available themes: breeze, candy, crimson, falcon, meadow, midnight, raindrop, sunset |
| `background`   | `true`                                                      | Boolean          | If disabled, it will create an image of code box only, without background.                                                                     |
| `darkMode`     | `true`                                                      | Boolean          | If disabled, it will change your theme to its light version.                                                                                   |
| `padding`      | `64`                                                        | String or Number | Distance between borders and code box. Available values: 16, 32, 64 and 128.                                                                   |
| `language`     | `"auto"`                                                    | String           | You better leave it auto :/ However, you can try to pass some language name and if it worked, good for you!                                    |
| `localPreview` | `false`                                                     | Boolean          | If enabled, it will create example.png image file of the output in the current directory.                                                      |
| `browserPath`  | `"C:\Program Files\ Google\Chrome\Application \chrome.exe"` | String           | Local path to the browser (Chrome). You can leave it, if it's your home PC and you have Chrome installed.                                      |
| `debug`        | `false `                                                    | Boolean          | If enabled, it will show messages in the console during code execution.                                                                        |

## Examples

### Default output

```javascript
const RaySo = require('rayso-api');
const raySo = new RaySo();
```

[![output](/examples/default.png)](https://npmjs.com/package/rayso-api)

### Custom parameters

```javascript
const RaySo = require('rayso-api');
const raySo = new RaySo({
    title: 'Custom Title',
    theme: 'candy',
    padding: 32,
    language: 'javascript',
    localPreview: true,
});
```

[![output](/examples/custom.png)](https://npmjs.com/package/rayso-api)

### Output without background

```javascript
const RaySo = require('rayso-api');
const raySo = new RaySo({ background: false });
```

[![output](/examples/noBackground.png)](https://npmjs.com/package/rayso-api)

You'll find more examples in the `./examples` folder.

## Credits

-   The source is [ray.so](https://ray.so) website.
