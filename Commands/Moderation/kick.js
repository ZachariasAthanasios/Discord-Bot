const { Client, CommandInteraction, WebhookClient, MessageEmbed } = require("discord.js");

module.exports = {
    name: "kick",
    description: "Θέλεις να διώξεις κάποιον χρήστη;",
    permission: "KICK_MEMBERS",
    options: [
        {
            name: "target",
            description: "Ποιον χρήστη θέλεις να διώξεις;",
            type: "USER",
            required: true,
        },
        {
            name: "reason",
            description: "Για ποιο λόγο;",
            type: "STRING",
            required: true,
        },
    ],

    /**
     * 
     * @param { CommandInteraction } interaction 
     * @param { Client } sugarman 
     */
    async execute(interaction, sugarman) {
        const target = interaction.options.getMember("target");
        const kickMember = await interaction.guild.members.fetch(target.id);
        if(!kickMember) return await interaction.reply({ content: `Αυτός ο χρήστης δεν είναι στον Server.`, ephemeral: true});

        const KickReason = interaction.options.getString("reason");
        if(!KickReason) KickReason = "Δεν δόθηκε δικαιολογία.";

        // DM Message.
        const KickResponseDM = new MessageEmbed()
        .setColor("#00FFC3")
        .setTitle("Μόλις εκδιώχτηκες από έναν Server!")
        .setDescription(`Server: **${interaction.guild.name}**\nΔικαιολογία: \`${KickReason}\``)
        .setFooter({ text: "𝗦𝘂𝗴𝗮𝗿𝗺𝗮𝗻©", iconURL: 'https://cdn.discordapp.com/attachments/989043665383092304/989887434764472450/logo.png'})

        await kickMember.send({ embeds: [KickResponseDM] }).catch(err => console.log(`Ο χρήστης αποκλείστηκε, αλλά δεν έλαβε το ενημερωτικό μήνυμα. Ίσως έχει κλειστά τα DM's.`));

        // Log Message.
        const KickResponceLogChannel = new WebhookClient({
            id: "990639155979616266",
            token: "n9C8u0JabRUFQ946bjwUrhCxyLEk7LfgJUboMEXGNrVRerrlF4Nl6zHi_tbr8SK0ai24"
        });

        const KickResponce = new MessageEmbed()
        .setColor("#00FFC3")
        .setTitle("Μόλις εκδιώχτηκε ένας Χρήστης.")
        .setDescription(`Χρήστης: <@${target.id}>\nΔικαιολογία: \`${KickReason}\``)
        .setFooter({ text: "𝗦𝘂𝗴𝗮𝗿𝗺𝗮𝗻©", iconURL: 'https://cdn.discordapp.com/attachments/989043665383092304/989887434764472450/logo.png'})

        await KickResponceLogChannel.send({ embeds: [KickResponce]});

        // Απάντηση στο Slash Command.
        await interaction.reply({ content: `🟢 Ο Χρήστης <@${target.id}> μόλις εκδιώχθηκε επιτυχώς!`, ephemeral: true});

        await target.kick();
    }
}
// #00FFC3