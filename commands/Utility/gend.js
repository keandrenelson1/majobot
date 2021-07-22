const Discord = require("discord.js");

module.exports = {
 name: "gend",
 aliases: ["giveaway-end"],
 description: "Ends a giveaway",
 category: "Utility",
 usage: "gend <giveaway id>",
 run: async (client, message, args) => {
  try {
   const messageID = args[0];
   if (!messageID) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: "<:error:860884617770303519> | Please enter a giveaway message ID",
     },
    });
   }
   let giveaway = client.giveawaysManager.giveaways.find((g) => g.guildID === message.guild.id && g.prize === args.join(" ")) || client.giveawaysManager.giveaways.find((g) => g.guildID === message.guild.id && g.messageID === args[0]);
   if (!giveaway) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: "<:error:860884617770303519> | Unable to find a giveaway for `" + args.join(" ") + "`.",
     },
    });
   }
   client.giveawaysManager
    .end(messageID)
    .then(() => {
     return message.lineReply({
      embed: {
       color: 16734039,
       description: "✨ | Success! Giveaway ended!",
      },
     });
    })
    .catch((err) => {
     return message.lineReply({
      embed: {
       color: 16734039,
       description: "<:error:860884617770303519> | No giveaway found for " + messageID + ", please check and try again",
      },
     });
    });
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
