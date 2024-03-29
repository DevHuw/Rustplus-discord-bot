const Discord = require("discord.js");

const Main = require("./../rustplusDiscordBot.js");
const Tools = require("./../tools/tools.js");
const { version } = require("./../version.json");

const help = `\
This command prints this bots current version.`

module.exports = {
    name: "ver",
    description: "Obtain the bot version.",
    help: help,
    execute(author, message, channel, args, discordBot, rustplus) {
        Tools.print("VERSION", version);

        const embed = new Discord.MessageEmbed()
            .setColor("#ce412b")
            .attachFiles(Main.THUMBNAIL_DEFAULT)
            .setThumbnail("attachment://rust_logo.png")
            .setURL(Main.GITHUB_URL + "/releases/tag/v" + version)
            .setTitle("RustPlus-Discord-Bot Version")
            .setDescription("**" + version + "**")
            .setFooter("By Huw7737");

        channel.send(embed);
    },
};
