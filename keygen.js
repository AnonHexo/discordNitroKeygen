/* Nitro Gift Generator by @AnonHexo#3411 */

console.clear()

var request = require("request")
var fs = require("fs")

var key = '' // declaring it as string so it's not gonna be stored as undefined (line 63)
var triedCodes = []
const startedAt = new Date()
const chars = [
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", 'p', "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", 'P', "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"
]

fs.writeFile('keys.txt', `/* KEYGEN STARTED at ${new Date(startedAt)}, all snipes will be logged here */`, () => {})

generateCode()

function verify(key) {
    var keyLink = `https://discordapp.com/api/v6/entitlements/gift-codes/${key}`
    request({
        url: keyLink,
        json: true
    }, function (error, response, body) {

        var message = JSON.stringify(body)

        if (message == null) {
            console.log(`Couldn't verify code | https://discord.gift/${key}`)
            setTimeout(() => {
                return verify(key)
            }, 7000)
        } else {
            if (message.match("limited")) {
                console.log(`Getting rate limited, waiting ${body.retry_after}ms | https://discord.gift/${key}`)
                setTimeout(() => {
                    return verify(key)
                }, body.retry_after)
            }

            if (message.match("Unknown Gift Code")) {
                console.log(`[${body.code}] Invalid gift code | https://discord.gift/${key}`)
                triedCodes.push(key)
                setTimeout(() => {
                    return generateCode(key)
                }, 5000)
            }

            if (message.match("application_id")) {
                console.log(`[${body.code}] !!! VALID GIFT CODE !!!: https://discord.gift/${key}`)
                fs.writeFileSync('keys.txt', `Valid Gift Code: https://discord.gift/${key} \n`)
                setTimeout(() => {
                    return generateCode(key)
                }, 7000)
            }
        }
    })

}

function generateCode() {
    for (var i = 0; i <= 15; i++) {
        var rndCode = chars[Math.floor(Math.random() * chars.length)]
        key = key + rndCode

        if (i == 15) {
            if (triedCodes.includes(key)) return console.log('Code already used, generatin new one...')
            verify(key)
            key = ""
        }
    }
}