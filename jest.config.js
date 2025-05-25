module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest", 
      {
        tsconfig: 'tsconfig.jest.json',
        jsx: "react-jsx",
        // Removed isolatedModules from here - now only in tsconfig.json
      }
    ]
  },
  moduleDirectories: ["node_modules", "src"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^.+\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js" // Add if using images
  },
  testPathIgnorePatterns: [
    "/node_modules/",
    "/.next/",
    "/cypress/" // Add if you use Cypress
  ],
  // Removed the deprecated globals.ts-jest completely
  // Added coverage if needed (optional)
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/*.stories.tsx", // Ignore Storybook files
    "!src/pages/_app.tsx", // Ignore Next.js special files
    "!src/pages/_document.tsx"
  ],
  // For better test performance
  testEnvironmentOptions: {
    url: "http://localhost" // Needed for some Web APIs
  }
};



