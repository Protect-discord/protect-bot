const captha = require("../lib/captcha")
/**
 * 報告コマンド
 * @param {import('discord.js').MessageContextMenuInteraction} interaction
 * @returns
 */
module.exports = async (interaction) => {
  const {MessageActionRow, Modal, TextInputComponent} = require("discord.js")
  await interaction.deferReply({ephemeral: true, fetchReply: true})
  const captha_res = await captha(interaction)
  if (!captha_res.res) return
  const report_modal = new Modal()
    .setCustomId(
      `report_msg_${interaction.targetMessage.id}_${interaction.targetMessage.channel.id}`
    )
    .setTitle("通報")

  const content = new TextInputComponent()
    .setCustomId("content")
    .setLabel("通報内容をご記入ください")
    .setPlaceholder("スクリーンショットなどの証拠等も送信してください")
    .setRequired(true)
    .setMaxLength(300)
    .setStyle("PARAGRAPH")

  report_modal.addComponents(new MessageActionRow().addComponents(content))

  await captha_res.inter.showModal(report_modal)
}
