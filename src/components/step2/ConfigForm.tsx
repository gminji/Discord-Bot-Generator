import { useSelectionStore } from '../../store/selectionStore';
import { useTranslation } from '../../i18n';
import { BotConfigSection } from './BotConfigSection';
import { WelcomeConfigSection } from './WelcomeConfigSection';
import { AutoModConfigSection } from './AutoModConfigSection';
import { EconomyConfigSection } from './EconomyConfigSection';
import { ReactionRolesConfigSection } from './ReactionRolesConfigSection';
import { AutoResponderConfigSection } from './AutoResponderConfigSection';

export function ConfigForm() {
  const { selectedFeatures } = useSelectionStore();
  const { t } = useTranslation();

  const isWelcomeActive = selectedFeatures['welcome'] ||
    selectedFeatures['welcome.join'] || selectedFeatures['welcome.leave'];
  const isAutoModActive = selectedFeatures['automod'] ||
    selectedFeatures['automod.profanity'] || selectedFeatures['automod.spam'] || selectedFeatures['automod.links'];
  const isEconomyActive = selectedFeatures['economy'] ||
    ['economy.balance', 'economy.daily', 'economy.work', 'economy.pay', 'economy.leaderboard'].some(k => selectedFeatures[k]);
  const isReactionRolesActive = selectedFeatures['reactionRoles'] || selectedFeatures['reactionRoles.assign'];
  const isAutoResponderActive = selectedFeatures['autoResponder'] || selectedFeatures['autoResponder.keywords'];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{t.step2.title}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {t.step2.subtitle}
        </p>
      </div>

      <BotConfigSection />
      {isWelcomeActive && <WelcomeConfigSection />}
      {isAutoModActive && <AutoModConfigSection />}
      {isEconomyActive && <EconomyConfigSection />}
      {isReactionRolesActive && <ReactionRolesConfigSection />}
      {isAutoResponderActive && <AutoResponderConfigSection />}
    </div>
  );
}
