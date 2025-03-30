# 🍅 Pomodoro Timer App

A beautiful and functional Pomodoro timer app built with **React**, **TypeScript**, **Tailwind CSS**, and **Vite**. Designed to help you boost productivity through focused work sessions, break management, and an integrated todo list.

---

## 🚀 Features

- ⏱️ **Pomodoro Timer** with switchable modes:
  - Pomodoro (25 mins)
  - Short Break (5 mins)
  - Long Break (15 mins)
- 🌈 **Dynamic Theming** based on mode
- ✅ **Todo List** with local storage persistence
- 🧠 **Current Mode + Time in Browser Tab**
- 🔔 **Sound notifications** when timer switches
- 💾 Saves your todos in local storage
- 🌐 Responsive, clean, glassmorphism-style UI

---


## 🧱 Built With

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)

---

## 🛠️ Setup & Installation

### 1. Clone the repo

```bash
git clone https://github.com/your-username/pomodoro-timer.git
cd pomodoro-timer
```
### 2. Install dependencies

```
npm install
```

### 3. Run the development server
```
npm run dev
```
The app will be running at:
👉 http://localhost:5173

## 🧩 Project Structure
```
src/
│
├── Components/
│   ├── PomodoroTimer.tsx     # Main timer logic and UI
│   ├── Todos.tsx             # Todo list component
│   └── Progress.tsx          # Progress bar
│
├── context/
│   └── TimerContext.tsx      # Global timer mode and color management
│
├── App.tsx                   # Root component
└── main.tsx                  # Entry point
```

## 🔊 Sounds
<ul>
<li>click.mp3 — Played on button click</li>

<li>alarm.mp3 — Played when a session ends
📝 Place these inside /public or handle paths accordingly in src. </li>
</ul>

## 🙌 Credits
Made with 💻 + ☕ by imadjaha
Inspired by the Pomodoro technique developed by Francesco Cirillo.