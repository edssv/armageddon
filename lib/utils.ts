import { env } from '@/env.mjs';

export function formatDate(
  input: string | number,
  options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }
): string {
  const date = new Date(input);
  return date.toLocaleDateString('ru-RU', options);
}

export function absoluteUrl(path: string) {
  return `${env.NEXT_PUBLIC_APP_URL}/${path}`;
}

export function plural(count: number, messages: string[]) {
  if (count <= 0) {
    return messages[3];
  }

  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastDigit === 1 && lastTwoDigits !== 11) {
    return messages[0];
  }

  if (
    lastDigit >= 2 &&
    lastDigit <= 4 &&
    (lastTwoDigits < 10 || lastTwoDigits >= 20)
  ) {
    return messages[1];
  }

  return messages[2];
}

export function changeProtocol(url: string) {
  return 'https' + url.split('http')[1];
}
