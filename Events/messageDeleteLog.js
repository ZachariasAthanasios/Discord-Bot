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

        new WebhookClient({ url: "https://discord.com/api/webhooks/990664316703354900/OZIsUxjOhlioxWizl2L3KFP7E7xsMs2Kc4mvxiEMcNHFz2qwHsQx-ix0M4Km008bQAxK"}
        ).send({ embeds: [Log]}).catch((err) => console.log(err));
    }
}