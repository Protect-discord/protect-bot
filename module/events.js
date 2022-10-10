/**
 * イベント登録
 * @param {import('discord.js').Client} client
 */
module.exports = async (client) => {
  const fs = require("fs")

  client.once("ready", async (client) => {
    fs.readdir("./module/ready/", (err, files) => {
      if (err || !files) return
      files.forEach((file) => {
        if (!file.endsWith(`.js`)) return
        const event = require(`./ready/${file}`)
        event(client)
      })
    })
  })

  client.on("interactionCreate", async (interaction) => {
    if (!interaction.guild)
      return await interaction.reply({
        embeds: [
          {
            author: {
              name: "コマンドが実行できません",
              icon_url: "https://cdn.taka.ml/images/error.jpg",
            },
            color: "RED",
            description:
              "BOTの操作はDMで実行することができません\nサーバー内で実行してください",
          },
        ],
        ephemeral: true,
      })
    if (interaction.isContextMenu()) {
      const event = require(`./contextmenu/${interaction.commandName}`)
      return event(interaction, client)
    }

    if (interaction.isCommand()) {
      const event = require(`./slashcommands/${interaction.commandName}`)
      return event(interaction, client)
    }

    fs.readdir("./module/interactions/", (err, files) => {
      if (err || !files) return
      files.forEach((file) => {
        if (!file.endsWith(`.js`)) return
        const event = require(`./interactions/${file}`)
        event(interaction, client)
      })
    })
  })
}
