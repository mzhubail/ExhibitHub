import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.exhibithub.application',
  appName: 'App1',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
