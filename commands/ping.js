module.exports = {
    name: 'ping',
    description: 'Ping!',
    execute(message, args, command, client) {
        message.channel.send('Pong.');
    },
};
