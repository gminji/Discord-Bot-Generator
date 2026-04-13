import { create } from 'zustand';
import type {
  SelectionState,
  CommandStyle,
  WelcomeConfig,
  AutoModConfig,
  EconomyConfig,
  ReactionRoleEntry,
  AutoResponderEntry,
} from '../generator/types';

interface SelectionStore extends SelectionState {
  setFeature: (id: string, value: boolean) => void;
  toggleCategory: (moduleId: string, subFeatureIds: string[], value: boolean) => void;
  setCommandStyle: (style: CommandStyle) => void;
  setPrefix: (prefix: string) => void;
  setGuildId: (id: string) => void;
  setWelcomeConfig: (config: Partial<WelcomeConfig>) => void;
  setAutoModConfig: (config: Partial<AutoModConfig>) => void;
  setEconomyConfig: (config: Partial<EconomyConfig>) => void;
  setReactionRolesConfig: (entries: ReactionRoleEntry[]) => void;
  setAutoResponderConfig: (entries: AutoResponderEntry[]) => void;
  reset: () => void;
}

const defaultState: SelectionState = {
  selectedFeatures: {},
  commandStyle: 'slash',
  prefix: '!',
  guildId: '',
  welcomeConfig: {
    joinChannelId: '',
    joinMessage: 'Welcome {user} to {server}! 🎉',
    enableLeave: false,
    leaveChannelId: '',
    leaveMessage: '{user} has left the server.',
  },
  autoModConfig: {
    bannedWords: [],
    spamThreshold: 5,
    spamWindow: 3000,
    blockLinks: false,
    logChannelId: '',
  },
  economyConfig: {
    startingBalance: 100,
    dailyAmount: 200,
    workMinReward: 50,
    workMaxReward: 200,
    currencySymbol: '💰',
  },
  reactionRolesConfig: [],
  autoResponderConfig: [],
};

export const useSelectionStore = create<SelectionStore>((set) => ({
  ...defaultState,

  setFeature: (id, value) =>
    set((state) => ({
      selectedFeatures: { ...state.selectedFeatures, [id]: value },
    })),

  toggleCategory: (moduleId, subFeatureIds, value) =>
    set((state) => {
      const updated = { ...state.selectedFeatures, [moduleId]: value };
      for (const sfId of subFeatureIds) {
        updated[sfId] = value;
      }
      return { selectedFeatures: updated };
    }),

  setCommandStyle: (style) => set({ commandStyle: style }),
  setPrefix: (prefix) => set({ prefix }),
  setGuildId: (guildId) => set({ guildId }),

  setWelcomeConfig: (config) =>
    set((state) => ({
      welcomeConfig: { ...state.welcomeConfig, ...config },
    })),

  setAutoModConfig: (config) =>
    set((state) => ({
      autoModConfig: { ...state.autoModConfig, ...config },
    })),

  setEconomyConfig: (config) =>
    set((state) => ({
      economyConfig: { ...state.economyConfig, ...config },
    })),

  setReactionRolesConfig: (entries) => set({ reactionRolesConfig: entries }),
  setAutoResponderConfig: (entries) => set({ autoResponderConfig: entries }),

  reset: () => set(defaultState),
}));
