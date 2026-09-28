import React, { useState, useMemo } from 'react';

const SoloLevelingDashboard = () => {
  // =========================================================
  // 1. HISTORIAL Y DATOS DEL SISTEMA (Modifica estos valores)
  // =========================================================

  // Historial de Peso Corporal (Punto inicial: 96.0 kg)
  const weightLogs = [
    { semana: "Sem 1", fecha: "2026-08-01", peso: 96.0 },
    { semana: "Sem 2", fecha: "2026-08-08", peso: 95.3 },
    { semana: "Sem 3", fecha: "2026-08-15", peso: 94.6 },
    { semana: "Sem 4", fecha: "2026-08-22", peso: 94.0 },
    { semana: "Sem 5", fecha: "2026-08-29", peso: 93.2 },
    { semana: "Sem 6", fecha: "2026-09-05", peso: 92.5 }
  ];

  // Historial de Gimnasio (Press Banca y Curl Bíceps)
  const gymLogs = [
    { fecha: "Sesión 1", pressBanca: 50, curlBiceps: 12, repsTotales: 64 },
    { fecha: "Sesión 2", pressBanca: 55, curlBiceps: 14, repsTotales: 72 },
    { fecha: "Sesión 3", pressBanca: 60, curlBiceps: 14, repsTotales: 80 },
    { fecha: "Sesión 4", pressBanca: 65, curlBiceps: 16, repsTotales: 88 },
    { fecha: "Sesión 5", pressBanca: 70, curlBiceps: 18, repsTotales: 96 },
    { fecha: "Sesión 6", pressBanca: 75, curlBiceps: 18, repsTotales: 104 }
  ];

  // Historial de Basket (Tiempo en minutos para lograr la meta fija)
  const basketLogs = [
    { fecha: "Sesión 1", tiempoFT: 26.0, tiempo3PT: 32.0 }, // FT: Meta 100, 3PT: Meta 70
    { fecha: "Sesión 2", tiempoFT: 24.5, tiempo3PT: 29.0 },
    { fecha: "Sesión 3", tiempoFT: 22.0, tiempo3PT: 27.5 },
    { fecha: "Sesión 4", tiempoFT: 20.0, tiempo3PT: 25.0 },
    { fecha: "Sesión 5", tiempoFT: 18.5, tiempo3PT: 23.0 },
    { fecha: "Sesión 6", tiempoFT: 17.0, tiempo3PT: 21.0 }
  ];

  // Metas Estandarizadas de Fuerza (Principiante / Novato)
  const METAS = {
    pressBancaTarget: 90, // kg
    curlBicepsTarget: 20, // kg por mancuerna
    pesoInicial: 96.0,    // kg
  };

  // =========================================================
  // 2. CÁLCULOS DIVERGENTES DE ATRIBUTOS
  // =========================================================
  const statsSummary = useMemo(() => {
    const currentWeight = weightLogs[weightLogs.length - 1].peso;
    const weightChange = (currentWeight - METAS.pesoInicial).toFixed(1);

    const maxBench = Math.max(...gymLogs.map(l => l.pressBanca));
    const maxCurl = Math.max(...gymLogs.map(l => l.curlBiceps));
    const totalReps = gymLogs.reduce((acc, l) => acc + l.repsTotales, 0);

    const bestFT = Math.min(...basketLogs.map(l => l.tiempoFT));
    const best3PT = Math.min(...basketLogs.map(l => l.tiempo3PT));

    return {
      currentWeight,
      weightChange,
      maxBench,
      maxCurl,
      totalReps,
      bestFT,
      best3PT,
      benchProgress: Math.min((maxBench / METAS.pressBancaTarget) * 100, 100).toFixed(0),
      curlProgress: Math.min((maxCurl / METAS.curlBicepsTarget) * 100, 100).toFixed(0)
    };
  }, [weightLogs, gymLogs, basketLogs]);

  // Tab activo de gráficas
  const [activeTab, setActiveTab] = useState('peso');

  return (
    <div className="min-h-screen bg-black text-blue-50 p-4 md:p-8 font-mono selection:bg-blue-900">
      {/* Marco interactivo con efecto neón */}
      <div className="fixed inset-0 pointer-events-none border-4 md:border-8 border-blue-900/30 shadow-[inset_0_0_100px_rgba(0,0,150,0.25)] z-50"></div>

      <div className="max-w-6xl mx-auto relative z-10 space-y-8">

        {/* ENCABEZADO ESTILO SOLO LEVELING */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-5xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-500 drop-shadow-[0_0_20px_rgba(59,130,246,0.8)] uppercase">
            [ VENTANA DE ESTADO — SISTEMA ]
          </h1>
          <p className="text-xs md:text-sm text-blue-400 tracking-[0.3em] uppercase">
            MONITOREO DE PARÁMETROS BIOMÉTRICOS Y RENDIMIENTO
          </p>
        </div>

        {/* PANEL PRINCIPAL: PERFIL Y ATRIBUTOS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* FICHA TÉCNICA DEL JUGADOR */}
          <div className="bg-gray-900/90 border border-blue-500/50 p-6 rounded shadow-[0_0_25px_rgba(59,130,246,0.15)] relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-600"></div>

            <div>
              <h2 className="text-xl font-bold text-blue-300 border-b border-blue-800/60 pb-2 mb-4 uppercase flex justify-between items-center">
                <span>Perfil de Cazador</span>
                <span className="text-xs text-blue-500">ID: #0096</span>
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Estatura:</span>
                  <span className="text-white font-bold">1.76 m</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Peso Inicial:</span>
                  <span className="text-gray-300">96.0 kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Peso Actual:</span>
                  <span className="text-cyan-300 font-bold">{statsSummary.currentWeight} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Variación Corporal:</span>
                  <span className={`font-bold ${parseFloat(statsSummary.weightChange) <= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {statsSummary.weightChange} kg
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-blue-900/50 mt-6">
              <div className="flex justify-between items-center mb-1">
                <span className="text-lg font-bold text-blue-300">NIVEL 18</span>
                <span className="text-xs text-blue-400">92% XP</span>
              </div>
              <div className="w-full bg-gray-800 h-2.5 rounded-full overflow-hidden border border-blue-900">
                <div className="h-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,1)] w-[92%] transition-all duration-1000"></div>
              </div>
            </div>
          </div>

          {/* ATRIBUTOS CLAVE (FUERZA, RESISTENCIA, TIROS) */}
          <div className="lg:col-span-2 bg-gray-900/90 border border-blue-500/50 p-6 rounded shadow-[0_0_25px_rgba(59,130,246,0.15)] space-y-4">
            <h2 className="text-xl font-bold text-blue-300 border-b border-blue-800/60 pb-2 uppercase flex items-center">
              <span className="mr-2">⚡</span> Estadísticas de Combate
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm">
              
              {/* Press Banca */}
              <div className="bg-black/60 p-3.5 border border-red-900/40 rounded hover:border-red-500/60 transition-colors">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-400">FUERZA: Press Banca</span>
                  <span className="text-red-400 font-bold">{statsSummary.maxBench} kg / {METAS.pressBancaTarget} kg</span>
                </div>
                <div className="w-full bg-gray-800 h-1.5 rounded">
                  <div className="bg-red-500 h-1.5 rounded shadow-[0_0_8px_rgba(239,68,68,0.8)]" style={{ width: `${statsSummary.benchProgress}%` }}></div>
                </div>
              </div>

              {/* Curl Bíceps */}
              <div className="bg-black/60 p-3.5 border border-purple-900/40 rounded hover:border-purple-500/60 transition-colors">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-400">FUERZA: Curl Bíceps</span>
                  <span className="text-purple-400 font-bold">{statsSummary.maxCurl} kg / {METAS.curlBicepsTarget} kg</span>
                </div>
                <div className="w-full bg-gray-800 h-1.5 rounded">
                  <div className="bg-purple-500 h-1.5 rounded shadow-[0_0_8px_rgba(168,85,247,0.8)]" style={{ width: `${statsSummary.curlProgress}%` }}></div>
                </div>
              </div>

              {/* Cadencia Tiro Libre */}
              <div className="bg-black/60 p-3.5 border border-cyan-900/40 rounded hover:border-cyan-500/60 transition-colors">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-400">TIRO LIBRE (Meta 100)</span>
                  <span className="text-cyan-400 font-bold">Récord: {statsSummary.bestFT} min</span>
                </div>
                <p className="text-[10px] text-gray-500">Evaluación de tiempo total por sesión</p>
              </div>

              {/* Cadencia 3 Puntos */}
              <div className="bg-black/60 p-4 border border-yellow-900/40 rounded hover:border-yellow-500/60 transition-colors">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-400">3 PUNTOS (Meta 70)</span>
                  <span className="text-yellow-400 font-bold">Récord: {statsSummary.best3PT} min</span>
                </div>
                <p className="text-[10px] text-gray-500">Evaluación de tiempo perimetral</p>
              </div>

            </div>
          </div>

        </div>

        {/* SECCIÓN DE GRÁFICAS INTERACTIVAS */}
        <div className="bg-gray-900/90 border border-blue-500/50 p-6 rounded shadow-[0_0_25px_rgba(59,130,246,0.15)] space-y-6">
          
          {/* SELECTOR DE GRÁFICAS */}
          <div className="flex flex-wrap gap-2 border-b border-blue-900/60 pb-3">
            <button 
              onClick={() => setActiveTab('peso')}
              className={`px-4 py-2 text-xs md:text-sm font-bold uppercase rounded transition-all ${activeTab === 'peso' ? 'bg-blue-600 text-white shadow-[0_0_12px_rgba(59,130,246,0.8)]' : 'bg-black/50 text-gray-400 border border-blue-900/50 hover:text-white'}`}
            >
              ⚖️ Histograma de Peso (Base 96kg)
            </button>
            <button 
              onClick={() => setActiveTab('tiros')}
              className={`px-4 py-2 text-xs md:text-sm font-bold uppercase rounded transition-all ${activeTab === 'tiros' ? 'bg-cyan-600 text-white shadow-[0_0_12px_rgba(6,182,212,0.8)]' : 'bg-black/50 text-gray-400 border border-blue-900/50 hover:text-white'}`}
            >
              🎯 Tiempos de Tiros
            </button>
            <button 
              onClick={() => setActiveTab('fuerza')}
              className={`px-4 py-2 text-xs md:text-sm font-bold uppercase rounded transition-all ${activeTab === 'fuerza' ? 'bg-red-600 text-white shadow-[0_0_12px_rgba(239,68,68,0.8)]' : 'bg-black/50 text-gray-400 border border-blue-900/50 hover:text-white'}`}
            >
              🏋️ Cargas de Fuerza
            </button>
            <button 
              onClick={() => setActiveTab('resistencia')}
              className={`px-4 py-2 text-xs md:text-sm font-bold uppercase rounded transition-all ${activeTab === 'resistencia' ? 'bg-yellow-600 text-white shadow-[0_0_12px_rgba(234,179,8,0.8)]' : 'bg-black/50 text-gray-400 border border-blue-900/50 hover:text-white'}`}
            >
              🔥 Resistencia (Reps)
            </button>
          </div>

          {/* VISUALIZACIÓN DE LA GRÁFICA SELECCIONADA */}
          <div className="bg-black/70 p-4 border border-blue-900/40 rounded">
            
            {/* 1. HISTOGRAMA DE PESO CORPORAL */}
            {activeTab === 'peso' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs text-gray-400">
                  <span>PUNTO DE PARTIDA: <strong className="text-white">96.0 kg</strong></span>
                  <span>ÚLTIMO REGISTRO: <strong className="text-cyan-400">{statsSummary.currentWeight} kg</strong></span>
                </div>

                <div className="h-64 w-full flex items-end justify-between gap-2 pt-8 pb-4 px-2 border-b border-blue-900/60 relative">
                  {/* Línea de referencia de 96 kg */}
                  <div className="absolute top-8 left-0 right-0 border-b border-dashed border-red-500/40 flex justify-end">
                    <span className="text-[10px] text-red-400 bg-black/80 px-1 -mt-2">Base 96.0 kg</span>
                  </div>

                  {weightLogs.map((log, index) => {
                    const heightPercent = Math.max(((log.peso - 85) / (98 - 85)) * 100, 10);
                    return (
                      <div key={index} className="flex-1 flex flex-col items-center gap-2 group relative">
                        {/* Tooltip */}
                        <div className="absolute -top-8 opacity-0 group-hover:opacity-100 bg-blue-900 text-white text-[10px] px-2 py-1 rounded transition-opacity pointer-events-none z-20">
                          {log.peso} kg
                        </div>
                        <div 
                          className="w-full bg-gradient-to-t from-blue-900 via-cyan-600 to-cyan-400 rounded-t shadow-[0_0_10px_rgba(6,182,212,0.5)] transition-all duration-500 group-hover:brightness-125"
                          style={{ height: `${heightPercent}%` }}
                        ></div>
                        <span className="text-[10px] text-gray-400">{log.semana}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 2. GRÁFICA DE TIEMPO EN TIROS */}
            {activeTab === 'tiros' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs text-gray-400">
                  <span className="text-cyan-400">● Tiro Libre (Meta 100)</span>
                  <span className="text-yellow-400">● 3 Puntos (Meta 70)</span>
                </div>

                <div className="h-64 w-full flex items-end justify-between gap-4 pt-6 pb-4 px-2 border-b border-blue-900/60">
                  {basketLogs.map((log, index) => (
                    <div key={index} className="flex-1 flex items-end justify-center gap-1 h-full">
                      {/* Tiro Libre Bar */}
                      <div className="flex-1 flex flex-col items-center h-full justify-end group relative">
                        <span className="text-[9px] text-cyan-300 opacity-0 group-hover:opacity-100 mb-1">{log.tiempoFT}m</span>
                        <div 
                          className="w-full bg-cyan-500/80 rounded-t shadow-[0_0_8px_rgba(6,182,212,0.6)]" 
                          style={{ height: `${(log.tiempoFT / 35) * 100}%` }}
                        ></div>
                      </div>
                      {/* 3 Puntos Bar */}
                      <div className="flex-1 flex flex-col items-center h-full justify-end group relative">
                        <span className="text-[9px] text-yellow-300 opacity-0 group-hover:opacity-100 mb-1">{log.tiempo3PT}m</span>
                        <div 
                          className="w-full bg-yellow-500/80 rounded-t shadow-[0_0_8px_rgba(234,179,8,0.6)]" 
                          style={{ height: `${(log.tiempo3PT / 35) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. GRÁFICA DE FUERZA (CARGAS) */}
            {activeTab === 'fuerza' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs text-gray-400">
                  <span className="text-red-400">● Press Banca (Meta: {METAS.pressBancaTarget} kg)</span>
                  <span className="text-purple-400">● Curl Bíceps (Meta: {METAS.curlBicepsTarget} kg)</span>
                </div>

                <div className="h-64 w-full flex items-end justify-between gap-4 pt-6 pb-4 px-2 border-b border-blue-900/60">
                  {gymLogs.map((log, index) => (
                    <div key={index} className="flex-1 flex items-end justify-center gap-1.5 h-full">
                      <div className="flex-1 flex flex-col items-center h-full justify-end group relative">
                        <span className="text-[9px] text-red-300 opacity-0 group-hover:opacity-100 mb-1">{log.pressBanca}kg</span>
                        <div 
                          className="w-full bg-red-600/80 rounded-t shadow-[0_0_8px_rgba(220,38,38,0.6)]" 
                          style={{ height: `${(log.pressBanca / METAS.pressBancaTarget) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex-1 flex flex-col items-center h-full justify-end group relative">
                        <span className="text-[9px] text-purple-300 opacity-0 group-hover:opacity-100 mb-1">{log.curlBiceps}kg</span>
                        <div 
                          className="w-full bg-purple-600/80 rounded-t shadow-[0_0_8px_rgba(147,51,234,0.6)]" 
                          style={{ height: `${(log.curlBiceps / METAS.curlBicepsTarget) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. GRÁFICA DE RESISTENCIA */}
            {activeTab === 'resistencia' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs text-gray-400">
                  <span>VOLUMEN DE REPETICIONES POR SESIÓN</span>
                  <span className="text-yellow-400">Total Acumulado: {statsSummary.totalReps} Reps</span>
                </div>

                <div className="h-64 w-full flex items-end justify-between gap-3 pt-6 pb-4 px-2 border-b border-blue-900/60">
                  {gymLogs.map((log, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center h-full justify-end group relative">
                      <span className="text-[10px] text-yellow-300 opacity-0 group-hover:opacity-100 mb-1">{log.repsTotales} reps</span>
                      <div 
                        className="w-full bg-gradient-to-t from-yellow-700 to-yellow-400 rounded-t shadow-[0_0_10px_rgba(234,179,8,0.6)]" 
                        style={{ height: `${(log.repsTotales / 120) * 100}%` }}
                      ></div>
                      <span className="text-[9px] text-gray-500 mt-2">{log.fecha}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};

export default SoloLevelingDashboard;