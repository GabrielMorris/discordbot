const Discord = require('discord.js');

// Change Kat's name
exports.run = (client, message, args) => {
  const guild = message.guild;
  let str = message.content.replace('--katname ', '', -1).replace(/-/g, '', -1);
  //371151824331210755
  const kat = guild.members.find(member => {
    return member.id === '371151824331210755';
  });

  if (str.length < 32) {
    kat
      .setNickname(str)
      .then(
        message.channel.send(
          `Updated <@371151824331210755>'s nickname to **${str}**! :D :D :D`
        )
      )
      .catch(err => {
        console.error(err);
      });
  } else {
    message.channel.send('Error: nick: Must be 32 or fewer in length.');
  }
};
