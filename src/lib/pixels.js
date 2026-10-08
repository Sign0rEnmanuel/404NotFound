/**
 * Convierte una matriz de caracteres en paths SVG agrupados por carácter.
 * Cada carácter distinto de '.' es una celda de 1x1; las celdas contiguas de una fila se fusionan.
 * @param {string[]} rows filas de la matriz
 * @param {number} [offsetX]
 * @param {number} [offsetY]
 * @returns {Record<string, string>} mapa carácter -> atributo `d`
 */
export function pixelPaths(rows, offsetX = 0, offsetY = 0) {
    const paths = {}
    rows.forEach((row, y) => {
        let x = 0
        while (x < row.length) {
            const char = row[x]
            let end = x + 1
            while (end < row.length && row[end] === char) end += 1
            if (char !== '.' && char !== ' ') {
                paths[char] = (paths[char] ?? '') + rect(x + offsetX, y + offsetY, end - x, 1)
            }
            x = end
        }
    })
    return paths
}

/**
 * Path de un rectángulo.
 * @param {number} x
 * @param {number} y
 * @param {number} w
 * @param {number} h
 */
export function rect(x, y, w, h) {
    return `M${x} ${y}h${w}v${h}h${-w}z`
}

/**
 * Silueta de una matriz (todas las celdas no vacías) en un solo path.
 * @param {string[]} rows
 * @param {number} [offsetX]
 * @param {number} [offsetY]
 */
export function silhouettePath(rows, offsetX = 0, offsetY = 0) {
    const solid = rows.map((row) => row.replace(/[^. ]/g, '#'))
    return pixelPaths(solid, offsetX, offsetY)['#'] ?? ''
}
