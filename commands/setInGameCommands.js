const fs = require("fs");

const Tools = require("./../tools/tools.js");

const prefix = Tools.readJSON("./config.json").general.prefix;
const help = `\
This command lets you set the In-Game commands ability to enable/disable.

**To turn off In-Game commands**:
    ${prefix}setInGameCommands false

**To turn on In-Game commands**:
    ${prefix}setInGameCommands true`

module.exports = {
    name: "setInGameCommands",
    description: "Set In-Game commands enable/disable.",
    help: help,
    execute(author, message, channel, args, discordBot, rustplus) {
        /* Read the config.json file. */
        let config = Tools.readJSON("./config.json");

        /* Verify that the number of arguments is 1. */
        if (args.length != 1) {
            Tools.print("ERROR", "1 argument required. Example: " + config.general.prefix +
                "setInGameCommands true.", channel);
            return false;
        }

        if (!Tools.isStringBool(args[0])) {
            Tools.print("ERROR", "Argument is not of boolean type.", channel);
            return false;
        }

        config.general.inGameCommands = args[0];
        fs.writeFileSync("./config.json", JSON.stringify(config, null, 2));

        Tools.print("Successfully Set", "In-Game commands was set to **" + args[0] + "**.", channel);

        return true;
    },
};
