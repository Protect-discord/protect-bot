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

fs.readdir(`./events/`, (err, files) => {
	if (err) return logger.error(`An Error Occured while Loading Events. ${err.stack}`);
	files.forEach((file) => {
		if (!file.endsWith(`.js`)) return;
		const event = require(`./events/${file}`);
		let eventName = file.split(`.`)[0];
		console.log(`[Event Manager]: Loading Event ${eventName}`);
		client.on(eventName, event.bind(null, client));
	});
});

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
