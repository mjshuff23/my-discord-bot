// LOAD INITIAL REQUIREMENTS
const fs = require('fs');   // Import File System module
const Discord = require('discord.js');    // Import discord.js12
const { prefix, token }  = require('./config.json'); // destructure elements from config
const client = new Discord.Client();      // Create new client
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    // set a new item in the collection
    // with the key as the command name and the value as the exported module
    client.commands.set(command.name, command);
}

client.once('ready', () => {    // this event will only trigger one time after logging in
    // Announce connection and list servers
    console.log("Connected as " + client.user.username);
    const homeChannel = client.channels.cache.get("733491269216763969");
    // homeChannel.send(`Kon'nichiwa sekai! I am ${client.user.username}!`);
});

client.on('message', message => {
    // Logs color chat
    client.commands.get('colorChat').execute(message);
    // Make sure we're dealing with a command not from a bot, then lowercasing the command
    if (!message.content.startsWith(prefix) || message.author.bot) { return; }
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) {
        message.reply(`Oro, I don't think ${commandName} is something I can do!`);
        return;
    }

    const command = client.commands.get(commandName);
    try {
	    command.execute(message, args, command, client);
    } catch (error) {
	console.error(error);
	message.reply('there was an error trying to execute that command!');
    }
});
client.login(token);         // login to Discord with your app's token
