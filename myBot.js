/*******************************FILE IMPORTS*****************************************/
const fs = require('fs');                              // Import File System module
const Discord = require('discord.js');                 // Import discord.js12
const { prefix, token }  = require('./config.json');   // destructure elements from config
// Initialize new clients and collections
const client = new Discord.Client();
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();
// Read commands directory and add js files to variable
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
// Import each command file and set them as well
for (let file of commandFiles) {
    console.log(`loading ${file}`);
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}
/**************************************************************************************/

// Happens once at login
client.once('ready', () => {
    // Grab home channel ID and Announce successful login
    let homeChan = client.channels.cache.get("733491269216763969");
    let sendmessage = client.commands.get('sendmessage');
    sendmessage.execute(null, `test Hello channel #${homeChan.id}!! Where is my homie ${homeChan.guild.owner}?`);

    // Starts a timer clock for alarms on reports and breaks
    let startClock = setInterval(checkTime, 1000);
});

// Happens for every message happening in the server
client.on('message', message => {
    // Emojis for the BOYS
    client.commands.get('emojicheck').execute(message);

    // Chat logging into terminal any non prefixed chat
    // Change the || to && if you want to remove bot chat
    if (!message.content.startsWith(prefix) || message.author.bot) {
        client.commands.get('colorchat').execute(message);
        return;
    }

    // Separate command name and arguments to pass it,
    //  regardless of amount of whitespace between arguments
    // Ask TA for explanation
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    // Grab a command by it's name or it's aliases
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));


    if (!command) {                // If the command wasn't found, let's inform them.
        message.reply(`Orooooo.....!${commandName} is not a valid command and has no aliases.`);
        return;
    }

    if (command === 'advertise') {
        // Only I can use advertise, which sends embedded messages, bc idk them yet
        if (isYokito(message)) {
            try {
                command.execute(message, args); return;
            } catch (error) {
            console.error(error);
            message.reply(`there was an error trying to execute ${commandName}!`);
            }
        }
        return;
    }

    // Check if command is server only
    if (command.guildOnly && message.channel.type !== 'text') {
        return message.reply(`I can't execute that command inside DMs!`);
    }

    // Check if correct arguments are provided
    if (command.args && !args.length) {
        let reply = `You didn't provide the correct arguments, ${message.author}!`;
        if (command.usage) {   // Provide correct usage to user if we provided it in file
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }
        return message.channel.send(reply);
    }

    // Check if the command has cooldown set, if not, set one
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    // Set variables to measure cooldown, set cooldown to 3s if not provided
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    // Check if user has a cooldown on that command
    if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
            if (now <  expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return message.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \'${command.name}\' command.`);
            }
    }

    // Set a timer to delete the cooldown timestamp when time is us
    timestamps.set(message.author.id, now);
    setTimeout(() => {
        timestamps.delete(message.author.id);
    }, cooldownAmount);

    // Execution time baby
    try {
	    command.execute(message, args);
    } catch (error) {
	    console.error(error);
	    message.reply('there was an error trying to execute that command!');
    }
});

// This is required to login
client.login(token)

// Daily Report and Lunch
function checkTime() {
    // Grab current time
    const timeNow = new Date(),
          seconds = timeNow.getSeconds(),
          minutes = timeNow.getMinutes(),
          hours = timeNow.getHours();

    // Check for multiple alarms
    if (hours === 10 && minutes === 50 && seconds === 0) {
        sendmessage(null, "home Don't forget your reports!");
        sendmessage(null, "arg Don't forget your reports!");
    } else if (hours === 20 && minutes === 30 && seconds === 0) {
        sendmessage(null, "home Don't forget your reports!");
        sendmessage(null, "aug Don't forget your reports!");
    } else if (hours === 14 && minutes === 15 && seconds === 0) {
        sendmessage(null, "home Lunch Time!");
        sendmessage(null, "aug Lunch Time!");
    } else if (hours === 17 && minutes === 45 && seconds === 0) {
        sendmessage(null, "home Break time!");
        sendmessage(null, "aug Break time!");
    }
}

function isYokito(message) {
    if (message.author.id !== '711654464758480958') {
        message.reply(`Sorry, ${message.author} only Yokito can use this command.`);
        return false;
    } else {
        console.log(`${message.author} is Yokito`);
        return true;
    }
}

module.exports = {
    client: client,
}
