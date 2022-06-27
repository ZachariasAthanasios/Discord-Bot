const { Perms } = require("../Validation/PermissionNames");
const { Client } = require("discord.js");
const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);
const Ascii = require("ascii-table");

/**
 * 
 * @param { Client } sugarman 
 */
module.exports = async (sugarman) => {
    const Table = new Ascii("Commands");

    CommandsArray = [];

    (await PG(`${process.cwd().replace(/\\/g, '/')}/Commands/*/*.js`)).map(async (file) => {
        const command = require(file);

        if(!command.name) {
            return Table.addRow(file.split("/")[9], "⛔ ΑΠΟΤΥΧΙΑ", "❗ Λείπει το όνομα.");
        }

        if(!command.description) {
            return Table.addRow(command.name, "⛔ ΑΠΟΤΥΧΙΑ", "❗ Λείπει η περιγραφή.")
        }

        if(command.permission) {
            if(Perms.includes(command.permission)) {
                command.defaultPermission = false;
            } else {
                return Table.addRow(command.name, "⛔ ΑΠΟΤΥΧΙΑ", "❗ Τα permission δεν είναι σωστά.");
            }
        }

        sugarman.commands.set(command.name, command);
        CommandsArray.push(command);

        await Table.addRow(command.name, "✅ ΕΠΙΤΥΧΙΑ");
    });

    console.log(Table.toString());


    // PERMS CHECK
    sugarman.on("ready", async () => {
        const MainGuild = await sugarman.guilds.cache.get("988743812564258886");

        MainGuild.commands.set(CommandsArray).then(async (command) => {
            const Roles = (commandName) => {
                const cmdPerms = CommandsArray.find((c) => c.name === commandName).permission;
                if(!cmdPerms) {
                    return null;
                }

                return MainGuild.roles.cache.filter((r) => r.permissions.has(cmdPerms));
            }

            const fullPermissions = command.reduce((accumulator, r) => {
                const roles = Roles(r.name);
                if(!roles) {
                    return accumulator;
                }

                const permissions = roles.reduce((a, r) => {
                    return [...a, {id: r.id, type: "ROLE", permission: true}]
                }, []);

                return [...accumulator, {id: r.id, permissions}]
            }, []);

            // await MainGuild.commands.permissions.set({ fullPermissions });
        });
    });
}