const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "lock",
    description: "Κλείδωσε ένα κανάλι.",
    permission: "SEND_MESSAGES",

    /**
     * 
     * @param { MessageEmbed } message 
     */
    async execute( message ) {
        const channel = message.channel;
        await channel.permissionOverwrites.edit(message.guild.id, {
            SEND_MESSAGES: false
        }).catch(err => console.log(err))

        const LockMessage = new MessageEmbed()
        .setColor("RED")
        .setTitle("🔒 | Το κανάλι μόλις κλειδώθηκε.")
        .setFooter({ text: "𝗦𝘂𝗴𝗮𝗿𝗺𝗮𝗻©", iconURL: 'https://cdn.discordapp.com/attachments/989043665383092304/989887434764472450/logo.png'})
        .setTimestamp()

        await message.channel.send({ embeds: [LockMessage] });
    }
}