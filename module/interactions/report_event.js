const {report_channel} = require("../../config.json")
/**
 * レポート
 * @param {import('discord.js').Interaction} interaction
 * @param {import('discord.js').Client} client
 * @returns
 */
module.exports = async (interaction, client) => {
  if (!interaction.isModalSubmit()) return
  if (interaction.customId === "report") {
    const content = await interaction.fields.getTextInputValue("content")

    await client.channels.cache.get(report_channel).send({
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
