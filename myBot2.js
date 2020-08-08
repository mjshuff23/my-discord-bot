let Reset = "\x1b[0m";
let Bright = "\x1b[1m";
let Dim = "\x1b[2m";
let Underscore = "\x1b[4m";
let Blink = "\x1b[5m";
let Reverse = "\x1b[7m";
let Hidden = "\x1b[8m";
// REFERENCES TO NODE COLORING
let FgBlack = "\x1b[30m";
let FgRed = "\x1b[1;31m";
let FgGreen = "\x1b[1;32m";
let FgYellow = "\x1b[1;33m";
let FgBlue = "\x1b[1;34m";
let FgMagenta = "\x1b[1;35m";
let FgCyan = "\x1b[1;36m";
let FgWhite = "\x1b[1;37m";
// REFERENCES TO NODE COLORING
let BgBlack = "\x1b[40m";
let BgRed = "\x1b[41m";
let BgGreen = "\x1b[42m";
let BgYellow = "\x1b[43m";
let BgBlue = "\x1b[44m";
let BgMagenta = "\x1b[45m";
let BgCyan = "\x1b[46m";
let BgWhite = "\x1b[47m";
// LOAD INITIAL REQUIREMENTS
const fs = require('fs');   // Import File System module
const Discord = require('discord.js');  // Import discord.js(v12)
const { prefix, token } = require('./config.json'); // destructure elements from config
const client = new Discord.Client();    // Create new Client
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
//////////////////////////////////////////////////////////////////////////////////////////
client.once('ready', () => {
    console.log(`Connected as ${client.user.username}`);
    const homeChannel = client.channels.cache.get("733491269216763969");
    homeChannel.send(`Kon'nichiwa sekai! I am ${client.user.username}!`);
});


client.on('message', message => {
// LOGGING CHAT IN VS CODE -- DO NOT DELETE THIS
    if (message.author.username === 'Himura Kenshin') {
        console.log(FgRed, `${message.author.username}`, FgWhite, ` says '`, FgGreen, `${message.content}`, Reset, `'`);
    } else {
        console.log(FgWhite, `${message.author.username} says '`, FgGreen, `${message.content}`, Reset, `'`);
    }
//////////////////////////////////////////////////////////////////////////////////////////
    // Short-Circuit if message doesn't start w/ a prefix or sent from bot
    if (!message.content.startsWith(prefix) || message.author.bot) { return; }
    // Slice off prefix entirely, remove whitespaces, split into array by spaces
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    // Pull first item from array and make it all lower case
    const command = args.shift().toLowerCase();

	if (command === 'ping') {
		message.channel.send('Pong.');
	} else if (command === 'beep') {
		message.channel.send('Boop.');
	} else if (command === 'args-info') {
        if (!args.length) {
            return message.channel.send(`Cmon, ${message.author}, no arguments??`);
        }
        message.channel.send(`Command name: ${command}\nArguments: ${args}`);
        if (args[0] === 'foo') {
            return message.channel.send('bar');
        }
        return message.channel.send(`Args Length: ${args.length}`);
    } else if (command === 'kick') {
        // Grab the first user mentioned
        const taggedUser = message.mentions.users.first();
        // Confirm check and kick
        if (!message.mentions.users.size) {
            return message.reply(`You need to tag a user if you want to kick someone. Oro -_-`);
        } else {
            message.channel.send(`You wanted to kick: ${taggedUser.username}?`);
        }
    } else if (command === 'avatar') {
        if (!message.mentions.users.size) {
            return message.channel.send(`Your avatar: <${message.author.displayAvatarURL({ format: "png", dynamic: true})}`);
        }
        const avatarList = message.mentions.users.map( user => {
            return `${user.username}'s avatar: <${user.displayAvatarURL({ format: "png", dynamic: true })}`;
        });
        message.channel.send(avatarList);
    } else if (command === 'servers') {
        listServers();
    } else if (command === 'prune') {
        const amount = parseInt(args[0]) + 1;

        if (isNaN(amount)) {
            return message.reply(`That doesn't seem to be a valid number.`);
        } else if (amount <= 1 || amount > 100) {
            return message.reply(`Appropriate range is between 1-99 (Inclusive)`);
        } else {
            // True gives permission to stop once reaching messages
            // older than 2 weeks(Will throw an error)
            message.channel.bulkDelete(amount, true).catch(err => {
                console.log(err);
                message.channel.send(`There was an error trying to prune messages in this channel!`);
            });
        }
    } else  if (command === 'birthday') {
        message.channel.send(`My birth date is ${client.user.createdAt}
and the Server's birth date ${message.guild.createdAt}!`);
    } else if (command === 'region') {
        message.channel.send(`Apparently, our region is ${message.guild.region}`);
    } else if (command === 'serv') {
		message.channel.send('Server name: ' + message.guild.name + '\nTotal members: ' + message.guild.memberCount);
	} else if (command === 'user-info') {
		message.channel.send('Your username: ' + message.author.username + '\nYour ID: ' + message.author.id);
	}
	// other commands...
});

// Lists current servers and their channels -- May need reworked
function listServers() {
    // List servers
    console.log(`Servers:`);
    client.guilds.cache.forEach((guild) => {
        console.log(" - " + guild.name);

        // List all channels
        guild.channels.cache.forEach((channel) => {
            console.log(` -- ${channel.name} (${channel.type}) ${channel.id}`);
        });

    });
}
client.login(token);
