import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export enum FileBuckets {
  PROFILE = 'profile',
}

export const config = {
  SIZE_IN: {
    BYTE: 1,
    KB: 2 ** 10,
    MB: 2 ** 20,
    GB: 2 ** 30,
    TB: 2 ** 40,
  },
  FILE_TYPES: {
    IMAGE: ['image/jpeg', 'image/jpg', 'image/bmp', 'image/png', 'image/gif'],
    VIDEO: [
      'video/mp4',
      'video/webm',
      'video/ogg',
      'video/mpeg',
      'video/quicktime',
    ],
  },
};
