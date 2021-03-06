/* Discord Nitro Gift Generator Bot by @AnonHexo#3411 */

console.clear()

const Discord = require("discord.js");
const client = new Discord.Client();
const request = require("request");

const prefix = 'w?' /* change to anything you want (must be less than 4 chars) */
if (prefix.length >= 4) return console.log('the prefix must be less than 4 chars')

client.once('ready', () => {
    console.log('Client Connected.')
})

client.on('message', message => {
    if (message.author.bot) return
    /*
        add this to log all the messages sent (optional):
        console.log(`[${message.createdTimestamp}] ${message.author.tag}: ${message.content}`)

        add enable the bot only on guilds/servers (optional):
        if (!message.guild) return
    */
    try {
        if (message.content === `${prefix}nitrogen`) {
            var status
            var key = ''
            var triedCodes = []
            const chars = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", 'p', "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", 'P', "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]

            for (var i = 0; i <= 15; i++) {
                var rndCode = chars[Math.floor(Math.random() * chars.length)]
                key = key + rndCode
                if (triedCodes.includes(key)) return

                if (i == 15) {
                    request({
                        url: `https://discordapp.com/api/v6/entitlements/gift-codes/${key}`,
                        json: true
                    }, (error, response, body) => {

                        if (error) {
                            let errorEmbed = new Discord.MessageEmbed()
                                .setColor('#FF0000')
                                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({
                                    dynamic: true
                                }))
                                .setThumbnail('https://triviabot.co.uk/images/nitro.png')
                                .setTitle(`Nitro Code Generator - Error`)
                                .setDescription(`**[${error.code}]**\n*An error occurred, if you are a developer check the logs for more information.*`)
                                .setTimestamp()
                                .setFooter(`by @AnonHexo#3411`)
                            message.reply(errorEmbed)
                            console.log(error)
                            return
                        }

                        var res = JSON.stringify(body)

                        if (res == null) {
                            status = '[?] unknown'
                        } else if (res.match('limited')) {
                            status = `[!] rate limited (for ${body.retry_after}ms)`
                        } else if (res.match('Unknown Gift Code')) {
                            status = '[-] invalid'
                            triedCodes.push(key)
                        } else if (res.match('application_id')) {
                            status = '[+] valid'
                        }

                        let codeEmbed = new Discord.MessageEmbed()
                            .setColor('#FF0000')
                            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({
                                dynamic: true
                            }))
                            .setThumbnail('https://triviabot.co.uk/images/nitro.png')
                            .setTitle('Nitro Code Generator - Gift Code')
                            .setDescription(`**Code:** \`https://discord.gift/${key}\`\n**Requested at:** \`${new Date(message.createdAt)}\`\n**Check Status:** \`${status}\``)
                            .setTimestamp()
                            .setFooter(`by @AnonHexo#3411`)

                        message.author.send(codeEmbed)
                    })
                }
            }
        }
    } catch (e) {
        let errorEmbed = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({
                dynamic: true
            }))
            .setThumbnail('https://triviabot.co.uk/images/nitro.png')
            .setTitle(`Nitro Code Generator - Error`)
            .setDescription(`**[EGENERAL]**\n*An error occurred, if you are a developer check the logs for more information.*`)
            .setTimestamp()
            .setFooter(`by @AnonHexo#3411`)
        message.reply(errorEmbed)
        console.log(e)
        return
    }
})

client.login('your bot token here boi')
/* 
    enter here your Discord bot token (https://discord.com/developers/applications)
*/