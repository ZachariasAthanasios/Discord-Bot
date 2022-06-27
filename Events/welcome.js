const { MessageEmbed, WebhookClient, GuildMember} = require("discord.js");

module.exports = {
    name: "guildMemberAdd",

    /**
     * 
     * @param { GuildMember } member 
     */
    execute(member, sugarman) {
        const { user, guild } = member;

        // Auto-role
        member.roles.add("MEMBER ID"); // Member Role

        // Update Member Count
        sugarman.channels.cache.get("CHANNEL ID").setName(`🧍┇ Members: ${guild.memberCount}`)

        // Welcome Message
        const Welcomer = new WebhookClient({
            id: "CHANNEL ID",
            token: "CHANNEL TOKEN"
        });

        const Welcome = new MessageEmbed()
        .setColor("GREEN")
        .setAuthor(user.tag, user.avatarURL({ dynamic: true, size: 512}))
        .setThumbnail(user.avatarURL({ dynamic: true, size: 512}))
        .setDescription(`
            Καλώς ήρθες ${member} στον **${guild.name} Server**!
            Μην ξεχάσεις να δεις τα παρακάτω κανάλια!`)
        .addFields(
            { name: 'Rules', value: 'RULES CHANNEL ID', inline: true },
            { name: 'Verification', value: 'VERIFICATION CHANNEL ID', inline: true },
        )

        Welcomer.send({ embeds: [Welcome]});

        // Join Log
        const joinLog = new WebhookClient({
            id: "CHANNEL ID",
            token: "CHANNEL TOKEN"
        });

        const joinLogMessage = new MessageEmbed()
        .setColor("GREEN")
        .setAuthor(user.tag, user.avatarURL({ dynamic: true, size: 512}))
        .setThumbnail(user.avatarURL({ dynamic: true, size: 512}))
        .setDescription(`
            ${member} μόλις μπήκε στον **${guild.name}**!\n
            **Account ID:** \`${parseInt(user.id)}\`
            **Δημιουργήθηκε:** <t:${parseInt(user.createdTimestamp / 1000)}:R>
            `)

        joinLog.send({ embeds: [joinLogMessage]});
    }
}
