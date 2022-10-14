/**
 * コマンド登録
 * @param {import('discord.js').Client} client
 */
module.exports = async (client) => {
  require("dotenv").config()
  const {
    SlashCommandBuilder,
    ContextMenuCommandBuilder,
  } = require("@discordjs/builders")
  const {REST} = require("@discordjs/rest")
  const {Routes, ApplicationCommandType} = require("discord-api-types/v10")

  const rest = new REST({version: "10"}).setToken(process.env.DISCORD_TOKEN)

  //スラッシュコマンド
  await rest.put(Routes.applicationCommands(client.application.id), {
    body: [
      new SlashCommandBuilder()
        .setName("help")
        .setDescription("BOTの使い方を表示します"),
      new SlashCommandBuilder().setName("report").setDescription("通報します"),
      new ContextMenuCommandBuilder()
        .setName("report")
        .setType(ApplicationCommandType.Message),
      new SlashCommandBuilder()
        .setName("scan")
        .setDescription("サーバーをスキャンし安全を確認します"),
      new SlashCommandBuilder()
        .setName("point")
        .setDescription("ユーザーの評価を設定します")
        .addStringOption((option) =>
          option
            .setName("id")
            .setDescription("変更対象のユーザー")
            .setRequired(true)
        )
        .addIntegerOption((option) =>
          option
            .setName("point")
            .setMaxValue(10)
            .setMinValue(1)
            .setRequired(true)
            .setDescription("評価値")
        )
        .addStringOption((option) =>
          option.setName("reason").setRequired(true).setDescription("理由")
        )
        .addStringOption((option) =>
          option
            .setName("class")
            .setRequired(true)
            .setDescription("クラス")
            .setChoices(["A", "B", "C", "D"])
        ),
      new SlashCommandBuilder()
        .setName("subscribe")
        .addChannelOption((option) =>
          option
            .setName("channel")
            .setDescription("通知が送信されるチャンネル")
            .setRequired(true)
        )
        .addIntegerOption((option) =>
          option
            .setName("warn")
            .setDescription("警告(ログ)を開始する評価値")
            .setRequired(true)
            .setMaxValue(9)
            .setMinValue(1)
        )
        .addIntegerOption((option) =>
          option
            .setName("kick")
            .setDescription("kickを開始する評価値")
            .setRequired(true)
            .setMaxValue(9)
            .setMinValue(1)
        )
        .addIntegerOption((option) =>
          option
            .setName("ban")
            .setDescription("banを開始する評価値")
            .setRequired(true)
            .setMaxValue(9)
            .setMinValue(1)
        ),
    ],
  })
}
