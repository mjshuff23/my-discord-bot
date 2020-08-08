module.exports = {
    name: 'beep',
    description: 'Beep!',
    execute(message, args, command, client) {
        message.channel.send('Boop.');
    },
};
