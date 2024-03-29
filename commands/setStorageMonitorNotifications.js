const fs = require("fs");

const Tools = require("./../tools/tools.js");

const prefix = Tools.readJSON("./config.json").general.prefix;
const help = `\
This command lets you set the Storage Monitor Notifications to enable/disable.

**To turn off Storage Monitor Notifications**:
    ${prefix}setStorageMonitorNotifications false

**To turn on Storage Monitor Notifications**:
    ${prefix}setStorageMonitorNotifications true`

module.exports = {
    name: "setStorageMonitorNotifications",
    description: "Set Storage Monitor Notifications enable/disable.",
    help: help,
    execute(author, message, channel, args, discordBot, rustplus) {
        /* Read the config.json file. */
        let config = Tools.readJSON("./config.json");

        /* Verify that the number of arguments is 1. */
        if (args.length != 1) {
            Tools.print("ERROR", "1 argument required. Example: " + config.general.prefix +
                "setStorageMonitorNotifications true.", channel);
            return false;
        }

        if (!Tools.isStringBool(args[0])) {
            Tools.print("ERROR", "Argument is not of boolean type.", channel);
            return false;
        }

        config.storageMonitors.enabled = args[0];
        fs.writeFileSync("./config.json", JSON.stringify(config, null, 2));

        Tools.print("Successfully Set", "Storage Monitor Notifications was set to **" + args[0] + "**.", channel);

        return true;
    },
};
