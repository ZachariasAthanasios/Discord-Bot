const { Events } = require("../Validation/EventNames");
const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);
const Ascii = require("ascii-table");

module.exports = async (sugarman) => {
    const Table = new Ascii("Events");

    (await PG(`${process.cwd().replace(/\\/g, '/')}/Events/*.js`)).map(async (file) => {
        const event = require(file);

        if(!Events.includes(event.name) || !event.name) {
            const L = file.split("/");
            await Table.addRow(`${event.name || "ΛΕΙΠΕΙ"}`, `⛔ Το όνομα του Event είναι λάθος ή λείπει: ${L[6] + L[7]}`);
            return;
        }

        if(event.once) {
            sugarman.once(event.name, (...args) => event.execute(...args, sugarman));
        } else {
            sugarman.on(event.name, (...args) => event.execute(...args, sugarman));
        }

        await Table.addRow(event.name, "✅ ΕΠΙΤΥΧΙΑ ");
    });

    console.log(Table.toString());
}