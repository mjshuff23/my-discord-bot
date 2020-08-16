const Discord = require('discord.js');
module.exports = {
    name: 'advertise',
    description: 'send channel an embedded message',
    guildOnly: true,
    cooldown: 30,
    aliases: ['adv', 'therapy'],
    execute(message) {
        const mySite = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle("Shuff's Domain")
        .setURL('http://www.mikeshuff.com/')
        .setAuthor('Michael Shuff', 'http://www.mikeshuff.com/images/shuff.png', 'http://www.mikeshuff.com')
        .setDescription('You already know')
        .setThumbnail('http://www.mikeshuff.com/images/shuff.png')
        .addFields(
            { name: 'My Web Site', value: 'Excelsior!' },
            { name: '\u200B', value: '\u200B' },
            { name: 'Goals:', value: 'Master JS', inline: true },
            { name: 'Goals:', value: 'Graduate a/A', inline: true },
        )
        .addField('Goals:', 'Help the World', true)
        .setImage('https://i.redd.it/4k6dnuykmna51.jpg')
        .setTimestamp()
        .setFooter('Patent Pending dont rob me mafucka', 'http://www.mikeshuff.com/images/shuff.png');

        const { client }  = require('../myBot.js');
        return client.channels.cache.get('741711523059335168').send(mySite);
    }
};
