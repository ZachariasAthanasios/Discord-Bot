const { Client, CommandInteraction, WebhookClient, MessageEmbed } = require("discord.js");

module.exports = {
    name: "unban",
    description: "Θέλεις να αφαιρέσεις τον αποκλεισμό σε κάποιον χρήστη;",
    permission: "BAN_MEMBERS",
    options: [
        {
            name: "target",
            description: "Ποιον χρήστη θέλεις να αφαιρέσεις τον αποκλεισμό;",
            type: "STRING",
            required: true,
        }
    ],

    /**
     * 
     * @param { Client } sugarman 
     * @param { CommandInteraction } interaction 
     */
    async execute(interaction, sugarman) {

        const userID = interaction.options.getString("target");
        let UnbanReason = interaction.options.getString("reason");
        if(!UnbanReason)  UnbanReason = "Δεν δόθηκε δικαιολογία.";

        await interaction.guild.bans.fetch().then(async bans => {
            if(bans.size == 0) return await interaction.reply({ content: `🔴 Δεν υπάρχει κανένας αποκλεισμένος από τον Server.`});
            let bannedID = bans.find(ban => ban.user.id == userID);
            if(!bannedID) return await interaction.reply({ content: `🔴 Το συγκεκριμένο ID δεν είναι αποκλεισμένο από αυτόν τον Server.`});

            // Log Message 
            const UnbanResponceLogChannel = new WebhookClient({
                id: "990647764222369812",
                token: "nzPxXEJOhxfpKSFjS7YcRQPgFW__0NXG0z2oa1IKmHUMnl8Nb2591j0x5ssSNvzAVNfz"
            });

            const UnbanResponce = new MessageEmbed()
            .setColor("#00FFC3")
            .setTitle("Μόλις αφαιρέθηκε ένας αποκλεισμός από έναν Χρήστης.")
            .setDescription(`Χρήστης: <@${userID}>\nΔικαιολογία: \`${UnbanReason}\``)
            .setFooter({ text: "𝗦𝘂𝗴𝗮𝗿𝗺𝗮𝗻©", iconURL: 'https://cdn.discordapp.com/attachments/989043665383092304/989887434764472450/logo.png'})

            await UnbanResponceLogChannel.send({ embeds: [UnbanResponce]});

            await interaction.guild.bans.remove(userID, UnbanReason).catch(err => console.log(err));

            // Απάντηση στο Slash Command.
            await interaction.reply({ content: `🟢 Στον χρήστη <@${userID}> αφαιρέθηκε ο αποκλεισμός με επιτυχία!`, ephemeral: true})
        }).catch(err => console.log(err));
    }
}
