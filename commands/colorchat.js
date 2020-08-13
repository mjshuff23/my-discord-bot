const chalk = require('chalk');
module.exports = {
    name: 'colorchat',
    description: 'ADMIN -- Colored logging of server chat in terminal',
    guildOnly: true,
    execute(message) {
        const admins = ['Himura Kenshin', 'Yokito', 'Mark', 'Manuel Alba', 'Bgoonz', 'Cole'];
        // LOGGING CHAT IN VS CODE -- DO NOT DELETE THIS
        if (admins.includes(message.author.username)) {
            console.log(`${chalk.redBright(message.author.username)} says '${chalk.greenBright(message.content)}'`);
        } else {
            console.log(`${chalk.whiteBright(message.author.username)} says '${chalk.greenBright(message.content)}'`);
        }
    },
};
