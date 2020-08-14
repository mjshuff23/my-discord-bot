
module.exports = {
    name: 'say',
    description: 'triggered emoji reactions',
    cooldown: 5,
    execute(message, args) {
            const { client }  = require('../myBot.js');
            // let homeChan = message.author.channels.cache.get("");
            let oroEmoji = client.emojis.cache.get('742863915523768331');
            let reply = `${oroEmoji}: ` + args.join(' ');
            // client.channels.cache.get('733491269216763969').send(args.join(' '));
            client.channels.cache.get('733491269216763969').send(reply);
            // message.channel.send(args.join(' '));

    },
};
