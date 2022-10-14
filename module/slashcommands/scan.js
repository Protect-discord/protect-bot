const {MessageEmbed, Formatters, Permissions} = require("discord.js")
const {config} = require("../lib/config")

/**
 * @type {Array<String>}
 */
const limited = []

/**
 * スキャンコマンド
 * @param {import('discord.js').CommandInteraction} interaction
 * @param {import('discord.js').Client} client
 */
module.exports = async (interaction, client) => {
  if (limited.includes(interaction.guild.id))
    return interaction.reply({
      embeds: [
        new MessageEmbed()
          .setTitle("制限中です")
          .setDescription(
            "このコマンドはボットに付加をかけるため, 10分に一回実行できます"
          )
          .setTimestamp(interaction.createdAt)
          .setFields([{name: "サーバーid", value: interaction.guild.id}]),
      ],
      ephemeral: true,
    })

  await interaction.reply({
    embeds: [
      new MessageEmbed()
        .setTitle("スキャン中...")
        .setTimestamp(new Date())
        .setFooter({text: "時間がかかります"}),
    ],
  })
  const checkList = [
    `@everyoneの権限を確認`,
    "管理者数を確認",
    "ボット数を確認",
    "参加時の設定を確認",
    "自動モデレーターを確認",
    "評価値が7以下のメンバーを確認",
    `自動保護の設定(このボット)を確認`,
  ]
  const msgs = new Array(checkList.length).fill("問題はありません", 0)
  let now = -1
  /**
   * embedを作成
   */
  const status = async () => {
    await interaction.editReply({
      embeds: [
        new MessageEmbed()
          .setTitle("スキャン中...")
          .setDescription(
            checkList
              .map((check, index) => {
                if (index < now) {
                  return `✅ ${check}`
                } else if (index === now) {
                  return `▶️ ${check}`
                } else {
                  return `⏺️ ${check}`
                }
              })
              .join("\n")
          )
          .setTimestamp(interaction.createdAt),
      ],
    })
    now += 1
  }
  await status()
  // 定義
  const every1 = interaction.guild.roles.everyone
  const adminNum = (await interaction.guild.roles.fetch())
    .filter((role) => role.permissions.has(Permissions.FLAGS.ADMINISTRATOR))
    .map((role) => role.members.size)
  const bots = (await interaction.guild.members.fetch()).filter(
    (member) => member.user.bot
  ).size
  const joinVerify = interaction.guild.verificationLevel
  // Dyno, Vortex, Wick, Arcane
  const autoMods = [
    "155149108183695360",
    "240254129333731328",
    "536991182035746816",
    "437808476106784770",
  ]

  // チェック
  if (every1.permissions.has(Permissions.FLAGS.MENTION_EVERYONE, true)) {
    msgs[0] = "everyoneが全員にメンションできます. 荒らしが発生する可能性があります"
  }
  if (every1.permissions.has(Permissions.FLAGS.MANAGE_GUILD, true)) {
    msgs[0] += "\neveryoneがサーバーの管理権限を持っています"
  }
  await status()
  if (adminNum > 5) {
    msgs[1] = "管理者数が多すぎます. 5人未満にすることを推奨します"
  }
  await status()
  if (bots * 0.015 >= 1) {
    msgs[2] =
      "ボット数が多すぎます。 一つのボットが1.5%の問題を抱えるとして計算すると現在参加しているボットのみで100%を超えます"
  }
  await status()
  if (joinVerify === "NONE" || joinVerify === "LOW") {
    msgs[3] = "参加時の認証レベルが低すぎます."
  }
  await status()
  const noAutoMods = autoMods.every(async (id) => {
    typeof (await interaction.guild.members.fetch()).find(
      (member) => member.id === id
    ) === "undefined"
  })
  if (noAutoMods) {
    msgs[4] = "自動モデレーションボットがいません (Dyno, Vortex, Wick, Arcane)"
  }
  await status()
  let count = 0
  Object.entries(config.user).forEach(async (data) => {
    if (
      (await interaction.guild.members.fetch()).has(data[0]) &&
      data[1].point <= 7
    ) {
      count += 1
    }
  })
  if (count !== 0) {
    msgs[5] = `評価値が低いユーザーが${count}人います`
  }
  await status()
  if (!config.server.includes(interaction.guild.id)) {
    msgs[6] = "評価値が低いユーザーの警告受け取り等が設定されていません"
  }
  await status()
  // スキャン完了
  const end = new Date()
  const embed = new MessageEmbed()
    .setTitle("スキャン完了")
    .setTimestamp(end)
    .setFooter({text: `${(end - interaction.createdAt) / 1000}秒で終了`})
  checkList.forEach((check, index) => {
    embed.addFields([{name: check, value: msgs[index]}])
  })
  interaction.editReply({
    embeds: [embed],
  })
  limited.push(interaction.guild.id)
}
