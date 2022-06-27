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
        member.roles.add("988854186236063794"); // Member Role

        // Update Member Count
        sugarman.channels.cache.get("989389527426666546").setName(`🧍┇ Members: ${guild.memberCount}`)

        // Welcome Message
        const Welcomer = new WebhookClient({
            id: "989064356518064138",
            token: "0_WfThDgX34ioEB0BKLtxZ-NCXkh4vtDbNf9x7oWuuFhl1QiucOWbY4xCnPPfJLVElw1"
        });

        const Welcome = new MessageEmbed()
        .setColor("GREEN")
        .setAuthor(user.tag, user.avatarURL({ dynamic: true, size: 512}))
        .setThumbnail(user.avatarURL({ dynamic: true, size: 512}))
        .setDescription(`
            Καλώς ήρθες ${member} στον **${guild.name} Server**!
            Μην ξεχάσεις να δεις τα παρακάτω κανάλια!`)
        .addFields(
            { name: 'Rules', value: '<#989155136473554954>', inline: true },
            { name: 'Verification', value: '<#989155994594594836>', inline: true },
        )

        Welcomer.send({ embeds: [Welcome]});

        // Join Log
        const joinLog = new WebhookClient({
            id: "989072704776863797",
            token: "SKw5JmUwFGZByM2fk-W2v-wR-R3hWTcd2F6a6ur6kgtMotauGhFypIGiwE5cwhCWUECb"
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