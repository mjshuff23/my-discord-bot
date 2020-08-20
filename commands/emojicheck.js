module.exports = {
    name: 'emojicheck',
    description: 'Apply appropriate emoji responses.',
    cooldown: 5,
    aliases: ['emoji', 'react'],
    execute(message) {
        if (message.author.id === '711654464758480958') {
            message.react('⚔️'); // - me first
        } else if (message.author.id === '508405190446022679') {
            message.react('🥃'); // - Mark
        } else if (message.author.id === '732256817857691689') {
            message.react('🎸'); // - Bryan
        } else if (message.author.id === '725078271405981708') {
            message.react('🥔'); // - Melody
        } else if (message.author.id === '556353127607959583') {
            message.react('🤖'); // - Robot Dude
        } else if (message.author.id === '741521468550283384') {
            // message.react('742863915523768331') // Kenshin
        } else if (message.author.id === '339143759600025602') {
            message.react('🦌')
        }
    },
};
