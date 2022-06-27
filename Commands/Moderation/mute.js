const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports = {
    name: "mute",
    description: "Κάνε mute έναν χρήστη",
    permission: "MANAGE_MESSAGES",
    options: [
        {
            name: "target",
            description: "Διάλεξε έναν χρήστη.",
            type: "USER",
            required: true,
        },
        {
            name: "preset-time",
            description: "Διάλεξε για πόσο χρόνο να είναι mute ο χρήστης.",
            type: "STRING",
            required: true,
            choices: [
                {
                    name: "1 Ώρα",
                    value: "1h"
                },
                {
                    name: "12 Ώρες",
                    value: "12h"
                },
                {
                    name: "1 Μέρα",
                    value: "1d"
                }
            ]
        },
        {
            name: "reason",
            description: "Για ποιο λόγο;",
            type: "STRING",
            required: false,
        }
    ],

    /**
     * 
     * @param { Client } sugarman 
     * @param { CommandInteraction } interaction 
     */
    async execute(interaction) {
        const Target = interaction.options.getMember("target");
        let Reason = interaction.options.getString("reason");
        if(!Reason) Reason = "Δεν δόθηκε λόγος."
        const Time = interaction.options.getString("preset-time");

        if(!interaction.guild.roles.cache.get("990882795863814185")) {
            return interaction.followUp({ embeds: [new MessageEmbed().setColor("RED").setDescription("The mute role does not exist.")]});
        }

        await Target.roles.add("990882795863814185");
        setTimeout(async () => {
            if(!Target.roles.cache.has("990882795863814185")) return;
            await Target.roles.remove("990882795863814185")
        }, (ms(Time)))

        interaction.reply({ content: `${Target} muted for ${Time}`, ephemeral: true});
    }
}