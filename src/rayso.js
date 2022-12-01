/*
 * Unofficial API for Ray.So that turns your code into beautiful images.
 * Choose from a range of syntax colors, hide or show the background, and
 * toggle between a dark and light window.
 *
 * Source: ray.so
 * Author: github.com/s0ftik3
 */

import puppeteer from 'puppeteer'
import crypto from 'node:crypto'
import {
    CardPadding,
    CardProgrammingLanguage,
    CardTheme,
} from './entities/options.js'
import { isValidPath } from './helpers/isValidPath.js'

export class RaySo {
    /**
     * @param {Object} [options]
            Query parameters to be used to 
            construct the completed request.
        * @param {String} [options.title]
            The title of the code snippet.
            Default is 'Untitled-1'.
        * @param {('breeze'|'candy'|'crimson'|'falcon'|'meadow'|'midnight'|'raindrop'|'sunset')} [options.theme]
            The color scheme you want the
            uploaded code to have.
            Default is breeze.
        * @param {(
            true|
            false
        )} [options.background]
            Hide or show background.
            Default is true.
        * @param {(
            true|
            false
        )} [options.darkMode]
            Will determine whether the background
            behind the text is light or dark.
            Default is true.
        * @param {(
            16|
            32|
            64|
            128
        )} [options.padding]
            Determines the size of the padding
            around the content of the uploaded text.
            Default is 32.
        * @param {String} [options.language]
            The language the code is in.
            Default is auto.
        * @param {(
            true|
            false
        )} [options.localPreview]
            Creates local file (example.png) of the output. 
            Buffer is still being returned. 
            Default is false.
        * @param {String} [options.localPreviewPath]
            Full path to your destination folder you'd like to save the example.
            Default is your executed file's location.
        * @param {(
            true|
            false
        )} [options.debug]
            Will show information in the terminal
            about the image generation process.
            Default is false.
    */
    constructor({
        title = '',
        theme = CardTheme.BREEZE,
        background = true,
        darkMode = true,
        padding = CardPadding.md,
        language = CardProgrammingLanguage.AUTO,
        localPreview = false,
        localPreviewPath = '',
        debug = false,
    } = {}) {
        this.title = title
        this.theme = theme
        this.background = background
        this.darkMode = darkMode
        this.padding = padding
        this.language = language
        this.localPreview = localPreview
        this.localPreviewPath = localPreviewPath
        this.debug = debug
    }

    /**
     * This method "cooks" a beautiful image preview of your code.
     * @param {String} code Your code string you want to see in the result image.
     * @public
     * @returns Buffer of the image.
     */
    async cook(code) {
        try {
            const parametersValidation = this.validateParameters({
                title: this.title,
                theme: this.theme,
                background: this.background,
                darkMode: this.darkMode,
                padding: this.padding,
                language: this.language,
                localPreview: this.localPreview,
                localPreviewPath: this.localPreviewPath,
            })

            if (!parametersValidation.ok)
                throw new Error(
                    `Parameters validation failed.\n\nError message(s): \n${parametersValidation.errors.join(
                        '\n'
                    )}\n`
                )

            const browser = await this.openBrowser()
            const page = await this.openPage(browser, code)
            const element = await this.getFrameElement(page)
            const image = await this.getImage(element)

            await page.close()
            await browser.close()

            return image
        } catch (err) {
            console.error(err)
        }
    }

    /**
     * This method opens Chrome browser.
     * @private
     */
    async openBrowser() {
        try {
            const browser = await puppeteer.launch({
                args: [
                    "--proxy-server='direct://'",
                    '--proxy-bypass-list=*',
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-dev-shm-usage',
                    '--disable-accelerated-2d-canvas',
                    '--no-first-run',
                    '--no-zygote',
                    '--disable-gpu',
                ],
                headless: true,
                ignoreHTTPSErrors: true,
            })

            if (this.debug) {
                console.info('[===-------] Opened browser...')
            }

            return browser
        } catch (err) {
            console.error(err)
        }
    }

    /**
     * This method opens new ray.so page.
     * @private
     */
    async openPage(browser, code) {
        try {
            const page = await browser.newPage()

            await page.goto(this.buildPageUrl(code))

            await page.setViewport({
                width: 8192,
                height: 2048,
            })

            await page.evaluate(() => {
                document.querySelector(
                    '#frame > div.drag-control-points > div.handle.left'
                ).style.display = 'none'
                document.querySelector(
                    '#frame > div.drag-control-points > div.handle.right'
                ).style.display = 'none'
                document.querySelector('#app > main > section').style.display =
                    'none'
            })

            if (this.debug) {
                console.info('[=====-----] Opened and set up the page...')
            }

            return page
        } catch (err) {
            console.error(err)
        }
    }

