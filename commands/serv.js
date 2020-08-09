module.exports = {
    name: 'serv',
    description: 'Announce server and member count to room',
    guildOnly: true,
    aliases: ['slist'],
    cooldown: 5,
    execute(message) {
        message.channel.send('Server name: ' + message.guild.name + '\nTotal members: ' + message.guild.memberCount);
    },
};
