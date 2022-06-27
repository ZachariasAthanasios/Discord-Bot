const { MessageEmbed, WebhookClient, GuildMember} = require("discord.js");

module.exports = {
    name: "guildMemberRemove",

    /**
     * 
     * @param { GuildMember } member 
     */
    execute(member, sugarman) {
        const { user, guild } = member;

        // Update Member Count
        sugarman.channels.cache.get("CHANNEL ID").setName(`🧍┇ Members: ${guild.memberCount}`)

        // Leave Log
        const leaveLog = new WebhookClient({
            id: "CHANNEL ID",
            token: "CHANNEL TOKEN"
        });

        const leaveLogMessage = new MessageEmbed()
        .setColor("RED")
        .setAuthor(user.tag, user.avatarURL({ dynamic: true, size: 512}))
        .setThumbnail(user.avatarURL({ dynamic: true, size: 512}))
        .setDescription(`
            ${member} μόλις έφυγε!\n
            **Account ID:** \`${parseInt(user.id)}\`
            **Δημιουργήθηκε:** <t:${parseInt(user.createdTimestamp / 1000)}:R>\n`)

            leaveLog.send({ embeds: [leaveLogMessage]});
    }
}
