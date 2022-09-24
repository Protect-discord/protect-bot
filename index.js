const { Client, Intents } = require("discord.js");
require("dotenv").config();

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
});

/**
 * ここに追加していく
 * ./module/内に機能をファイル分け
 */

client.login(process.env.DISCORD_TOKEN)
  .then(()=> console.info(`\x1b[34mINFO:ログインに成功しました`))
  .catch(()=> console.error(`\x1b[31mERROR:ログインに失敗しました`))

process.on("uncaughtException",async(error) =>{
  console.error(`\x1b[31ERROR: ${error}`);
  return;
});

process.on("unhandledRejection",async(error) =>{
  console.error(`\x1b[31mERROR: ${error}`);
  return;
});
