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

const events = require("./module/events");
events(client);

client.login(process.env.DISCORD_TOKEN)
  .then(()=> console.info(`\x1b[34mINFO:ログインに成功しました`))
  .catch((err)=> console.error(`\x1b[31mERROR:ログインに失敗しました\n${err}`))

process.on("uncaughtException",async(error) =>{
  console.error(`\x1b[31ERROR: ${error}`);
  return;
});

process.on("unhandledRejection",async(error) =>{
  console.error(`\x1b[31mERROR: ${error}`);
  return;
});
