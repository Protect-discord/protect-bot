const { CommandInteraction, Client } = require("discord.js")

/**
 * ヘルプコマンド
 * @param {CommandInteraction} interaction 
 * @param {Client} client 
 * @returns 
 */
module.exports = async (interaction, client) => {
  if (interaction.commandName === "help") {
    interaction.reply("テスト")
    //処理書いていく
  }
}
