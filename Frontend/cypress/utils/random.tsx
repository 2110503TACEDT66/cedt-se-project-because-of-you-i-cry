export function generateRandomName () {
    const nameLength = Math.floor(Math.random() * 30)
    var name = ""

    for (let i = 0 ; i < nameLength ; i++) {
        const thisChar = 'a'

        const asciiCode = thisChar.charCodeAt(0) + Math.floor(Math.random() * 26);

        const finalChar = String.fromCharCode(asciiCode);

        name += finalChar
    }

    return name
}

export function generateRandomPhone () {
    const phoneLength = 10
    var phone = ""

    for (let i = 0 ; i < phoneLength ; i++) {
        const thisChar = '0'

        const asciiCode = thisChar.charCodeAt(0) + Math.floor(Math.random() * 10);

        const finalChar = String.fromCharCode(asciiCode);

        phone += finalChar
    }

    return phone
}