const { Client, CommandInteraction, WebhookClient, MessageEmbed } = require("discord.js");

module.exports = {
    name: "ban",
    description: "Θέλεις να αποκλείσεις κάποιον χρήστη;",
    permission: "BAN_MEMBERS",
    options: [
        {
            name: "target",
            description: "Ποιον χρήστη θέλεις να αποκλείσεις;",
            type: "USER",
            required: true,
        },
        {
            name: "reason",
            description: "Για ποιο λόγο;",
            type: "STRING",
            required: true,
        },
        {
            name: "messages",
            description: "Θέλεις να σβήσεις τα μηνύματα του χρήστη;",
            type: "STRING",
            required: true,
            choices: [
                {
                    name: "Δεν θέλω να σβησω τα μηνήματα του.",
                    value: "0"
                },
                {
                    name: "Θέλω να σβήσω τα μηνύματα των τελευταίων 7 ημερών.",
                    value: "7"
                },
                {
                    name: "Θέλω να σβήσω τα μηνύματα των τελευταίων 24 ημερών.",
                    value: "24"
                }
            ]
        },
    ],

    /**
     * 
     * @param { Client } sugarman 
     * @param { CommandInteraction } interaction 
     */
    async execute(interaction, sugarman) {
        const banUser = interaction.options.getUser("target");
        const banMember = await interaction.guild.members.fetch(banUser.id);
        if(!banMember) return await interaction.reply({ content: `Αυτός ο χρήστης δεν είναι στον Server.`, ephemeral: true});

        let BanReason = interaction.options.getString("reason");
        if(!BanReason)  BanReason = "Δεν δόθηκε δικαιολογία.";

        let amount = interaction.options.getString("messages");

        // DM Message
        const BanResponceDM = new MessageEmbed()
        .setColor("#00FFC3")
        .setTitle("Μόλις αποκλείστηκες από έναν Server")
        .setDescription(`Server: **${interaction.guild.name}**\nΔικαιολογία: \`${BanReason}\``)
        .setFooter({ text: "𝗦𝘂𝗴𝗮𝗿𝗺𝗮𝗻©", iconURL: 'https://cdn.discordapp.com/attachments/989043665383092304/989887434764472450/logo.png'})

        await banMember.send({ embeds: [BanResponceDM] }).catch(err => console.log(`Ο χρήστης αποκλείστηκε, αλλά δεν έλαβε το ενημερωτικό μήνυμα. Ίσως έχει κλειστά τα DM's.`));

        // Log Message
        const BanResponceLogChannel = new WebhookClient({
            id: "989196051548368977",
            token: "m6H9Ulhz_sEre7ZIKQ4L6_E6eiDGbVdnD-NFEL0NY9u-m2i8_f1fFFEWQsu6PphEHMGZ"
        });

        const BanResponce = new MessageEmbed()
        .setColor("#00FFC3")
        .setTitle("Μόλις αποκλείστηκε ένας Χρήστης.")
        .setDescription(`Χρήστης: <@${banUser}>\nΔικαιολογία: \`${BanReason}\``)

        await BanResponceLogChannel.send({ embeds: [BanResponce]});

        await banMember.ban({ days: amount, reason: BanReason}).catch(err => console.log(err));

        await interaction.reply({ content: `🟢 Ο Χρήστης ${banUser} μόλις αποκλείστηκε επιτυχώς!`, ephemeral: true});
    }
}