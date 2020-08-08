module.exports = {
    name: 'region',
    description: 'Display Server Region',
    execute(message) {
        message.channel.send(`We are locate in the ${message.guild.region} Region.`);
    },
};
