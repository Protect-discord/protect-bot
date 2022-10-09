/**
 * 報告コマンド
 * @param {import('discord.js').CommandInteraction} interaction
 * @returns
 */
module.exports = async (interaction) => {
  const {
    MessageActionRow,
    Modal,
    TextInputComponent,
    MessageEmbed,
  } = require("discord.js")
  const captha = require("../lib/captcha")
  interaction.deferReply({ephemeral: true, fetchReply: true})
  if (await captha(interaction.followUp)) {
    const err = new MessageEmbed()
    err.setTitle("認証失敗")
    err.setDescription("認証に失敗しました")
    return interaction.editReply({embeds: [err]})
  }
  const report_modal = new Modal().setCustomId(`report`).setTitle("通報")

  const content = new TextInputComponent()
    .setCustomId("content")
    .setLabel("通報内容をご記入ください")
    .setPlaceholder("スクリーンショットなどの証拠等も送信してください")
    .setRequired(true)
    .setMaxLength(300)
    .setStyle("PARAGRAPH")

  report_modal.addComponents(new MessageActionRow().addComponents(content))

  await interaction.showModal(report_modal)
}
