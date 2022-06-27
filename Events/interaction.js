const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} sugarman 
     */
    async execute(interaction, sugarman) {
        if (interaction.isCommand()) {
            const command = sugarman.commands.get(interaction.commandName);
            if(!command) return interaction.reply({ embeds: [
                new MessageEmbed()
                .setColor("RED")
                .setDescription("⛔ An error occured while running this command.")
            ]}) && sugarman.commands.delete(interaction.commandName);

            command.execute(interaction, sugarman);
        }
    }
}