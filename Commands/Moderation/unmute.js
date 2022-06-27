const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "unmute",
    description: "Κάνε unmute έναν χρήστη",
    permission: "MANAGE_MESSAGES",
    options: [
        {
            name: "target",
            description: "Διάλεξε έναν χρήστη.",
            type: "USER",
            required: true,
        }
    ],

    /**
     * 
     * @param { Client } sugarman 
     * @param { CommandInteraction } interaction 
     */
    execute( interaction ) {
        const Target = interaction.options.getMember("target");

        if(!Target.roles.cache.has("990882795863814185")) {
            return interaction.reply({ content: `Ο χρήστης δεν είναι muted.`, ephemeral: true});;
        }

        Target.roles.remove("990882795863814185");

        interaction.reply({ content: `O ${Target} δεν είναι πλέον muted.`, ephemeral: true});
    }
}