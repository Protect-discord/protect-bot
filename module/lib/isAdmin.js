/**
 * 管理者かどうかチェックする
 * @param {import("discord.js").User} user
 * @returns {Promise<Boolean>}
 */
module.exports = async (user) => {
    /**
     * @type {import("discord.js").Guild}
     */
    const guild = await user.client.guilds.fetch(process.env.PROTECT_GUILD);
    const role = await guild.roles.fetch(process.env.ADMIN_ROLE);
    return role.members.map((member)=>member.id).includes(user.id);
}