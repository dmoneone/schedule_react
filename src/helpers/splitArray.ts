export function splitArray<T>(array: T[], n: number): Array<Array<T>> {
    let arrayCopy = [...array]
    let output: Array<Array<T>> = []

    while (arrayCopy.length > 0) {
        let chunk = arrayCopy.splice(0, n)
        output.push(chunk)
    }

    return output
}

