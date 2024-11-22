# Ask4IA 🤖

Ask4IA is a React Native mobile application built with Expo that allows users to ask questions and receive AI-powered answers. The app features a clean architecture, modern UI components, and follows best practices for React Native development.

## 🌟 Features

- Question and answer interface with AI integration
- Dark/Light theme support
- Local storage for questions and answers
- Favorites system
- Bottom sheet with token usage statistics
- Parallax scrolling effects
- Native iOS SF Symbols support with Material Icons fallback
- Haptic feedback support

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- iOS Simulator (for iOS development) or Android Emulator (for Android development)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-repo/ask4ia.git
```

2. Install dependencies:

```bash
npm install
```

or

```bash
yarn install
```

3. Create environment file:

```bash
cp .env.example .env
```

4. Configure your `.env` file:

```bash
OPENAI_API_KEY=your_openai_api_key_here
IS_MOCK=false
```

6. Run on your preferred platform:

For iOS:

```bash
npm run ios
```

or

```bash
yarn ios
```

For Android:

```bash
npm run android
```

or

```bash
yarn android
```

### Development Tips

1. **Environment Configuration**

   - Use `IS_MOCK=true` during development to avoid OpenAI API costs
   - Ensure your OpenAI API key has sufficient credits

2. **Debugging**

   - Install [Reactotron](https://github.com/infinitered/reactotron) for debugging
   - Use `console.tron.log()` for enhanced logging
   - Check the Metro bundler console for build errors

3. **Common Commands**

   - `npm run reset-project` - Reset the project to initial state
   - `npm run lint` - Run ESLint to check code quality
   - `npm test` - Run Jest tests

4. **Platform Specific**
   - iOS: Make sure Xcode is installed and up to date
   - Android: Ensure Android Studio and SDK are properly configured
   - Use appropriate emulators/simulators for testing

### Troubleshooting

1. **Metro Bundler Issues**

   ```bash
   # Clear Metro cache
   npm start --reset-cache
   ```

2. **Dependencies Issues**

   ```bash
   # Reset node_modules
   rm -rf node_modules
   npm install
   ```

3. **Environment Variables**

   - Verify `.env` file exists and is properly configured
   - Restart Metro bundler after changing environment variables

4. **Build Problems**
   - iOS: Try cleaning the build
     ```bash
     cd ios && pod install && cd ..
     ```
   - Android: Clean Gradle build
     ```bash
     cd android && ./gradlew clean && cd ..
     ```

## 🛠️ Technologies & Libraries

- **Core:**

  - [Expo](https://expo.dev/) - Development platform
  - [React Native](https://reactnative.dev/) - Mobile framework
  - [TypeScript](https://www.typescriptlang.org/) - Type safety
  - [Expo Router](https://docs.expo.dev/router/introduction/) - File-based routing

- **Styling & UI:**

  - [NativeWind](https://www.nativewind.dev/) - Tailwind CSS for React Native
  - [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) - Animations
  - [@gorhom/bottom-sheet](https://gorhom.github.io/react-native-bottom-sheet/) - Bottom sheet component

- **State Management & Storage:**

  - [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) - Local storage
  - Custom hooks for state management

- **Development Tools:**
  - [ESLint](https://eslint.org/) - Code linting
  - [Prettier](https://prettier.io/) - Code formatting
  - [Reactotron](https://github.com/infinitered/reactotron) - Debugging

## 🏗️ Architecture & Best Practices

### Directory Structure
