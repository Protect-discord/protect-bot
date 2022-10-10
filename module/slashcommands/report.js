/**
 * 報告コマンド
 * @param {import('discord.js').CommandInteraction} interaction
 * @returns
 */
module.exports = async (interaction) => {
  const {MessageActionRow, Modal, TextInputComponent} = require("discord.js")
  const captha = require("../lib/captcha")
  const res = await captha(interaction)
  if (!res.res) return
  const report_modal = new Modal().setCustomId(`report`).setTitle("通報")

  const content = new TextInputComponent()
    .setCustomId("content")
    .setLabel("通報内容をご記入ください")
    .setPlaceholder("スクリーンショットなどの証拠等も送信してください")
    .setRequired(true)
    .setMaxLength(300)
    .setStyle("PARAGRAPH")

  report_modal.addComponents(new MessageActionRow().addComponents(content))

  await res.inter.showModal(report_modal)
}
