/*
 * Unofficial Ray.So API.
 * The API has the same functionality as you can see on https://ray.so/
 *
 * Source: ray.so
 * Author: github.com/s0ftik3
 */

const puppeteer = require('puppeteer-core');

module.exports = class RaySo {
    /**
     * * title — Title above the box. Default is 'Untitled-1'
     * * theme — The box's theme. Default is breeze. Available themes: breeze, candy, crimson, falcon, meadow, midnight, raindrop, sunset
     * * background — Show background. Default is true
     * * darkMode — Dark mode of the theme. Default is true
     * * padding — Padding between box and borders. Default is 64, could be: 16, 32, ✔, 128
     * * language — Programming language of the code. Default is auto
     * * localPreview — Creates local file (example.png) of the output. Buffer is still being returned. Default is false
     * * browserPath — Full path to your chrome browser's folder. Default is C:\Program Files\Google\Chrome\Application\chrome.exe
     * * debug — Set true if you want to see information in the terminal when the picture is being generated.
     */
    constructor({
        title = '',
        theme = 'breeze',
        background = true,
        darkMode = true,
        padding = 64,
        language = 'auto',
        localPreview = false,
        browserPath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        debug = false,
    } = {}) {
        this.title = title;
        this.theme = theme;
        this.background = background;
        this.darkMode = darkMode;
        this.padding = padding;
        this.language = language;
        this.localPreview = localPreview;
        this.browserPath = browserPath;
        this.debug = debug;
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
                browserPath: this.browserPath,
            });

            if (!parametersValidation.ok)
                throw new Error(
                    `Parameters validation failed.\n\nError message(s): \n${parametersValidation.errors.join(
                        '\n',
                    )}\n`,
                );

            const browser = await this.openBrowser();
            const page = await this.openPage(browser, code);
            const element = await this.getFrameElement(page);
            const image = await this.getImage(element);

            await page.close();
            await browser.close();

            return image;
        } catch (err) {
            console.error(err);
        }
    }

    /**
     * This method opens chrome browser.
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
                executablePath: this.browserPath,
                ignoreHTTPSErrors: true,
            });

            if (this.debug) {
                console.info('[===-------] Opened browser...');
            }

            return browser;
        } catch (err) {
            console.error(err);
        }
    }

    /**
     * This method opens new ray.so page.
     * @private
     */
    async openPage(browser, code) {
        try {
            const page = await browser.newPage();

            await page.goto(this.buildPageUrl(code));

            await page.setViewport({
                width: 8192,
                height: 2048,
            });

            await page.evaluate(() => {
                document.querySelector(
                    '#frame > div.drag-control-points > div.handle.left',
                ).style.display = 'none';
                document.querySelector(
                    '#frame > div.drag-control-points > div.handle.right',
                ).style.display = 'none';
                document.querySelector('#app > main > section').style.display =
                    'none';
            });

            if (this.debug) {
                console.info('[=====-----] Opened and set up the page...');
            }

            return page;
        } catch (err) {
            console.error(err);
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
                        '#frame > div.app-frame-container > div.app-frame',
                    ).style.borderRadius = '0';
                });

                const element = await page.$('div[class="app-frame"]');

                if (this.debug) {
                    console.info('[======----] Selected code frame element...');
                }

                return element;
            } else {
                const element = await page.$('div[id="frame"]');

                if (this.debug) {
                    console.info('[======----] Selected code frame element...');
                }

                return element;
            }
        } catch (err) {
            console.error(err);
        }
    }

    /**
     * This method takes a screenshot of the code preview frame and returns an image buffer.
     * @private
     */
    async getImage(element) {
        try {
            if (this.localPreview) {
                const image = await element.screenshot({
                    omitBackground: true,
                    path: 'example.png',
                });

                if (this.debug) {
                    console.info('[========--] Took a screenshot...');
                    console.info(
                        '[==========] Successfully generated an image...',
                    );
                }

                return image;
            } else {
                const image = await element.screenshot({
                    omitBackground: true,
                });

                if (this.debug) {
                    console.info('[========--] Took a screenshot...');
                    console.info(
                        '[==========] Successfully generated an image...',
                    );
                }

                return image;
            }
        } catch (err) {
            console.error(err);
        }
    }

    /**
     * This method builds ray.so url with its params based on params passed to the class constructor.
     * @private
     */
    buildPageUrl(code) {
        try {
            return `https://ray.so/?title=${encodeURIComponent(
                this.title,
            )}&theme=${this.theme}&spacing=${this.padding}&background=${
                this.background
            }&darkMode=${this.darkMode}&code=${encodeURIComponent(
                this.stringToBase64(code),
            )}&language=${encodeURIComponent(this.language)}`;
        } catch (err) {
            console.error(err);
        }
    }

    /**
     * This method translates string to base64 string. Ray.so accepts only base64 string as code string.
     * @private
     */
    stringToBase64(string) {
        try {
            return Buffer.from(string).toString('base64');
        } catch (err) {
            console.error(err);
        }
    }

    /**
     * This method validates parameters passed to constructor.
     * @private
     */
    validateParameters(params) {
        try {
            if (this.debug) {
                console.info('[=---------] Started image generation...');
            }

            const errors = [];

            const themes = [
                'breeze',
                'candy',
                'crimson',
                'falcon',
                'meadow',
                'midnight',
                'raindrop',
                'sunset',
            ];
            const paddings = [16, 32, 64, 128];
            const languages = [
                'auto',
                'bash',
                'c++',
                'c#',
                'clojure',
                'coffeescript',
                'crystal',
                'css',
                'd',
                'dart',
                'diff',
                'docker',
                'elm',
                'erlang',
                'fortran',
                'f#',
                'gherkin',
                'go',
                'groovy',
                'haskell',
                'html',
                'java',
                'javascript',
                'json',
                'jsx',
                'julia',
                'kotlin',
                'latex',
                'lisp',
                'lua',
                'markdown',
                'mathematica',
                'nginx',
                'objective c',
                'ocaml',
                'perl',
                'php',
                'powershell',
                'python',
                'r',
                'ruby',
                'rust',
                'scala',
                'scss',
                'smalltalk',
                'sql',
                'swift',
                'typescript',
                'tsx',
                'twig',
                'verilog',
                'vhdl',
                'xquery',
                'yaml',
            ];

            if (typeof params.title !== 'string')
                errors.push('Title parameter must be type of string.');

            if (typeof params.background !== 'boolean')
                errors.push('Background parameter must be type of boolean.');

            if (typeof params.darkMode !== 'boolean')
                errors.push('Dark mode parameter must be type of boolean.');

            if (typeof params.localPreview !== 'boolean')
                errors.push('Local preview parameter must be type of boolean.');

            if (typeof params.browserPath !== 'string') {
                errors.push('Browser path parameter must be type of string.');
            } else if (
                !params.browserPath.match(/^(.+)\/([^\/]+)|(.+)\\([^\\]+)$/g)
            ) {
                errors.push(
                    'The browser path is incorrect. Please check it and try again.',
                );
            }

            if (typeof params.theme !== 'string') {
                errors.push('Theme parameter must be type of string.');
            } else if (!themes.includes(params.theme.toLowerCase())) {
                errors.push(
                    'There is no such a theme. Available themes: breeze, candy, crimson, falcon, meadow, midnight, raindrop, sunset.',
                );
            }

            if (
                typeof params.padding !== 'string' &&
                typeof params.padding !== 'number'
            ) {
                errors.push(
                    'Padding parameter must be type of string or number.',
                );
            } else if (!paddings.includes(+params.padding)) {
                errors.push('Padding parameter must be 16, 32, 64 or 128.');
            }

            if (typeof params.language !== 'string') {
                errors.push('Language parameter must be type of string.');
            } else if (!languages.includes(params.language)) {
                errors.push(
                    "There is no such a language. Use 'auto' to define code language automatically.",
                );
            }

            if (errors.length > 0) {
                return { ok: false, errors };
            } else {
                if (this.debug) {
                    console.info('[==--------] Passed validation...');
                }
                return { ok: true };
            }
        } catch (err) {
            console.error(err);
        }
    }
};
