
import React, { useState } from 'react';
import { 
  ComposableMap, 
  Geographies, 
  Geography, 
  Sphere, 
  Graticule 
} from "react-simple-maps";

// World map topojson url
const geoUrl = "https://raw.githubusercontent.com/lotusms/world-map-data/main/world.json";

const RiskMap: React.FC = () => {
  const [tooltip, setTooltip] = useState("");

  const getFillColor = (name: string) => {
    // Simulated risk logic
    if (["Ukraine", "Russia", "Israel", "Gaza", "Sudan", "Myanmar"].includes(name)) return "#ef4444"; // Red
    if (["Taiwan", "South China Sea", "Turkey", "Nigeria"].includes(name)) return "#f59e0b"; // Orange
    if (["USA", "Canada", "Germany", "Japan"].includes(name)) return "#10b981"; // Green
    return "#3f3f46"; // Default Zinc
  };

  return (
    <div className="bg-zinc-900/40 rounded-2xl border border-zinc-800 p-6 relative overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-semibold text-white">Global Risk Vector Map</h3>
          <p className="text-zinc-400 text-sm">Visualizing regional instability and security threats</p>
        </div>
        <div className="flex gap-4 text-xs">
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500"></div> Critical</div>
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-amber-500"></div> Elevated</div>
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-emerald-500"></div> Stable</div>
        </div>
      </div>

      <div className="h-[400px] w-full cursor-crosshair">
        <ComposableMap projectionConfig={{ rotate: [-10, 0, 0], scale: 147 }}>
          <Sphere stroke="#18181b" strokeWidth={0.5} id="sphere" fill="transparent" />
          <Graticule stroke="#18181b" strokeWidth={0.5} />
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    setTooltip(`${geo.properties.name}`);
                  }}
                  onMouseLeave={() => {
                    setTooltip("");
                  }}
                  style={{
                    default: {
                      fill: getFillColor(geo.properties.name),
                      outline: "none",
                      transition: "all 250ms"
                    },
                    hover: {
                      fill: "#6366f1",
                      outline: "none"
                    },
                    pressed: {
                      fill: "#4f46e5",
                      outline: "none"
                    }
                  }}
                />
              ))
            }
          </Geographies>
        </ComposableMap>
      </div>
      
      {tooltip && (
        <div className="absolute top-20 right-6 bg-zinc-800 border border-zinc-700 px-3 py-1 rounded text-xs text-white">
          {tooltip}
        </div>
      )}
    </div>
  );
};

export default RiskMap;
