const { MessageEmbed, Message, WebhookClient } = require("discord.js");

module.exports = {
    name: "messageDelete",

    /**
     * 
     * @param { Message } message 
     */
    execute(message) {
        if(message.author.bot) return;

        const Log = new MessageEmbed()
        .setColor("#00FFC3")
        .setTitle("Ένα μήνυμα διαγράφτηκε")
        .setDescription(`O ${message.author} **διέγραψε** ένα μήνυμα.`)
        .addField( "**Διεγραμένο Μήνυμα**", `\`${message.content ? message.content : "None"}\``.slice(0, 4096))
        .setFooter({ text: `𝗦𝘂𝗴𝗮𝗿𝗺𝗮𝗻©`, iconURL: 'https://cdn.discordapp.com/attachments/989043665383092304/989887434764472450/logo.png'})
        .setTimestamp()

        new WebhookClient({ url: "WEBHOOK URL"}
        ).send({ embeds: [Log]}).catch((err) => console.log(err));
    }
}
