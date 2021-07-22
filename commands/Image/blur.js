const Discord = require("discord.js");
const AmeClient = require("amethyste-api");
const AmeAPI = new AmeClient(process.env.AMEAPI);

module.exports = {
 name: "blur",
 aliases: [],
 description: "Blur the user avatar",
 category: "Image",
 usage: "blur [user mention, user id, user name] [blur]",
 run: async (client, message, args) => {
  try {
   const blur = args[0] || 50;
   if (args[0]) {
    if (isNaN(args[0])) {
     return message.lineReply({
      embed: {
       color: 16734039,
       description: "<:error:860884617770303519> | Blur must be a number!",
      },
     });
    }
    if (message.content.includes("-")) {
     return message.lineReply({
      embed: {
       color: 16734039,
       description: "<:error:860884617770303519> | Blur cannot be negative!",
      },
     });
    }
    if (args[0] < 2) {
     return message.lineReply({
      embed: {
       color: 16734039,
       description: "<:error:860884617770303519> | Blur must be higher than 2!",
      },
     });
    }
    if (args[0] > 30) {
     return message.lineReply({
      embed: {
       color: 16734039,
       description: "<:error:860884617770303519> | Blur must be lower than 30!",
      },
     });
    }
   }
   const User = (await message.mentions.members.first()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((r) => r.user.username.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.guild.members.cache.find((r) => r.displayName.toLowerCase().includes() === args.join(" ").toLocaleLowerCase());
   if (!User) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: "<:error:860884617770303519> | Please mention a user!",
     },
    });
   }
   const wait = await message.lineReply({
    embed: {
     color: 4779354,
     description: "✨ | Please wait... I'm generating your image",
    },
   });
   const buffer = await AmeAPI.generate("blur", {
    url: User.user.displayAvatarURL({
     format: "png",
     size: 2048,
    }),
    blur: blur,
   });
   const attachment = new Discord.MessageAttachment(buffer, "blur.png");
   message.channel.send(attachment);
  } catch (err) {
   console.log(err);
   message.lineReply({
    embed: {
     color: 16734039,
     description: "Something went wrong... :cry:",
    },
   });
  }
 },
};
