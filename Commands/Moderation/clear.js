const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "clear",
    description: "Διαγράφει τα μηνυμάτα από ένα κανάλι ή χρήστη.",
    permission: "MANAGE_MESSAGES",
    options: [
        {
            name: "amount",
            description: "Πόσα μηνύματα θέλετε να σβήσετε από το κανάλι ή από τον χρήστη;",
            type: "NUMBER",
            required: true
        },
        {
            name: "target",
            description: "Επέλεξε τον χρήστη που θέλεις να σβήσεις τα μηνύματα του.",
            type: "USER",
            required: false
        }
    ],

    /**
     * 
     * @param { CommandInteraction } interaction 
     */
    async execute(interaction) {
        const { channel, options } = interaction;

        const Amount = options.getNumber("amount");
        const Target = options.getMember("target");

        const Messages = await channel.messages.fetch();

        const Response = new MessageEmbed()
        .setColor("LUMINOUS_VIVID_PINK")

        if(Target) {
            let i = 0;
            const filtered = [];
            (await Messages).filter((m) => {
                if(m.author.id === Target.id && Amount > 1){
                    filtered.push(m);
                    i++;
                }
            });

            await channel.bulkDelete(filtered, true).then(messages => {
                Response.setDescription(`Σβήστηκαν ${messages.size} μηνύματα από τον ${Target}.`);
                interaction.reply({ embeds: [Response], ephemeral: true});
            })
        } else {
            await channel.bulkDelete(Amount, true).then(messages => {
                Response.setDescription(`Σβήστηκαν ${messages.size} μηνύματα από αυτό το κανάλι.`);
                interaction.reply({ embeds: [Response], ephemeral: true});
            })
        }
    }
}