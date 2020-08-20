const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token }  = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (let file of commandFiles) {
    console.log(`loading ${file}`);
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}



client.once('ready', () => {
    let homeChan = client.channels.cache.get("733491269216763969");
    let sendmessage = client.commands.get('sendmessage');
    // I use sendmessage in two places, so here we have to pass it null.
    sendmessage.execute(null, `test Hello channel #${homeChan.id}!! Where is my homie ${homeChan.guild.owner}?`);

    let alarmClock = setInterval(checkTime, 1000);
});


client.on('message', message => {

    client.commands.get('emojicheck').execute(message);

    if (!message.content.startsWith(prefix) || message.author.bot) {
        client.commands.get('colorchat').execute(message);
        return;
    }

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    commandRun(command, message, args, commandName);


});

client.login(token)

function checkTime() {
    const timeNow = new Date(),
          seconds = timeNow.getSeconds(),
          minutes = timeNow.getMinutes(),
          hours = timeNow.getHours();

    let sendmessage = client.commands.get('sendmessage');
    if (hours === 10 && minutes === 50 && seconds === 0) {
        sendmessage.execute(null, "home Don't forget your reports!");
        sendmessage.execute(null, "arg Don't forget your reports!");
    } else if (hours === 20 && minutes === 30 && seconds === 0) {
        sendmessage.execute(null, "home Don't forget your reports!");
        sendmessage.execute(null, "aug Don't forget your reports!");
    } else if (hours === 14 && minutes === 15 && seconds === 0) {
        sendmessage.execute(null, "home Lunch Time!");
        sendmessage.execute(null, "aug Lunch Time!");
    } else if (hours === 17 && minutes === 45 && seconds === 0) {
        sendmessage.execute(null, "home Break time!");
        sendmessage.execute(null, "aug Break time!");
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
// 60 lines of code for a function is too much, having issues refactoring successfully.
function commandRun(command, message, args, commandName) {
    if (!command) {
        message.reply(`Orooooo.....!${commandName} is not a valid command and has no aliases.`);
        return;
    }

    client.commands.get('prune').execute(message, '1');
    if (command === 'advertise') {
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
    if (command.guildOnly && message.channel.type !== 'text') {
        return message.reply(`I can't execute that command inside DMs!`);
    }

    if (command.args && !args.length) {
        let reply = `You didn't provide the correct arguments, ${message.author}!`;
        if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }
        return message.channel.send(reply);
    }

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

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

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
}

module.exports = {
    client: client,
}
