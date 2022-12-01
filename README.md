# Ray.so API

[![version](https://badgen.net/npm/v/rayso-api)](https://npmjs.com/package/rayso-api)
[![downloads](https://badgen.net/npm/dm/rayso-api)](https://www.npmjs.com/package/rayso-api)
[![author on telegram](https://img.shields.io/badge/Author%20on%20-Telegram-blue)](https://t.me/vychs)

[![logotype](https://i.ibb.co/vz8DtqL/rayso-api-preview.png)](https://npmjs.com/package/rayso-api)

This is unofficial NodeJs (JavaScript) API for [ray.so](https://ray.so) that turns your code into beautiful images. Choose from a range of syntax colors, hide or show the background, and toggle between a dark and light window.

## Navigation

-   [Installing](#installing)
-   [Usage](#usage)
-   [Parameters](#parameters)
-   [Examples](#examples)
    -   [Default](#default-output)
    -   [Custom](#custom-parameters)
    -   [No Background](#output-without-background)
-   [Themes](#themes)
    -   [Candy](#candy)
    -   [Crimson](#crimson)
    -   [Falcon](#falcon)
    -   [Meadow](#meadow)
    -   [Midnight](#midnight)
    -   [Raindrop](#raindrop)
    -   [Sunset](#sunset)
-   [Credits](#credits)

## Installing

```bash
$ npm i rayso-api
```

## Usage

```javascript
const RaySo = require('rayso-api')
const raySo = new RaySo({
    // parameters, if you want to customize the output
    // you'll find detailed info about parameters below
})

raySo
    .cook(`console.log('Hello, World!');`)
    .then(response => {
        // response is image buffer
    })
    .catch(err => {
        console.error(err)
    })
```

👮‍♂️ **Attention!** The API will not work if you don't have any kind of Chrome browser (Chromium). So, make sure to set your full local path to `chrome.exe` in `broswerPath` parameter (or any other execution file of the browser based on Chromium).

```javascript
const RaySo = require('rayso-api')
const raySo = new RaySo()
```

## Parameters

| Parameter      | Default value  | Type             | Description                                                                                                                                    |
| -------------- | -------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `title `       | `"Untitled-1"` | String           | The title will be displayed on top of the code box.                                                                                            |
| `theme`        | `"breeze"`     | String           | There are several options of how your box will look like. Available themes: breeze, candy, crimson, falcon, meadow, midnight, raindrop, sunset |
| `background`   | `true`         | Boolean          | If disabled, it will create an image of code box only, without background.                                                                     |
| `darkMode`     | `true`         | Boolean          | If disabled, it will change your theme to its light version.                                                                                   |
| `padding`      | `32`           | String or Number | Distance between borders and code box. Available values: 16, 32, 64 and 128.                                                                   |
| `language`     | `"auto"`       | String           | You better leave it auto :/ However, you can try to pass some language name and if it worked, good for you!                                    |
| `localPreview` | `false`        | Boolean          | If enabled, it will create example.png image file of the output in the current directory.                                                      |
| `debug`        | `false `       | Boolean          | If enabled, it will show messages in the console during code execution.                                                                        |

## Examples

### Default output

```javascript
const RaySo = require('rayso-api')
const raySo = new RaySo()
```

[![output](https://i.ibb.co/Vv9rD4H/default.png)](https://npmjs.com/package/rayso-api)

### Custom parameters

```javascript
const RaySo = require('rayso-api')
const raySo = new RaySo({
    title: 'Custom Title',
    theme: 'candy',
    padding: 32,
    language: 'javascript',
    localPreview: true,
})
```

[![output](https://i.ibb.co/Px9C24J/custom.png)](https://npmjs.com/package/rayso-api)

### Output without background

```javascript
const RaySo = require('rayso-api')
const raySo = new RaySo({ background: false })
```

[![output](https://i.ibb.co/qspMB4t/no-Background.png)](https://npmjs.com/package/rayso-api)

## Themes

These are all the available themes, so far. As soon Ray.So has a new theme, it will appear here. Default theme `breeze` is not listed here, you saw it in the first picture of this README.

### Candy

```javascript
const RaySo = require('rayso-api')
const raySo = new RaySo({ theme: 'candy' })
```

[![candy](https://i.ibb.co/pQnX6pw/candy.png)](https://npmjs.com/package/rayso-api)

### Crimson

```javascript
const RaySo = require('rayso-api')
const raySo = new RaySo({ theme: 'crimson' })
```

[![crimson](https://i.ibb.co/qkYB36S/crimson.png)](https://npmjs.com/package/rayso-api)

### Falcon

```javascript
const RaySo = require('rayso-api')
const raySo = new RaySo({ theme: 'falcon' })
```

[![falcon](https://i.ibb.co/w7KdqR5/falcon.png)](https://npmjs.com/package/rayso-api)

### Meadow

```javascript
const RaySo = require('rayso-api')
const raySo = new RaySo({ theme: 'meadow' })
```

[![meadow](https://i.ibb.co/xJnMc10/meadow.png)](https://npmjs.com/package/rayso-api)

### Midnight

```javascript
const RaySo = require('rayso-api')
const raySo = new RaySo({ theme: 'midnight' })
```

[![midnight](https://i.ibb.co/4jng8Fs/midnight.png)](https://npmjs.com/package/rayso-api)

### Raindrop

```javascript
const RaySo = require('rayso-api')
const raySo = new RaySo({ theme: 'raindrop' })
```

[![raindrop](https://i.ibb.co/jbjYcVf/raindrop.png)](https://npmjs.com/package/rayso-api)

### Sunset

```javascript
const RaySo = require('rayso-api')
const raySo = new RaySo({ theme: 'sunset' })
```

[![sunset](https://i.ibb.co/Q8rFCVn/sunset.png)](https://npmjs.com/package/rayso-api)

## Credits

-   The source is [ray.so](https://ray.so) website.
