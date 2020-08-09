module.exports = {
    name: 'servers',
    description: 'ADMIN ONLY -- Displays servers & channels in terminal',
    guildOnly: true,
    execute() {
        // List servers
        console.log(`Servers:`);
        client.guilds.cache.forEach((guild) => {
            console.log(" - " + guild.name);

            // List all channels
            guild.channels.cache.forEach((channel) => {
                console.log(` -- ${channel.name} (${channel.type}) ${channel.id}`);
            });
        });
    },
};
