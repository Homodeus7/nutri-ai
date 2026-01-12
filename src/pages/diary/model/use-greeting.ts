import { useI18n } from "../i18n";

type TimePeriod = "morning" | "afternoon" | "evening" | "night";

function getTimePeriod(): TimePeriod {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return "morning";
  }
  if (hour >= 12 && hour < 17) {
    return "afternoon";
  }
  if (hour >= 17 && hour < 22) {
    return "evening";
  }
  return "night";
}

export function useGreeting(): string {
  const { t } = useI18n();

  const period = getTimePeriod();

  const greetings: Record<TimePeriod, string> = {
    morning: t("goodMorning"),
    afternoon: t("goodAfternoon"),
    evening: t("goodEvening"),
    night: t("goodNight"),
  };

  return greetings[period];
}
