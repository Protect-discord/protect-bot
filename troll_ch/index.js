const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] });

client.on('ready', () => {
    console.log(`${client.user.tag} でログインしています。\nindex.js読み込み完了`)
    client.user.setActivity('protect discord', { type: 'PLAYING' });
})

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;
    if (interaction.commandName === 'help') {
        const embed = new Discord.MessageEmbed()
            .setTitle('🔨   HELP  /  ヘルプ   🔨')
            .setFields({name:"/setch", value:"実行したチャンネルを危険人物掲示板に設定します"},{name:"/addch", value:"危険人物掲示板に荒らしユーザーを報告する"})
            .setColor('YELLOW');
        interaction.channel.send({embeds:[embed]}).catch();
    };
    const embed_send = function (content, path) {
        const embed = new Discord.MessageEmbed()
            .setTitle(content)
            .setColor("RANDOM");
        path.reply({embeds:[embed]}).catch();
    };
    if (interaction.commandName === 'addch') {
        const ch_user = JSON.parse(fs.readFileSync(`db/ch_user.json`));
        const user = interaction.options.get('userid').value;
        const reason = interaction.options.get('reason').value;
        console.log(user, reason);
        if (!ch_user[user]) {
            client.channels.cache.get('1022755918682787890').send(`<@${user}>  /  ${user}  /  ${reason}`).catch();
            embed_send('✅    申請を送信しました    ✅', interaction);
        }
        else embed_send('●    既に登録されています    ●', interaction);
    };
    if (interaction.commandName === 'setch') {
        if (!interaction.member.permissions.has('ADMINISTRATOR')) return embed_send('🚨    設定は管理者権限を持っていないと出来ません    🚨', interaction);
        const ch_id = JSON.parse(fs.readFileSync(`db/ch_id.json`));
        if (!ch_id[interaction.channel.id]) {
            ch_id[interaction.channel.id] = true;
            embed_send('✅    設定しました    ✅', interaction);
            const list = fs.readFileSync(`db/list.txt`, 'utf-8');
            interaction.channel.send(String(list)).catch();
        }
        else embed_send('●    既に登録されています    ●', interaction);
        const savedata = JSON.stringify(ch_id);
        fs.writeFileSync(`db/ch_id.json`, savedata);
    };
});

client.on('messageCreate', async msg => {
    if (msg.author.bot || msg.guild.id !== "1022755915335741470") return;
    if (msg.content.startsWith('p#addch ')) {
        const ch_id = JSON.parse(fs.readFileSync(`db/ch_id.json`));
        const ch_user = JSON.parse(fs.readFileSync(`db/ch_user.json`));
        const args = msg.content.split(' ');
        if (!args[1] || !args[2] || !Number(args[1])) return msg.reply('エラー')
        const list = fs.readFileSync(`db/list.txt`, 'utf-8');
        const lists = `${list}\n<@${args[1]}> ∼理由∼ ${args[2]}`;
        ch_user[args[1]] = true;
        msg.reply('完了').catch();
        fs.writeFileSync(`db/list.txt`, lists);
        client.channels.cache.forEach(channel => {
            if (ch_id[channel.id] === true) {
                channel.send(`<@${args[1]}> ∼理由∼ ${args[2]}`).catch();
                return;
            } return;
        });
    };
});

client.login('TOKEN')
.catch(console.log('ログインエラー'));

/*
const data = [
    {
        name: "addch",
        description: "荒らしを掲示板に報告",
        options: [
            {
            type: "STRING",
            name: "userid",
            description: "報告するユーザーのID",
            required: true,
            },
            {
                type: "STRING",
                name: "reason",
                description: "報告する理由",
                required: true,
            },
        ],
    },
    {
        name: "setch",
        description: "危険人物掲示板に設定",
    }
];
client.application.commands.set(data);
*/
