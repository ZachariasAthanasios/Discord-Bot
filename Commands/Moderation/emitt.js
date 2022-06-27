const { CommandInteraction, Client } = require("discord.js");

module.exports = {
    name: "emitt",
    description: "Δοκίμασε Event",
    permission: "ADMINISTRATOR",
    options: [
        {
            name: "member",
            description : "Επέλεξε ποιο Event θέλεις να τεστάρεις.",
            type: "STRING",
            required: true,
            choices: [
                {
                    name: "Welcome Event",
                    value: "guildMemberAdd"
                },
                {
                    name: "Leave Event",
                    value: "guildMemberRemove"
                }
            ]
        }
    ],
    /**
     * 
     * @param { CommandInteraction } interaction 
     * @param { Client } sugarman 
     */
    execute(interaction, sugarman) {
        const choices = interaction.options.getString("member");

        switch(choices) {
            case "guildMemberAdd": {
                sugarman.emit("guildMemberAdd", interaction.member);
                interaction.reply({ content: "To Event πραγματοποιήθηκε.", ephemeral: true})
            }
            break;

            case "guildMemberRemove": {
                sugarman.emit("guildMemberRemove", interaction.member);
                interaction.reply({ content: "To Event πραγματοποιήθηκε.", ephemeral: true})
            }
            break;
        }
    }
}