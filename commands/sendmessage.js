const { GuildMember } = require('discord.js');

module.exports = {
    name: 'sendmessage',
    description: 'Sends message to desired channel',
    cooldown: 3,
    guildOnly: false,
    aliases: ['message', 'msg'],
    args: true,
    usage: '<channel> <message>',
    execute (msg, args) {
        const { client }  = require('../myBot.js');
        // If it's not an array yet
        if (!Array.isArray(args)) {
            args = args.split(' ');
        }
        const msgChan = args.shift(); // First argument should be client
        const message = args.join(' '); // Join rest of words together
        let homeChan = client.channels.cache.get("733491269216763969"); // Home
        let testChan = client.channels.cache.get("741711523059335168"); // Test
        let augChan = client.channels.cache.get("734851759708831808");  // Aug Cohort
        // I am sure there's a better way than this if statement, but idk it yet.
        switch(msgChan) {
            case 'home':
            case 'Home':
                homeChan.send(message);
                break;
            case 'test':
            case 'Test':
                testChan.send(message);
                break;
            case 'aug':
            case 'Aug':
                augChan.send(message);
                break;
            default:
                homeChan.send(message);
                break;
        }
    },
};
