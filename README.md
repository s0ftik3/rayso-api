# Ray.so API

[![version](https://badgen.net/npm/v/rayso-api)](https://npmjs.com/package/rayso-api)
[![downloads](https://badgen.net/npm/dm/rayso-api)](https://www.npmjs.com/package/rayso-api)

[![logotype](/assets/rayso-api-preview.png)](https://npmjs.com/package/rayso-api)

Unofficial API for ray.so that turns your code into beautiful images. Choose from a range of syntax colors, hide or show the background, and toggle between a dark and light window.

## Navigation

-   [Installing](#installing)
-   [Usage](#usage)
-   [Parameters](#parameters)

## Installing

```bash
$ npm i rayso-api
```

## Usage

```javascript
const RaySo = require('../src/rayso');
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

```javascript
const RaySo = require('../src/rayso');
const raySo = new RaySo({
    title: 'Custom Title',
    theme: 'candy',
    padding: 32,
    language: 'javascript',
    localPreview: true,
});
```

## Credits

-   Source is [ray.so](https://ray.so).
-   Author on Telegram [@vychs](https://t.me/vychs).
