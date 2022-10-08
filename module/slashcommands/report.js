module.exports = async (interaction) => {
  const {MessageActionRow, Modal, TextInputComponent} = require("discord.js")
  if (!interaction.isCommand()) return
  if (interaction.commandName === "report") {
    const count_1 = Math.floor(Math.random() * 15) + 1
    const count_2 = Math.floor(Math.random() * 15) + 1
    const total = count_1 + count_2
    const report_modal = new Modal()
      .setCustomId(`report_${total}`)
      .setTitle("通報")

    const content = new TextInputComponent()
      .setCustomId("content")
      .setLabel("通報内容をご記入ください")
      .setPlaceholder("スクリーンショットなどの証拠等も送信してください")
      .setRequired(true)
      .setMaxLength(300)
      .setStyle("PARAGRAPH")
    const code = new TextInputComponent()
      .setCustomId(`code`)
      .setLabel(`確認:${count_1}+${count_2}の答えを入力してください`)
      .setMaxLength(6)
      .setPlaceholder("半角で入力してください")
      .setRequired(true)
      .setStyle("SHORT")

    report_modal.addComponents(
      new MessageActionRow().addComponents(content),
      new MessageActionRow().addComponents(code)
    )

    await interaction.showModal(report_modal)
  }
}
