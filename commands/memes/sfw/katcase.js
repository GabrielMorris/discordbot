// kat-ify text
exports.run = (client, message, args) => {
  const str = message.content
    .toLowerCase()
    .replace('--katcase ', '', -1)
    .replace(/-/g, '', -1);

  const messageString = str.toUpperCase();

  message.channel.send(messageString).catch(console.error);
};
