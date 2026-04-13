import type { RenderContext } from '../../generator/types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function interactionCreateTemplate(_ctx: RenderContext): string {
  return `module.exports = {
  name: 'interactionCreate',
  execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) {
      console.error(\`No command matching \${interaction.commandName} was found.\`);
      return;
    }

    try {
      command.execute(interaction, client);
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        interaction.followUp({ content: 'There was an error executing this command.', ephemeral: true });
      } else {
        interaction.reply({ content: 'There was an error executing this command.', ephemeral: true });
      }
    }
  },
};
`;
}
