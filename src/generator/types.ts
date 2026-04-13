export type CommandStyle = "prefix" | "slash";
export type DiscordEvent =
  | "ready"
  | "messageCreate"
  | "interactionCreate"
  | "guildMemberAdd"
  | "guildMemberRemove"
  | "messageReactionAdd"
  | "messageReactionRemove";

export interface WelcomeConfig {
  joinChannelId: string;
  joinMessage: string;
  enableLeave: boolean;
  leaveChannelId: string;
  leaveMessage: string;
}

export interface AutoModConfig {
  bannedWords: string[];
  spamThreshold: number;
  spamWindow: number;
  blockLinks: boolean;
  logChannelId: string;
}

export interface EconomyConfig {
  startingBalance: number;
  dailyAmount: number;
  workMinReward: number;
  workMaxReward: number;
  currencySymbol: string;
}

export interface ReactionRoleEntry {
  messageId: string;
  emoji: string;
  roleId: string;
}

export interface AutoResponderEntry {
  trigger: string;
  response: string;
  matchType: "exact" | "contains" | "startsWith";
}

export interface RenderContext {
  commandStyle: CommandStyle;
  prefix: string;
  guildId: string;
  welcomeConfig: WelcomeConfig;
  autoModConfig: AutoModConfig;
  economyConfig: EconomyConfig;
  reactionRolesConfig: ReactionRoleEntry[];
  autoResponderConfig: AutoResponderEntry[];
  selectedFeatures: Record<string, boolean>;
}

export interface CommandFileTemplate {
  filename: string;
  subfolder: string;
  render: (ctx: RenderContext) => string;
}

export interface EventContribution {
  event: DiscordEvent;
  priority: number;
  render: (ctx: RenderContext) => string;
}

export interface FeatureModule {
  id: string;
  category: string;
  label: string;
  description: string;
  emoji: string;
  commandFiles: CommandFileTemplate[];
  eventContributions: EventContribution[];
  requiredIntents: string[];
  requiredPartials: string[];
  packageDeps: Record<string, string>;
  subFeatures?: SubFeature[];
}

export interface SubFeature {
  id: string;
  label: string;
  description: string;
}

export interface SelectionState {
  selectedFeatures: Record<string, boolean>;
  commandStyle: CommandStyle;
  prefix: string;
  guildId: string;
  welcomeConfig: WelcomeConfig;
  autoModConfig: AutoModConfig;
  economyConfig: EconomyConfig;
  reactionRolesConfig: ReactionRoleEntry[];
  autoResponderConfig: AutoResponderEntry[];
}
