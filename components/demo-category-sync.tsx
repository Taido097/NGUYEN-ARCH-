'use client';

import { useEffect } from 'react';

const allowedCategories = ['Portfolio', 'Restaurant', 'Scheduling', 'Custom Website'];

export function DemoCategorySync() {
  useEffect(() => {
    const category = new URLSearchParams(window.location.search).get('category');
    if (!category || !allowedCategories.includes(category)) return;

    const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>('button'));
    const match = buttons.find((button) => button.querySelector('span')?.textContent === category);
    match?.click();
  }, []);

  return null;
}
