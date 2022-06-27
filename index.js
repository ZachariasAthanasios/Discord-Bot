const { Client, Collection } = require('discord.js');
const sugarman = new Client({ intents: 32767});
require("dotenv").config();

['Events', "Commands"].forEach(handler => {
    require(`./Handlers/${handler}`)(sugarman)
})

sugarman.commands = new Collection();

sugarman.login(process.env.DISCORD_TOKEN);