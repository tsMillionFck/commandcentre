import { SystemProvider, useSystem } from "./Context/SystemContext"; //Export the Data
import { MarketProvider } from "./Context/MarketContext";
import { MarketWidget } from "./Components/MarketWidget/MarketWidget";
import { LogWidget } from "./Components/LogWidget/LogWidget";
import { MacroWidget } from "./Components/MarcoWidget/MarcoWidget";
import { DraggableContainer } from "./layout/DraggableContainer";
// import './App.css'; // Removing pure CSS import
import { QuickTaskWidget } from "./Components/QuickTaskWidget/QuickTaskWidget";
import { SystemMonitorWidget } from "./Components/SystemMonitorWidget/SystemMonitorWidget";
import { ClockWidget } from "./Components/ClockWidget/ClockWidget";
import { GraphWidget } from "./Components/GraphWidget/GraphWidget";

const Header = () => {
  const { state, toggleTheme } = useSystem();

  const isLight = state.theme === "light";

  return (
    <header className="fixed top-0 left-0 right-0 h-20 z-50 px-6 flex items-center justify-between pointer-events-none">
      {/* Glass Background Panel */}
      <div
        className={`absolute inset-x-6 top-4 bottom-0 backdrop-blur-xl rounded-2xl shadow-2xl pointer-events-auto overflow-hidden transition-all duration-500
            ${
              isLight
                ? "bg-white/80 border border-zinc-200 shadow-zinc-200/50"
                : "bg-zinc-900/80 border border-white/10 shadow-black/50"
            }
        `}
      >
        {/* Decorative Scanline (Animated) */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[size:100%_4px] pointer-events-none opacity-20"></div>
        <div
          className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-50`}
        ></div>

        <div className="h-full flex items-center justify-between px-6 relative z-10">
          {/* Left Section: Identity */}
          <div className="flex items-center gap-4">
            <div
              className={`relative flex items-center justify-center w-10 h-10 rounded-xl border transition-colors duration-500
                        ${isLight ? "bg-zinc-100 border-zinc-300" : "bg-emerald-500/10 border-emerald-500/20"}
                    `}
            >
              <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_15px_#10b981]"></div>
              {/* Spinning ring */}
              <div className="absolute inset-0 rounded-xl border-2 border-emerald-500/30 border-t-transparent animate-spin-slow"></div>
            </div>

            <div className="flex flex-col min-w-0 justify-center h-10">
              <div className="flex items-center gap-2">
                <h1
                  className={`text-sm font-bold tracking-[0.2em] uppercase leading-none whitespace-nowrap transition-colors duration-500
                                ${isLight ? "text-zinc-900" : "text-zinc-100"}
                             `}
                >
                  {state.user.name}
                </h1>
                <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-emerald-500/20 text-emerald-500 border border-emerald-500/30 shrink-0">
                  ONLINE
                </span>
              </div>
            </div>
          </div>

          {/* Right Section: Controls */}
          <div className="flex gap-6 items-center">
            {/* Status Indicators */}
            <div className="hidden md:flex gap-4 items-center pr-6 border-r border-white/10">
              <div className="text-[10px] font-mono text-zinc-500 flex items-center gap-2">
                CPU{" "}
                <span
                  className={`${isLight ? "text-zinc-900" : "text-zinc-200"}`}
                >
                  34%
                </span>
              </div>
              <div className="text-[10px] font-mono text-zinc-500 flex items-center gap-2">
                NET{" "}
                <span
                  className={`${isLight ? "text-zinc-900" : "text-zinc-200"}`}
                >
                  1.2GB/s
                </span>
              </div>
            </div>

            <button
              onClick={toggleTheme}
              className={`group relative px-5 py-2 text-[10px] font-bold rounded-lg border transition-all duration-300 uppercase tracking-widest overflow-hidden
                            ${
                              isLight
                                ? "text-zinc-600 bg-zinc-100 border-zinc-300 hover:border-zinc-400 hover:bg-zinc-200"
                                : "text-zinc-400 bg-zinc-950/50 border-white/5 hover:border-emerald-500/30 hover:text-emerald-400 hover:bg-zinc-900"
                            }
                        `}
            >
              <span className="relative z-10 flex items-center gap-2">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${isLight ? "bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]" : "bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]"} transition-colors`}
                ></span>
                {state.theme} Mode
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

const MainLayout = () => {
  const { state } = useSystem();

  return (
    <div
      className={`relative w-screen h-screen overflow-hidden font-sans transition-colors duration-500
            ${state.theme === "light" ? "bg-zinc-100 text-zinc-800 selection:bg-emerald-500/20" : "bg-zinc-950 text-zinc-200 selection:bg-emerald-500/30"}
        `}
    >
      {/* Grid Background */}
      <div
        className={`fixed inset-0 bg-[size:40px_40px] pointer-events-none opacity-30
            ${
              state.theme === "light"
                ? "bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)]"
                : "bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]"
            }
          `}
      />

      <Header />

      <main className="relative w-full max-w-[1920px] mx-auto pt-28 pb-10 px-6 h-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 h-full">
          {/* Column 1: Market Data (Tall) */}
          <DraggableContainer
            title="Economic Sentiment"
            className="col-span-1 row-span-2 h-[600px] xl:h-auto"
          >
            <MarketWidget />
          </DraggableContainer>

          {/* Column 2: Logs (Central Feed) */}
          <DraggableContainer
            title="System Logs"
            className="col-span-1 md:col-span-2 xl:col-span-1 row-span-2 h-[400px] xl:h-auto"
          >
            <LogWidget />
          </DraggableContainer>

          {/* Column 3: Telemetry & Task */}
          <div className="col-span-1 flex flex-col gap-6">
            <DraggableContainer title="Market Telemetry">
              <MacroWidget />
            </DraggableContainer>
            <DraggableContainer title="Quick Tasks" className="flex-grow">
              <QuickTaskWidget />
            </DraggableContainer>
            <DraggableContainer title="Coin Analysis" className="h-[200px]">
              <GraphWidget />
            </DraggableContainer>
          </div>

          {/* Column 4: System Monitor & Clock */}
          <div className="col-span-1 flex flex-col gap-6">
            <DraggableContainer title="System Monitor">
              <SystemMonitorWidget />
            </DraggableContainer>

            <DraggableContainer
              title="System Clock"
              className="flex-grow min-h-[150px]"
            >
              <ClockWidget />
            </DraggableContainer>
          </div>
        </div>
      </main>
    </div>
  );
};

function App() {
  return (
    <SystemProvider>
      <MarketProvider>
        <MainLayout />
      </MarketProvider>
    </SystemProvider>
  );
}

export default App;
