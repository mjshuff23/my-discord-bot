module.exports = {
    name: 'react',
    description: 'triggered emoji reactions',
    cooldown: 5,
    execute(message, args) {
            message.react('😄');
    },
};
