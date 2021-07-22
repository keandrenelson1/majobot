const Discord = require("discord.js");

module.exports = {
 name: "unban",
 aliases: ["ub"],
 description: "Unbans a member from the server",
 category: "Moderation",
 usage: "unban <user> [reason]",
 run: async (client, message, args) => {
  try {
   const id = args[0];
   const rgx = /^(?:<@!?)?(\d+)>?$/;
   if (!id) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: "<:error:860884617770303519> | Please provide user id!",
     },
    });
   }
   if (!rgx.test(id)) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: "<:error:860884617770303519> | Please provide vaild user id!",
     },
    });
   }
   const bannedUsers = await message.guild.fetchBans();
   const user = bannedUsers.get(id).user;
   if (!user) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: "<:error:860884617770303519> | Unable to find user, please check the provided ID",
     },
    });
   }
   let reason = args.slice(1).join(" ");
   if (!reason) reason = "`None`";
   if (reason.length > 1024) reason = reason.slice(0, 1021) + "...";
   await message.guild.members.unban(user, reason);
   const embed = new MessageEmbed()
    .setTitle("Unbanned Member")
    .setDescription(`${user.tag} was successfully unbanned.`)
    .addField("Unnbaned by", message.member, true)
    .addField("Member", user.tag, true)
    .addField("Reason", reason)
    .setFooter(
     message.member.displayName,
     message.author.displayAvatarURL({
      dynamic: true,
     })
    )
    .setTimestamp()
    .setColor(message.guild.me.displayHexColor);
   message.lineReply(embed);
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
