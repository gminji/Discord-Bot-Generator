export interface ModuleTranslation {
  label: string;
  description: string;
}

export interface Translations {
  langNames: { en: string; ja: string; ko: string };

  header: {
    subtitle: string;
  };

  footer: {
    tagline: string;
    adLabel: string;
  };

  steps: {
    features: string;
    config: string;
    download: string;
  };

  nav: {
    back: string;
    next: string;
    featuresSelected: (count: number) => string;
    noFeaturesSelected: string;
  };

  step1: {
    title: string;
    subtitleNone: string;
    subtitleCount: (count: number) => string;
    selectAll: string;
    deselectAll: string;
  };

  step2: {
    title: string;
    subtitle: string;
    botConfig: {
      title: string;
      commandStyle: string;
      slashCommands: string;
      prefixCommands: string;
      slashHint: string;
      prefixHint: string;
      commandPrefix: string;
      guildId: string;
      optional: string;
      guildIdHint: string;
    };
    welcome: {
      title: string;
      joinChannelId: string;
      joinMessage: string;
      enableLeave: string;
      leaveChannelId: string;
      leaveMessage: string;
    };
    automod: {
      title: string;
      bannedWords: string;
      bannedWordsHint: string;
      spamThreshold: string;
      spamThresholdHint: string;
      spamWindow: string;
      spamWindowHint: string;
      logChannelId: string;
      optional: string;
      blockLinks: string;
    };
    economy: {
      title: string;
      startingBalance: string;
      dailyReward: string;
      workMinReward: string;
      workMaxReward: string;
      currencySymbol: string;
    };
    reactionRoles: {
      title: string;
      hint: string;
      messageId: string;
      emoji: string;
      roleId: string;
      addEntry: string;
    };
    autoResponder: {
      title: string;
      trigger: string;
      contains: string;
      exact: string;
      startsWith: string;
      response: string;
      addEntry: string;
    };
  };

  step3: {
    title: string;
    filesGenerated: (count: number) => string;
    noFeaturesSelected: string;
    includedFeatures: string;
    configuration: string;
    commandStyle: string;
    slash: string;
    prefix: string;
    prefixLabel: string;
    guildId: string;
    afterDownload: {
      title: string;
      step1: string;
      step2: string;
      step3: string;
      step4slash: string;
      step5: string;
    };
    generate: string;
    generating: string;
    selectFirst: string;
    selectFirstHint: string;
  };

  modules: Record<string, ModuleTranslation>;
  subFeatures: Record<string, ModuleTranslation>;
}
