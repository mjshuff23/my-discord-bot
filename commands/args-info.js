module.exports = {
    name: 'args-info',
    description: 'Information about arguments provided',
    args: true,
    usage: '<arg1> <arg2> <arg3> ...',
    aliases: ['args'],
    cooldown: 5,
    execute(message, args) {
        if (args[0] === 'foo') {
            return message.channel.send('bar');
        }
        return message.channel.send(`# of Args: ${args.length}
        Args: ${args.join(', ')}`);
    },
};
