import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
    testDir: './tests',
    use: {
        trace: 'on-first-retry', // 'on-first-retry' captures a trace and screenshot on failure
        screenshot: 'only-on-failure', // This is the default setting for screenshots
        // video: 'on-first-retry', // Also useful for debugging
    },
    reporter: 'html',
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
});
