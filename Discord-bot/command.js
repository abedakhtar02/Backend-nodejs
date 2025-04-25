import { REST, Routes } from 'discord.js';

const commands = [
    {
      name: 'ping',
      description: 'Replies with Pong!',
    },
  ];


  const rest = new REST({ version: '10' }).setToken("MTM2NTAyNzQ0MTMxMDk1NzYyOQ.G_Myf6.hKEJU09wIVUtFJSsldNFxGWiUuDZap9PYDTUjY");

  try {
    console.log('Started refreshing application (/) commands.');
  
    await rest.put(Routes.applicationCommands("1365027441310957629"), { body: commands });
  
    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
