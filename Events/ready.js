const { Client } = require("discord.js");
const mongoose = require("mongoose");
const MONGODBURL = process.env.MONGODBURL;

module.exports = {
    name: "ready",
    once: true,
    /**
     * 
     * @param { Client } sugarman 
     */
    execute(sugarman) {
        console.log("Sugarman είναι Online!");
        sugarman.user.setPresence({ activities: [{ name: `𝗦𝘂𝗴𝗮𝗿𝗺𝗮𝗻©`, type: `WATCHING` }], status: 'dnd' });

        // MongoDB Connection
        if (!MONGODBURL) return;
        mongoose.connect(MONGODBURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then( () => {
            console.log("Sugarman είναι συνδεδεμένος με την βάση δεδομένων!");
        }).catch( (err) => {
            console.log(err);
        });
    }
}