const {
  MessageActionRow,
  Modal,
  TextInputComponent,
  MessageEmbed,
  MessageButton,
} = require("discord.js")
const {Captcha} = require("captcha-canvas")
/**
 * キャプチャ認証
 * @param {Function} sendMsg
 * @returns {Boolean}
 */
module.exports = async (sendMsg) => {
  const captcha = new Captcha(undefined, undefined, 6)
  captcha.async = false
  captcha.drawTrace()
  captcha.drawCaptcha()
  const code = captcha.text

  const embed = new MessageEmbed()
  embed.setTitle("画像認証")
  embed.setDescription("スパムを防止するため, 画像の内容を読んで答えてください")

  const code_input = new TextInputComponent()
    .setCustomId("code")
    .setLabel("画像内の内容")
    .setStyle("SHORT")
    .setMaxLength(6)
    .setRequired(true)
    .setPlaceholder("入力してください")
  const captcha_modal = new Modal()
    .setCustomId("captha")
    .setTitle("入力")
    .setComponents([code_input])
  const input_btn = new MessageButton()
    .setCustomId("input")
    .setLabel("入力")
    .setStyle("SUCCESS")
  const btn_row = new MessageActionRow().setComponents(input_btn)

  const msg = sendMsg({
    embeds: [embed],
    files: [captcha.png],
    components: [btn_row],
  })
  /**
   * @type {import('discord.js').MessageComponentInteraction}
   */
  const btn_res = await msg.awaitMessageComponent({
    componentType: "BUTTON",
    filter: (inter) => inter.customId === "input",
  })
  await btn_res.showModal(captcha_modal)
  const modal = await btn_res.awaitModalSubmit()
  const res = modal.fields.getTextInputValue("code")
  return res !== code
}
