/* eslint-disable react-hooks/rules-of-hooks */
import { ChartConfig } from "@/components/ui/chart";
import { useTranslations } from "next-intl";

export const chartConfig = () => {
  const t = useTranslations('Charts');
  return {
    users: {
      label: t('activer.title'),
    },
    active: {
      label: t('activer.activeLabel'),
      color: "hsl(var(--chart-2))",
    },
    inactive: {
      label: t('activer.inactiveLabel'),
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;
}

export const chartConfigVisiter = () => {
  const t = useTranslations('Charts');
  return {
    users: {
      label: t('visiter.title'),
    },
    online: {
      label: t('visiter.onlineLabel'),
      color: "hsl(var(--chart-3))",
    },
    offline: {
      label: t('visiter.offlineLabel'),
      color: "hsl(var(--chart-4))",
    },
  } satisfies ChartConfig;
}

export const chartConfigSubscribers = () => {
  const t = useTranslations('Charts');
  return {
    users: {
      label: t('subscribers.title'),
    },
    new: {
      label: t('subscribers.newLabel'),
      color: "hsl(var(--chart-1))",
    },
    old: {
      label: t('subscribers.oldLabel'),
      color: "hsl(var(--chart-5))",
    },
  } satisfies ChartConfig;
}
