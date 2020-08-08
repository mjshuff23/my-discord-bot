module.exports = {
    name: 'birthday',
    description: "Display Bot and Server's creation dates",
    execute(message, args, command, client) {
        message.channel.send(`My birth date is ${client.user.createdAt}
and the Server's birth date ${message.guild.createdAt}!`);
    },
};
