# 🎵 Saavn Music Player

This is a music streaming app built using **React Native (Expo)** and **TypeScript**, powered by the **JioSaavn API**.  
The goal of this project was not to overbuild features, but to focus on **clean architecture**, **global player synchronization**, and **reliable audio playback on Android**.

---

## 🚀 Tech Stack

- React Native (Expo) + TypeScript  
- React Navigation v6  
- Zustand for state management  
- Expo AV for audio playback  
- AsyncStorage for local persistence  

---

## ✨ Features

- Search songs using the JioSaavn API  
- Play music with background playback support  
- Full Player with:
  - Play / Pause
  - Seek bar (timeline control)
  - Next / Previous song  
- Persistent Mini Player synced across all screens  
- Queue management (add / remove songs)  
- Queue is saved locally and restored on app restart  

---

## 🧠 Architecture & Design Decisions

- The app uses a **single global Zustand store** to manage:
  - current song
  - playback state
  - queue
  - playback position and duration
- A **single audio instance** is maintained throughout the app to avoid desynchronization issues.
- Both the **Mini Player** and **Full Player** consume the same global state, ensuring they always stay in sync.
- Responsibilities are clearly separated:
  - `screens/` → app screens
  - `components/` → reusable UI components
  - `store/` → global player state
  - `api/` → JioSaavn API calls
  - `utils/` → shared helpers

This structure keeps the app easy to reason about and scale.

---

## ⚠️ Challenges & Trade-offs

- JioSaavn audio streams are served over **HTTP CDN URLs**.  
  Android blocks such streams by default, so `usesCleartextTraffic` and explicit `INTERNET` permissions were configured.
- Album, artist, and playlist search endpoints were intentionally not implemented to keep the focus on **core playback, queue management, and state synchronization**, which were the main evaluation criteria.

---

## 🛠 Setup Instructions
# Creating Expo App
```bash
npx create-expo-app saavn-music-player --template expo-template-blank-typescript
cd saavn-music-player
```

Install dependencies:
# Navigation
```bash
npm install @react-navigation/native @react-navigation/native-stack
npx expo install react-native-screens react-native-safe-area-context
```
# State management
```bash
npm install zustand
```
# Audio
```bash
npx expo install expo-av
```
# Storage
```bash
npx expo install @react-native-async-storage/async-storage


```
# APK Download
You can download and install the Android APK from the link below:
👉 **APK Download Link:**  
```bash
https://expo.dev/accounts/skumar1107/projects/saavn-music-player/builds/6602d9c1-4504-4468-b3cf-1369b723678e
```
> Note: Please allow installation from unknown sources if prompted.



Author: Shubham Kumar.

