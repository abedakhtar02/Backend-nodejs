const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("messageCreate", (message) => {
    if(message.author.bot) return;
  // console.log(message.content);
  message.reply({content: "Hi from bot!"});
});

client.on("interactionCreate", (interaction) =>{
  console.log(interaction);

  interaction.reply("Pong!");

});

client.login(
  // "--TOKEN HERE--"
);
