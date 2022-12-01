export const isValidPath = path => {
    switch (process.platform) {
        case 'darwin':
        case 'linux':
            return /^(\/[^\/ ]*)+\/?$/.test(path)
        case 'win32':
            return /^(.+)\/([^\/]+)|(.+)\\([^\\]+)$/.test(path)
        default:
            break
    }
}
