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
  interaction.deferReply({ephemeral: true})
  if (!(await isAdmin(interaction.member)))
    return interaction.followUp({
      embeds: [
        new MessageEmbed({
          title: ":x: 利用できません",
          description: "このコマンドは管理者のみが実行できます",
          timestamp: interaction.createdAt,
        }),
      ],
    })
  config.server[interaction.options.getString("id")].point =
    interaction.options.getInteger("point")
  interaction.followUp({
    embeds: [
      new MessageEmbed({
        title: "設定しました",
        description: `${Formatters.userMention(
          interaction.options.getString("id")
        )}の評価値を${Formatters.inlineCode(
          interaction.options.getInteger("point")
        )}に設定しました`,
        timestamp: interaction.createdAt,
      }),
    ],
  })
}
