const fs = require('fs');   // Import File System module
const Discord = require('discord.js');    // Import discord.js12
const { prefix, token }  = require('./config.json'); // destructure elements from config
// Initialize new clients and collections
const client = new Discord.Client();
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();
// Read commands directory and add js files to variable
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
// Import each command file and set them as well
for (let file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// Happens once at login
client.once('ready', () => {
    console.log("Connected as " + client.user.username);
    setInterval(checkTime, 1000);
    client.channels.resolveID()
});

// Happens for every message happening in the server
client.on('message', message => {
    // Emojis for the BOYS
    if (message.author.id === '711654464758480958') {
        message.react('😤'); // - me first
    } else if (message.author.id === '508405190446022679') {
        message.react('🥃'); // - Mark
    } else if (message.author.id === '732256817857691689') {
        message.react('🎸'); // - Bryan
    } else if (message.author.id === '725078271405981708') {
        message.react('🥔');
    } else if (message.author.id === '556353127607959583') {
        message.react('🤖');
    } else if (message.author.id === '741521468550283384') {
        message.react('742863915523768331')
    }
    // Test this out and see if this is still a good combo check and/or location for this
    if (!message.content.startsWith(prefix) || message.author.bot) {
        // Chat logging into terminal
        client.commands.get('colorchat').execute(message);
        return;
    }
    // Separate command name and arguments to pass it
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    // Grab a command by it's name or it's aliases
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;
        // Only server owner can use advertise, which sends embedded messages
    if (commandName === 'advertise') {
        if (message.author.id !== message.guild.ownerID) {
            message.reply(`Sorry, only ${message.guild.owner} can use advertise`);
        } else {
            try {
                command.execute(message, args); return;
            } catch (error) {
            console.error(error);
            message.reply('there was an error trying to execute that command!');
            }
        }
    }
    // Check if command is server only
    if (command.guildOnly && message.channel.type !== 'text') {
        return message.reply(`I can't execute that command inside DMs!`);
    }
    // Check if correct arguments are provided
    if (command.args && !args.length) {
        let reply = `You didn't provide the correct arguments, ${message.author}!`;
        // Provide correct usage to user
        if (command.usage) {
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

client.login(token)
// Daily Report and Lunch
function checkTime() {
    const homeChannel = client.channels.cache.get("733491269216763969");
    const timeNow = new Date();
    const seconds = timeNow.getSeconds();
    const minutes = timeNow.getMinutes();
    const hours = timeNow.getHours();
    if (hours === 10 && minutes === 50 && seconds === 00) {
        homeChannel.send("Don't forget your reports!");
        client.channels.cache.get('734851759708831805').send('Dont forget your reports!');
    }
    if (hours === 20 && minutes === 30 && seconds === 0) {
        homeChannel.send("Don't forget your reports!");
    }
    if (hours === 14 && minutes === 15 && seconds === 0) {
        homeChannel.send("Lunch time!");
    }
    if (hours === 17 && minutes === 45 && seconds === 0) {
        homeChannel.send("Break time!");
    }
    // if (hours === 22 && minutes === 03 && seconds === 15){
    // client.guilds.cache.forEach(guild => {
    //     client.users.cache.get(guild.ownerID).send("Important announcement!");
    // });}
}
