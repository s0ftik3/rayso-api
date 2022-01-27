/*
 * Unofficial API for Ray.So that turns your code into beautiful images.
 * Choose from a range of syntax colors, hide or show the background, and
 * toggle between a dark and light window.
 *
 * Source: ray.so
 * Author: github.com/s0ftik3
 */

const RaySo = require('../src/rayso');
const raySo = new RaySo({ background: false });

raySo
    .cook(`console.log('This is an example of output without background');`)
    .then((response) => {
        console.log(
            '> Received an image buffer. Buffer length: %s',
            response.length,
        );
    })
    .catch((err) => {
        console.error(err);
    });
