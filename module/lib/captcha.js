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
 * @param {import('discord.js').CommandInteraction} inter
 * @returns {{res: boolean, inter: import("discord.js").ButtonInteraction}}
 */
module.exports = async (inter) => {
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
  const code_comp = new MessageActionRow().setComponents([code_input])
  const captcha_modal = new Modal()
    .setCustomId("captha")
    .setTitle("入力")
    .setComponents([code_comp])
  const input_btn = new MessageButton()
    .setCustomId("input")
    .setLabel("入力")
    .setStyle("SUCCESS")
  const btn_row = new MessageActionRow().setComponents(input_btn)

  /**
   * @type {import('discord.js').Message}
   */
  let msg
  if (inter.deferred || inter.replied) {
    msg = await inter.followUp({
      embeds: [embed],
      files: [captcha.png],
      components: [btn_row],
      fetchReply: true,
    })
  } else {
    msg = await inter.reply({
      embeds: [embed],
      files: [captcha.png],
      components: [btn_row],
      fetchReply: true,
      ephemeral: true,
    })
  }
  /**
   * @type {import('discord.js').MessageComponentInteraction}
   */
  const btn_res = await msg.awaitMessageComponent({
    componentType: "BUTTON",
    filter: (inter) => inter.customId === "input",
  })
  await btn_res.showModal(captcha_modal)
  const modal = await btn_res.awaitModalSubmit({time: 15000})
  const res = modal.fields.getTextInputValue("code")

  const res_embed = new MessageEmbed()
    .setTitle("認証完了")
    .setDescription("あなたは認証に失敗しました")
  if (res === code) res_embed.setDescription("あなたは認証に成功しました")
  const new_btn = new MessageButton()
    .setCustomId("next")
    .setDisabled(res !== code)
    .setStyle("SECONDARY")
    .setLabel("次に進む")
  const new_comp = new MessageActionRow().setComponents(new_btn)
  /**
   * @type {import('discord.js').Message}
   */
  const new_msg = await modal.reply({
    embeds: [res_embed],
    components: [new_comp],
    ephemeral: true,
    fetchReply: true,
  })
  return {
    res: res === code,
    inter: await new_msg.awaitMessageComponent({
      componentType: "BUTTON",
      filter: (inter) => inter.customId === "next",
    }),
  }
}
