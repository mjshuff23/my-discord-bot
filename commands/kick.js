module.exports = {
    name: 'kick',
    description: 'Kick mentioned user(s)',
    execute(message, args, command, client) {
        const taggedUser = message.mentions.users.first();
        let mentionsSize = message.mentions.users.size;
        if (mentionsSize === 0) {
            return message.reply(`You need to tag a user if you want to kick someone. Orooroooo -_-`);
        } else {
            message.channel.send(`You wanted to kicked ${taggedUser.username}?`);
        }
    },
};
