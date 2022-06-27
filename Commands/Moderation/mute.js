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

        if(!interaction.guild.roles.cache.get("MUTE ROLE ID")) {
            return interaction.followUp({ embeds: [new MessageEmbed().setColor("RED").setDescription("Ο mute ρόλος δεν υπάρχει.")]});
        }

        await Target.roles.add("MUTE ROLE ID");
        setTimeout(async () => {
            if(!Target.roles.cache.has("MUTE ROLE ID")) return;
            await Target.roles.remove("MUTE ROLE ID")
        }, (ms(Time)))

        interaction.reply({ content: `${Target} muted for ${Time}`, ephemeral: true});
    }
}
