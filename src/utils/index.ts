import * as crypto from 'crypto';

export const generateUserId = (): string => {
  const length = 8; // 生成的userId长度为8
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(chars.length);
    result += chars.charAt(randomIndex);
  }

  return result;
}