module.exports = {
    name: 'beep',
    description: 'Beep!',
    cooldown: 5,
    execute(message) {
        message.channel.send('Boop.');
    },
};
