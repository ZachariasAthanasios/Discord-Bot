const { MessageEmbed, Message, WebhookClient } = require("discord.js");

module.exports = {
    name: "messageUpdate",
    
    /**
     * 
     * @param { Message } oldMessage 
     * @param { Message } newMessage 
     */
    execute(oldMessage, newMessage) {
        if(oldMessage.author.bot) return;

        if(oldMessage.content === newMessage.content) return;

        const Count = 1950;

        const Original = oldMessage.content.slice(0, Count) + (oldMessage.content.length > 1950 ? " ..." : "");
        const Edited = newMessage.content.slice(0, Count) + (newMessage.content.length > 1950 ? " ..." : "");

        const Log = new MessageEmbed()
        .setColor("#00FFC3")
        .setTitle("Ένα μήνυμα επεξεργάστηκε")
        .setDescription(`O ${newMessage.author} **επεξεργάστηκε** ένα [μήνυμα](${newMessage.url}) στο ${newMessage.channel}`)
        .addFields(
            { name: "**Original**", value: `\`${Original}\``},
            { name: "**Edited**", value: `\`${Edited}\``},)
        .setFooter({ text: `𝗦𝘂𝗴𝗮𝗿𝗺𝗮𝗻©`, iconURL: 'https://cdn.discordapp.com/attachments/989043665383092304/989887434764472450/logo.png'})
        .setTimestamp()

        new WebhookClient({ url: "https://discord.com/api/webhooks/990656900632821820/rFGuMZ27SHGt_R1GLmBAxqmRglaASoqDhD8qc2xDUJiY-mx90cYo2tWWrRgf_YBG36bg"}
        ).send({ embeds: [Log]}).catch((err) => console.log(err));
    }
}