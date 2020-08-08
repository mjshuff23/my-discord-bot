module.exports = {
    name: 'user-info',
    description: 'Report user info to user',
    execute(message) {
		message.channel.send('Your username: ' + message.author.username + '\nYour ID: ' + message.author.id);
    },
};
