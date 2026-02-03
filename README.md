# Infinity Command Canvas

A futuristic, high-performance tactical dashboard interface built with **React**, **Vite**, and **Tailwind CSS v4**. This project features a responsive "Bento Grid" layout, real-time data visualization, and a premium sci-fi aesthetic with full **Light/Dark mode** support.

## 🚀 Usage

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

## 🛠 Tech Stack

- **Core**: React 18+, Vite
- **Styling**: Tailwind CSS v4 (Alpha/Beta), CSS Variables
- **Animations**: Framer Motion
- **State Management**: React Context API (`useReducer` pattern)
- **Icons**: Lucide React (or custom SVG)

## 🏗 Architecture & React Structure

The application is structured around a centralized **Context API** architecture, ensuring seamless state management across widgets without prop drilling.

### Context Providers

- **`SystemContext`**: Manages global application state including:
  - **Theme**: Toggles between "Matrix" (Dark) and Light modes.
  - **User Profile**: Stores user details (Name, Level).
  - **System Logs**: Centralized logging system for all widget activities.
  - **Task Management**: Shared state for the Quick Task widget.
- **`MarketContext`**: Manages real-time cryptocurrency data streams and the currently selected coin for analysis.

### Custom Hooks

We utilize specialized hooks to abstract business logic from UI components:

- **`useSystem`**: Consumes `SystemContext` for logs, theme, and user data.
- **`useMarket`**: Consumes `MarketContext` for live crypto prices and selection state.
- **`useCoinHistory`**: Generates (mock) historical price data for the selected cryptocurrency to drive the Graph Widget.
- **`useTime` / `useUpTime`**: Manages clock and system uptime counters.
- **`useSystemMonitor`**: Simulates real-time CPU and RAM usage metrics.
- **`useMacroData`**: Fetches/simulates global economic sentiment indicators.

### Widgets (Components)

The UI is composed of modular, self-contained widgets organized in a responsive grid:

1.  **Header V4**: A floating, glassmorphic HUD panel with:
    - Adaptive Light/Dark blocking.
    - Animated scanline effects.
    - Pulsing "ONLINE" status and mock telemetry (CPU/NET).
2.  **MarketWidget**: Displays live crypto prices with "red/green" trend indicators. Clicking a coin triggers the Graph Widget.
3.  **GraphWidget**: Visualizes price trends using a custom SVG line chart with gradient fills.
4.  **LogWidget**: A scrolling terminal feed of system events and user actions.
5.  **QuickTaskWidget**: A rapid-entry task manager to capture thoughts and todos.
6.  **MacroWidget**: Displays high-level market telemetry and sentiment analysis.
7.  **SystemMonitorWidget**: Visual bars for CPU and Memory usage.
8.  **ClockWidget**: Large-format digital clock with system uptime.

## 🎨 Design & Aesthetics (Bento Grid)

The interface moves away from free-floating windows to a structured, 4-column **Bento Grid** layout optimized for 1920x1080 screens but fully responsive:

- **Desktop (XL)**: 4 Columns
- **Laptop (LG)**: 3 Columns
- **Tablet (MD)**: 2 Columns
- **Mobile**: Single Column stack

**Visual Key Features:**

- **Glassmorphism**: Heavy use of `backdrop-blur`, `bg-opacity`, and translucent borders.
- **Gradients**: Subtle radial gradients and border gradients for depth.
- **Typography**: Monospace fonts for data and tracking-widest uppercase headers for labels.
- **Animations**: Entrance animations via Framer Motion, pulse effects on live indicators, and hover states on interactive elements.

## 📂 Project Structure

```
src/
├── Components/         # Individual Widgets (Clock, Market, Graph, etc.)
├── Context/            # React Context definitions (System, Market)
├── hooks/              # Custom logic hooks (useCoinHistory, useSystem, etc.)
├── layout/             # Layout wrappers (DraggableContainer)
├── App.jsx             # Main Grid Layout & Header composition
└── index.css           # Global styles & Tailwind directives
```

---

_Command Centre V4.0 // Secure Connection Established_
