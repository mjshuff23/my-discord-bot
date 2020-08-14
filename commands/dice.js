module.exports = {
    name: 'dice',
    description: 'Roll the dice!',
    aliases: ['roll', 'gamble'],
    usage: 'dice <1-100>',
    execute(message, args) {
        if (isNaN(args)) return;
        if (args > 100) {
            message.reply(`ready? Kenshin rolls your dice.....0! Grow up!`);
            return;
        }
        const diceResult = Math.floor(Math.random() * args + 1);
        message.reply(`ready? *Kenshin rolls your dice....${diceResult}!*`);
    }

}
