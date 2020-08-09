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


function advertise() {
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

    return mySite;
}
// Happens once at login
client.once('ready', () => {
    const homeChannel = client.channels.cache.get("733491269216763969");
    console.log("Connected as " + client.user.username);
    homeChannel.send(`Kon'nichiwa sekai! I am ${client.user.username}!`);
    homeChannel.send(advertise());
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
