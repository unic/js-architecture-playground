import 'babel-polyfill';

// Registers dependencies in injetor
import '@/register-dependencies';

import { config as buttonConfig } from '@/modules/button';
import createApp from '@/app';

// Estatico App initiation
window.main = createApp({
  configs: [buttonConfig],
});
