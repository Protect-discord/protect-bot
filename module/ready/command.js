/**
 * コマンド登録
 * @param {import('discord.js').Client} client
 */
module.exports = async (client) => {
  require("dotenv").config()
  const {
    SlashCommandBuilder,
    //  ContextMenuCommandBuilder,
  } = require("@discordjs/builders")
  const {REST} = require("@discordjs/rest")
  const {
    Routes,
    //  ApplicationCommandType
  } = require("discord-api-types/v10")

  const rest = new REST({version: "10"}).setToken(process.env.DISCORD_TOKEN)

  //スラッシュコマンド
  await rest.put(Routes.applicationCommands(client.application.id), {
    body: [
      new SlashCommandBuilder()
        .setName("help")
        .setDescription("BOTの使い方を表示します"),
      new SlashCommandBuilder().setName("report").setDescription("通報します"),
      new ContextMenuCommandBuilder().setName("report"),
      new SlashCommandBuilder()
        .setName("scan")
        .setDescription("サーバーをスキャンし安全を確認します"),
      new SlashCommandBuilder()
        .setName("point")
        .setDescription("評価値を設定します")
        .addStringOption({
          name: "id",
          description: "変更対象のid",
          required: true,
        })
        .addIntegerOption({
          name: "point",
          description: "評価値",
          required: true,
          max_value: 10,
          min_value: 0,
        }),
    ],
  })
}
