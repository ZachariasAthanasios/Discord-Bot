const { CommandInteraction, MessageEmbed, Options } = require("discord.js");

module.exports = {
    name: "suggest",
    description: "Προτείνε μας κάτι ώστε να γίνουμε καλύτεροι!",
    options: [
        {
            name: "type",
            description: "Διάλεξε τι είδος πρόταση είναι.",
            required: true,
            type: "STRING",
            choices: [
                {
                    name: "Command",
                    value: "Command"
                },
                {
                    name: "Event",
                    value: "Event"
                },
                {
                    name: "Άλλο",
                    value: "Other"
                },
            ]
        },
        {
            name: "name",
            description: "Δώσε έναν τίτλος στην πρόταση σου.",
            required: true,
            type: "STRING",
        },
        {
            name: "functionality",
            description: "Περιέγραψε την λειτουργικότητα της πρότασης σου.",
            required: true,
            type: "STRING",
        },
    ],

    /**
     * 
     * @param { CommandInteraction } interaction 
     */
    async execute(interaction) {
        const { options } = interaction;

        const type = options.getString("type");
        const name = options.getString("name");
        const funcs = options.getString("functionality");

        const SuggestResponce = new MessageEmbed()
        .setColor("#00FFC3")
        .setTitle("Νέα Πρόταση")
        .setDescription(`Ο ${interaction.member} μόλις πρότεινε ένα: **${type}**`)
        .addField(`**${type}**:`, `${name}`)
        .addField("Λεπτομέρειες", `${funcs}`)
        .setFooter({ text: "𝗦𝘂𝗴𝗮𝗿𝗺𝗮𝗻©", iconURL: 'https://cdn.discordapp.com/attachments/989043665383092304/989887434764472450/logo.png'})
        .setTimestamp()
        
        const message = await interaction.reply({ embeds: [SuggestResponce], fetchReply: true });
        message.react("🟢");
        message.react("🔴");
    }
}