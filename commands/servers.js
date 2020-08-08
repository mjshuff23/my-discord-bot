module.exports = {
    name: 'servers',
    description: 'Displays servers on server side for me',
    execute(message, args, command, client) {
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
