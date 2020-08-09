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
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}
// Happens once at login
client.once('ready', () => {
    console.log("Connected as " + client.user.username);
    const homeChannel = client.channels.cache.get("733491269216763969");
    homeChannel.send(`Kon'nichiwa sekai! I am ${client.user.username}!`);
});
// Happens for every message happening in the server
client.on('message', message => {
    // Logs color chat
    client.commands.get('colorChat').execute(message);
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    // Separate command name and arguments to pass it
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;
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
client.login(token);         // login to Discord with your app's token
