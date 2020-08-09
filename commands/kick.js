module.exports = {
    name: 'kick',
    description: 'Kick mentioned user(s)',
    guildOnly: true,
    cooldown: 5,
    aliases: ['boot', 'smash'],
    execute(message) {
        const taggedUser = message.mentions.users.first();
        let mentionsSize = message.mentions.users.size;
        if (message.author.id !== message.guild.ownerID) {
            return message.reply(`You don't have a sufficient role privelage`);
        }
        if (mentionsSize === 0) {
            return message.reply(`You need to tag a user if you want to kick someone. Orooroooo -_-`);
        } else {
            message.channel.send(`You wanted to kicked ${taggedUser.username}?`);
        }
    },
};
