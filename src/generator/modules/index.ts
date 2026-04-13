import { moderationModule } from './moderation.module';
import { utilityModule } from './utility.module';
import { funModule } from './fun.module';
import { economyModule } from './economy.module';
import { automodModule } from './automod.module';
import { welcomeModule } from './welcome.module';
import { reactionRolesModule } from './reactionRoles.module';
import { autoResponderModule } from './autoResponder.module';
import { pollModule } from './poll.module';
import type { FeatureModule } from '../types';

export const ALL_MODULES: FeatureModule[] = [
  moderationModule,
  utilityModule,
  funModule,
  economyModule,
  automodModule,
  welcomeModule,
  reactionRolesModule,
  autoResponderModule,
  pollModule,
];

export {
  moderationModule,
  utilityModule,
  funModule,
  economyModule,
  automodModule,
  welcomeModule,
  reactionRolesModule,
  autoResponderModule,
  pollModule,
};
