/*
 * Unofficial Ray.So API.
 * The API has the same functionality as you can see on https://ray.so/
 *
 * Source: ray.so
 * Author: github.com/s0ftik3
 */

const RaySo = require('../src/rayso');
const raySo = new RaySo({
    title: 'Custom Title',
    theme: 'candy',
    padding: 32,
    language: 'javascript',
    localPreview: true,
});

raySo
    .cook(`console.log('Hello, World!');`)
    .then((response) => {
        console.log(
            '> Received an image buffer. Buffer length: %s',
            response.length,
        );
    })
    .catch((err) => {
        console.error(err);
    });
