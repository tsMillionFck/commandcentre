import React from "react";
// import { useDraggable } from "../hooks/useDraggable"; // Draggable disabled for Bento Grid
import { motion } from "framer-motion";

export const DraggableContainer = ({ children, title, className = "" }) => {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      onMouseDown={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      tabIndex="0"
      className={`
                flex flex-col
                bg-zinc-900/60 backdrop-blur-md 
                border border-white/5 rounded-2xl 
                shadow-xl overflow-hidden
                hover:border-white/10 transition-colors duration-300
                ${isFocused ? "ring-1 ring-white/10" : ""}
                ${className}
            `}
    >
      <div
        className={`
                    flex items-center gap-3 px-4 py-3 
                    bg-white/5 border-b border-white/5 
                    select-none
                `}
      >
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/50"></div>
        </div>
        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-2">
          {title}
        </span>
      </div>
      <div className="p-4 h-full overflow-hidden relative">{children}</div>
    </motion.div>
  );
};
