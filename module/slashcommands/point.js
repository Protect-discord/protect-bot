const {MessageEmbed, Formatters} = require("discord.js")
const isAdmin = require("../lib/isAdmin")
const config = require("../lib/config")

/**
 * 評価機能
 * @param {import('discord.js').CommandInteraction} interaction
 * @param {import('discord.js').Client} client
 * @returns
 */
module.exports = async (interaction) => {
  await interaction.deferReply({ephemeral: true})
  if (!(await isAdmin(interaction.member)))
    return interaction.followUp({
      embeds: [
        new MessageEmbed()
          .setTitle(":x: 利用できません")
          .setDescription("このコマンドは管理者のみが実行できます")
          .setTimestamp(interaction.createdAt),
      ],
    })
  if (config.config.user[interaction.options.getString("id")]) {
    config.config.user[interaction.options.getString("id")].point =
      interaction.options.getInteger("point")
  } else {
    config.config.user[interaction.options.getString("id")] = {
      point: interaction.options.getInteger("point"),
    }
  }
  config.writeConfig()

  interaction.options.getInteger("point")
  interaction.followUp({
    embeds: [
      new MessageEmbed()
        .setTitle("設定しました")
        .setDescription(
          `${Formatters.userMention(
            interaction.options.getString("id")
          )}の評価値を${Formatters.inlineCode(
            interaction.options.getInteger("point")
          )}に設定しました`
        )
        .setTimestamp(interaction.createdAt),
    ],
  })
}
