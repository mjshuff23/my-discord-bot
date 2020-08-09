const fs = require('fs');   // Import File System module
const Discord = require('discord.js');    // Import discord.js12
const { prefix, token }  = require('./config.json'); // destructure elements from config

const client = new Discord.Client();      // Create new client
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

client.once('ready', () => {
    console.log("Connected as " + client.user.username);
    const homeChannel = client.channels.cache.get("733491269216763969");
    // homeChannel.send(`Kon'nichiwa sekai! I am ${client.user.username}!`);
});

client.on('message', message => {
    // Logs color chat
    client.commands.get('colorChat').execute(message);
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) {
        message.reply(`Oro, I don't think ${commandName} is something I can do!`);
        return;
    }

    const command = client.commands.get(commandName);

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

    if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

            if (now <  expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return message.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \'${command.name}\' command.`);
            }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => {
        timestamps.delete(message.author.id);
    }, cooldownAmount);

    try {
	    command.execute(message, args, command, client);
    } catch (error) {
	console.error(error);
	message.reply('there was an error trying to execute that command!');
    }
});
client.login(token);         // login to Discord with your app's token
