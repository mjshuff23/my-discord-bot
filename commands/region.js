module.exports = {
    name: 'region',
    description: 'Display Server Region',
    guildOnly: true,
    aliases: ['area', 'where'],
    cooldown: 5,
    execute(message) {
        message.channel.send(`We are located in the ${message.guild.region} Region.`);
    },
};
