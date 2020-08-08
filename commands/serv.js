module.exports = {
    name: 'serv',
    description: 'Announce server and member count to room',
    execute(message, args, command, client) {
        message.channel.send('Server name: ' + message.guild.name + '\nTotal members: ' + message.guild.memberCount);
    },
};
