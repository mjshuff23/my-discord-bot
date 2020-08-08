module.exports = {
    name: 'args-info',
    description: 'Information about arguments provided',
    execute(message, args, command, client) {
        if (!args.length) {
            return message.channel.send(`Cmon, ${message.author}, no arguments?`);
        } else if (args[0] === 'foo') {
            return message.channel.send('bar');
        }
        return message.channel.send(`# of Args: ${args.length}
        Args: ${args}`);
    },
};
