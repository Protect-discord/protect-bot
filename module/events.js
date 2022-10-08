/**
 * イベント登録
 * @param {import('discord.js').Client} client 
 */
module.exports = async (client) => {
  const fs = require("fs")

  client.once("ready", async (client) => {
    fs.readdir("./module/ready/", (err, files) => {
      if (err || files) return
      files.forEach((file) => {
        if (!file.endsWith(`.js`)) return
        const event = require(`./ready/${file}`)
        event(client);
      })
    })
  })

  client.on("interactionCreate", async (interaction) => {
    if(!interaction.isCommand()) return
    if (!interaction.guild)
      return await interaction.reply({
        embeds: [
          {
            author: {
              name: "コマンドが実行できません",
              icon_url: "https://taka.ml/images/error.jpg",
            },
            color: "RED",
            description:
              "BOTの操作はDMで実行することができません\nサーバー内で実行してください",
          },
        ],
        ephemeral: true,
      })

    fs.readdir("./module/slashcommands/", (err, files) => {
      if (err || files) return
      files.forEach((file) => {
        if (!file.endsWith(`.js`)) return
        const event = require(`./slashcommands/${file}`)
        event(interaction, client)
      })
    })
    return
  })
}
