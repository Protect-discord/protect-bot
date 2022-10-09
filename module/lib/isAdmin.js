const { protect_guild, admin_role } = require('../../config.json');
/**
 * 管理者かどうかチェックする
 * @param {import("discord.js").User} user
 * @returns {Promise<Boolean>}
 */
module.exports = async (user) => {
  /**
   * @type {import("discord.js").Guild}
   */
  const guild = await user.client.guilds.fetch(protect_guild)
  const role = await guild.roles.fetch(admin_role)
  return role.members.map((member) => member.id).includes(user.id)
}
