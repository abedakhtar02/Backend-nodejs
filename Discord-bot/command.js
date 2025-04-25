import { REST, Routes } from 'discord.js';

const commands = [
    {
      name: 'ping',
      description: 'Replies with Pong!',
    },
  ];


/*  const rest = new REST().setToken
  ("--");
  */

  try {
    console.log('Started refreshing application (/) commands.');
  
    await rest.put(Routes.applicationCommands
        // ("--CLIENT ID HERE--")
        ,{ body: commands });
  
    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
