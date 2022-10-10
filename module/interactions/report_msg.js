/**
 * レポート
 * @param {import('discord.js').Interaction} interaction
 * @param {import('discord.js').Client} client
 * @returns
 */
module.exports = async (interaction, client) => {
  const {report_channel} = require("../../config.json")
  if (!interaction.isModalSubmit()) return
  if (interaction.customId.startsWith("report_msg_")) {
    const content = await interaction.fields.getTextInputValue("content")

    /**
     * @type {import('discord.js').Message}
     */
    const msg = (
      await client.channels.fetch(interaction.customId.split("_")[3])
    ).messages.fetch(interaction.customId.split("_")[2])
    /**
     * @type {import('discord.js').TextChannel}
     */
    const report_ch = await client.channels.cache.get(report_channel)
    report_ch.send({
      embeds: [
        {
          color: "GREEN",
          author: {
            name: `${interaction.member.user.id}`,
            url: `https://discord.com/users/${interaction.member.user.id}`,
            icon_url:
              interaction.member.user.avatarURL() ||
              "https://cdn.discordapp.com/embed/avatars/0.png",
          },
          description: content,
          footer: {
            text: `${interaction.guild.name}<${interaction.guild.id}>`,
            icon_url:
              interaction.guild.iconURL() ||
              "https://cdn.discordapp.com/embed/avatars/0.png",
          },
          timestamp: new Date(),
        },
        {
          author: {
            name: msg.member.displayName,
            iconURL: msg.member.displayAvatarURL,
          },
          description: msg.content,
          title: "このメッセージに移動",
          url: msg.url,
          timestamp: msg.createdAt,
        },
      ],
    })
    await interaction.reply({
      embeds: [
        {
          author: {
            name: "送信しました",
            icon_url: "https://cdn.taka.ml/images/success.png",
          },
          color: "GREEN",
          description: "ご報告ありがとうございました",
        },
      ],
      ephemeral: true,
    })
  }
}
