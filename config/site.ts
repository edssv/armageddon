import type { SiteConfig } from '@/types';

import { env } from '@/env.mjs';

export const siteConfig: SiteConfig = {
  name: 'Armageddon 2023',
  description: 'ООО “Команда им. Б. Уиллиса”. Взрываем астероиды с 1998 года.',
  url: env.NEXT_PUBLIC_APP_URL,
  ogImage: `${env.NEXT_PUBLIC_APP_URL}/og.jpg`,
  links: {
    vkProfile: 'https://vk.com/sysoeev',
    github: 'https://github.com/Forever-Better/armageddon',
  },
  creator: 'Эдуард Сысоев',
};
