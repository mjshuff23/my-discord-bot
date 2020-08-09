module.exports = {
    name: 'birthday',
    description: "Display Bot and Server's creation dates",
    guildOnly: true,
    cooldown: 5,
    aliases: ['bday'],
    execute(message) {
        message.channel.send(`My birth date is ${message.client.user.createdAt}
and the Server's birth date ${message.guild.createdAt}!`);
    },
};
