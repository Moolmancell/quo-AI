// lib/dicebear.ts
import { createAvatar } from '@dicebear/core';
import { glass } from '@dicebear/collection'; // Choose your style

export function getDiceBearAvatar(seed: string) {
  const avatar = createAvatar(glass, {
    seed: seed,
  });

  return avatar.toDataUri();
}