module.exports = {
    name: 'colorChat',
    description: 'ADMIN ONLY -- Colored logging of server chat in terminal',
    guildOnly: true,
    execute(message) {
        let Reset = "\x1b[0m";
        let Bright = "\x1b[1m";
        let Dim = "\x1b[2m";
        let Underscore = "\x1b[4m";
        let Blink = "\x1b[5m";
        let Reverse = "\x1b[7m";
        let Hidden = "\x1b[8m";
        // REFERENCES TO NODE COLORING
        let FgBlack = "\x1b[30m";
        let FgRed = "\x1b[1;31m";
        let FgGreen = "\x1b[1;32m";
        let FgYellow = "\x1b[1;33m";
        let FgBlue = "\x1b[1;34m";
        let FgMagenta = "\x1b[1;35m";
        let FgCyan = "\x1b[1;36m";
        let FgWhite = "\x1b[1;37m";
        // REFERENCES TO NODE COLORING
        let BgBlack = "\x1b[40m";
        let BgRed = "\x1b[41m";
        let BgGreen = "\x1b[42m";
        let BgYellow = "\x1b[43m";
        let BgBlue = "\x1b[44m";
        let BgMagenta = "\x1b[45m";
        let BgCyan = "\x1b[46m";
        let BgWhite = "\x1b[47m";
        // LOGGING CHAT IN VS CODE -- DO NOT DELETE THIS
        if (message.author.username === 'Himura Kenshin') {
        console.log(FgRed, `${message.author.username}`, FgWhite, ` says '`, FgGreen, `${message.content}`, Reset, `'`);
        } else {
            console.log(FgWhite, `${message.author.username} says '`, FgGreen, `${message.content}`, Reset, `'`);
        }
    },
};
