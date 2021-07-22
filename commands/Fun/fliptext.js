const Discord = require("discord.js");
const flip = require("flip-text");

module.exports = {
 name: "fliptext",
 aliases: [],
 description: "Flip some text",
 category: "Fun",
 usage: "fliptext <text>",
 run: async (client, message, args) => {
  try {
   if (!args[0]) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: "<:error:860884617770303519> | You must provide a text!",
     },
    });
   }
   const max = 50;
   if (args.lenght > max)
    return message.lineReply({
     embed: {
      color: 16734039,
      description: `<:error:860884617770303519> | The max lenght for text is ${max} letters!`,
     },
    });
   var flipped = [];
   args.forEach((arg) => {
    flipped.push(flip(arg));
   });
   const embed = new Discord.MessageEmbed() // Prettier()
    .setColor("RANDOM")
    .addField("↕️ | Flipped text", "```" + flipped.join(" ") + "```")
    .setFooter(
     "Requested by " + `${message.author.username}`,
     message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     })
    )
    .setTimestamp();
   await message.lineReply(embed);
  } catch (err) {
   message.lineReply({
    embed: {
     color: 16734039,
     description: "Something went wrong... :cry:",
    },
   });
  }
 },
};
