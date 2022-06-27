const { Client, MessageEmbed, CommandInteraction } = require("discord.js");
const { connection } = require("mongoose");
const { execute } = require("../../Events/ready");
require("../../Events/ready");

module.exports = {
    name: "status",
    description: "Δείχνει εάν το Bot είναι και πόση ώρα Online, εάν είναι συνδεδεμένο με την βάση δεδομένων",
    permission: "ADMINISTRATOR",

    /**
     * 
     * @param { CommandInteraction } interaction 
     * @param { Client } sugarman 
     */
    async execute(interaction, sugarman) {
        const Response = new MessageEmbed()
        .setColor("AQUA")
        .setDescription(`**Bot**: \` 🟢 Online\` - \`${sugarman.ws.ping}ms\` \n **Uptime**: <t:${parseInt(sugarman.readyTimestamp / 1000)}:R>\n
        **Database**: \`${switchTo(connection.readyState)}\``)

        interaction.reply({embeds: [Response]});
    }
}

function switchTo(val) {
    var status = " ";
    switch(val) {
        case 0: status = `🔴 ΑΠΟΣΥΝΔΕΔΕΜΕΝΗ`
        break;
        case 1: status = `🟢 ΣΥΝΔΕΜΕΝΗ`
        break;
        case 2: status = `🟠 ΣΥΝΔΕΕΤΑΙ`
        break;
        case 3: status = `🟣 ΑΠΟΣΥΝΔΕΕΤΑΙ`
        break;
    }
    return status;
}