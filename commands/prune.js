module.exports = {
    name: 'prune',
    description: 'ADMIN ONLY -- Deletes desired amount of previous chat lines',
    args: true,
    usage: '<1-99>',
    aliases: ['rm'],
    guildOnly: true,
    cooldown: 5,
    execute(message, args) {
        // Make sure they're an administrator - member.roles.cache.some(role => role.name === 'Mod');
        if (message.author.id !== message.channel.guild.ownerID) {
            return message.reply(`You don't have a sufficient role privelage`);
        }
        const amount = parseInt(args[0]) + 1;

        if (isNaN(amount)) {
            return message.reply(`That doesn't seem to be a valid number.`);
        } else if (amount <= 1 || amount > 100) {
            return message.reply(`Appropriate range is between 1-99 (Inclusive)`);
        } else {
            // True gives permission to stop once reaching messages
            // older than 2 weeks(Will throw an error)
            message.channel.bulkDelete(amount, true).catch(err => {
                console.log(err);
                message.channel.send(`There was an error trying to prune messages in this channel!`);
            });
        }
    },
};
