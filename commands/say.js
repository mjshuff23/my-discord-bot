
module.exports = {
    name: 'say',
    description: 'triggered emoji reactions',
    cooldown: 5,
    execute (_, args) {
        const { client }  = require('../myBot.js');
        let oroEmoji = client.emojis.cache.get('742863915523768331');
        let reply = `${oroEmoji}: ` + args.join(' ');
        let homeChan = client.channels.cache.get('733491269216763969');
        homeChan.send(reply);
    },
};