    /**
     * This method gets part of the page where the code preview is.
     * @private
     */
    async getFrameElement(page) {
        try {
            if (!this.background) {
                await page.evaluate(() => {
                    document.querySelector(
                        '#frame > div.app-frame-container > div.app-frame'
                    ).style.borderRadius = '0'
                })

                const element = await page.$('div[class="app-frame"]')

                if (this.debug) {
                    console.info('[======----] Selected code frame element...')
                }

                return element
            } else {
                const element = await page.$('div[id="frame"]')

                if (this.debug) {
                    console.info('[======----] Selected code frame element...')
                }

                return element
            }
        } catch (err) {
            console.error(err)
        }
    }

    /**
     * This method takes a screenshot of the code preview frame and returns an image buffer.
     * @private
     */
    async getImage(element) {
        try {
            if (this.localPreview) {
                const previewFileName =
                    'example_' + crypto.randomBytes(4).toString('hex') + '.png'
                const image = await element.screenshot({
                    omitBackground: true,
                    path:
                        (this.localPreviewPath.length > 0
                            ? this.localPreviewPath.at(-1) === '/'
                                ? this.localPreviewPath
                                : this.localPreviewPath + '/'
                            : '') + previewFileName,
                })

                if (this.debug) {
                    console.info('[========--] Took a screenshot...')
                    console.info(
                        '[=========-] Created a local file named %s...',
                        previewFileName
                    )
                    console.info(
                        '[==========] Successfully generated an image...'
                    )
                }

                return image
            } else {
                const image = await element.screenshot({
                    omitBackground: true,
                })

                if (this.debug) {
                    console.info('[========--] Took a screenshot...')
                    console.info(
                        '[==========] Successfully generated an image...'
                    )
                }

                return image
            }
        } catch (err) {
            console.error(err)
        }
    }

    /**
     * This method builds ray.so url with its params based on params passed to the class constructor.
     * @private
     */
    buildPageUrl(code) {
        try {
            return `https://ray.so/?title=${encodeURIComponent(
                this.title
            )}&theme=${this.theme}&spacing=${this.padding}&background=${
                this.background
            }&darkMode=${this.darkMode}&code=${encodeURIComponent(
                this.stringToBase64(code)
            )}&language=${encodeURIComponent(this.language)}`
        } catch (err) {
            console.error(err)
        }
    }

    /**
     * This method translates string to base64 string. Ray.so accepts only base64 string as code string.
     * @private
     */
    stringToBase64(string) {
        try {
            return Buffer.from(string).toString('base64')
        } catch (err) {
            console.error(err)
        }
    }

    /**
     * This method validates parameters passed to constructor.
     * @private
     */
    validateParameters(params) {
        try {
            if (this.debug) {
                console.info('[=---------] Started image generation...')
            }

            const errors = []

            const themes = Object.values(CardTheme)
            const paddings = Object.values(CardPadding)
            const languages = Object.values(CardProgrammingLanguage)

            if (typeof params.title !== 'string')
                errors.push('Title parameter must be type of string.')

            if (typeof params.background !== 'boolean')
                errors.push('Background parameter must be type of boolean.')

            if (typeof params.darkMode !== 'boolean')
                errors.push('Dark mode parameter must be type of boolean.')

            if (typeof params.localPreview !== 'boolean')
                errors.push('Local preview parameter must be type of boolean.')

            if (typeof params.localPreviewPath !== 'string') {
                errors.push(
                    'Local preview path parameter must be type of string.'
                )
            } else if (
                params.localPreviewPath.length > 0 &&
                !isValidPath(params.localPreviewPath)
            ) {
                errors.push(
                    'The local preview path is incorrect. Please check it and try again.'
                )
            }

            if (typeof params.theme !== 'string') {
                errors.push('Theme parameter must be type of string.')
            } else if (!themes.includes(params.theme.toLowerCase())) {
                errors.push(
                    'There is no such a theme. Available themes: breeze, candy, crimson, falcon, meadow, midnight, raindrop, sunset.'
                )
            }

            if (
                typeof params.padding !== 'string' &&
                typeof params.padding !== 'number'
            ) {
                errors.push(
                    'Padding parameter must be type of string or number.'
                )
            } else if (!paddings.includes(+params.padding)) {
                errors.push('Padding parameter must be 16, 32, 64 or 128.')
            }

            if (typeof params.language !== 'string') {
                errors.push('Language parameter must be type of string.')
            } else if (!languages.includes(params.language.toLowerCase())) {
                errors.push(
                    "There is no such a language. Use 'auto' to define code language automatically."
                )
            }

            if (errors.length > 0) {
                return { ok: false, errors }
            } else {
                if (this.debug) {
                    console.info('[==--------] Passed validation...')
                }
                return { ok: true }
            }
        } catch (err) {
            console.error(err)
        }
    }
}
