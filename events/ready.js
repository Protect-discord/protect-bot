const fs = require("node:fs")
const { Collection } = require("discord.js");

let data = [];
commands = new Collection();
let folders = fs.readdirSync(`commands/`);
folders.forEach((folder) => {
    if (folder == "disable") return;
    fs.readdir(`commands/${folder}`, (err, files) => {
        console.log(`[Slash Command Manager]: Loading folder ${folder}`);
        files.forEach(async (file) => {
            if (!file.endsWith(".js")) return;
            let props = require(`../commands/${folder}/${file}`);
            //コマンド追加 Builderにするなら次の行は消して
            data.push(props.data);
            let commandName = file.split(".")[0];
            commands.set(commandName, props);
            console.log(`[Slash Command Manager]: Loading command ${commandName}`);
        });
    })
})/*この先はエラー出る可能性ある thenの動作確認してないからね By ｊｍ*/.then(d => {
    console.log("[Slash Command Manager]: Succeeded loading commands")
}).catch((e) => {
    console.log("[Slash Command Manager]: Failed loading commands")
    throw e;
})

module.exports = async (client) => {
    client.commands = commands;

    console.log("[Discord API]: Logged In As " + client.user.tag);

    //activity v14になってる すまそ
    client.user.setActivity({
        name: `Starting up...`
    })
    setTimeout(async function () {
        //コマンド追加 Builderにするなら変更して
        client.application.commands.set(data, "").then(d => {
            console.log("[Slash Command Manager]: Succeeded adding commands")
        }).catch((e) => {
            console.log("[Slash Command Manager]: Failed adding commands")
            throw e;
        })
        //ここまで
    //activity v14になってる すまそ
        client.user.setActivity({
            name: `Made by Project Protects.`
        })
    }, 5000);
};
