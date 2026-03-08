"use client";

import { useState } from "react";
import { Application, AIAnalysis, analyzeApplication } from "@/lib/applications";

interface AIAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  application: Application | null;
}

export default function AIAnalysisModal({
  isOpen,
  onClose,
  application,
}: AIAnalysisModalProps) {
  const [cvText, setCvText] = useState("");
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen || !application) return null;

  const handleAnalyze = async () => {
    if (!cvText.trim()) {
      setError("Por favor ingresa el texto de tu CV");
      return;
    }
    setLoading(true);
    setError("");
    setAnalysis(null);
    try {
      const result = await analyzeApplication(application.id, cvText);
      setAnalysis(result);
    } catch {
      setError("Error al analizar. Asegúrate que la postulación tiene descripción del trabajo.");
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 75) return "text-green-400";
    if (score >= 50) return "text-yellow-400";
    return "text-red-400";
  };

  const getScoreBg = (score: number) => {
    if (score >= 75) return "from-green-500 to-green-600";
    if (score >= 50) return "from-yellow-500 to-yellow-600";
    return "from-red-500 to-red-600";
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 border border-white/20 rounded-2xl p-8 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-white">
            🤖 Análisis IA — {application.position}
          </h2>
          <button
            onClick={() => { onClose(); setAnalysis(null); setCvText(""); }}
            className="text-slate-400 hover:text-white text-2xl"
          >
            ✕
          </button>
        </div>

        <p className="text-slate-400 text-sm mb-4">
          🏢 {application.company}
        </p>

        {!analysis ? (
          <div className="space-y-4">
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Pega el texto de tu CV *
              </label>
              <textarea
                value={cvText}
                onChange={(e) => setCvText(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                placeholder="Copia y pega aquí todo el texto de tu CV..."
                rows={8}
              />
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {!application.job_description && (
              <div className="bg-yellow-500/20 border border-yellow-500/50 text-yellow-200 px-4 py-3 rounded-lg text-sm">
                ⚠️ Esta postulación no tiene descripción del trabajo. Edítala primero para poder analizar.
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => { onClose(); setCvText(""); }}
                className="flex-1 bg-white/10 hover:bg-white/20 text-white font-medium py-3 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleAnalyze}
                disabled={loading || !application.job_description}
                className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors"
              >
                {loading ? "⏳ Analizando con IA..." : "🤖 Analizar compatibilidad"}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Score */}
            <div className={`bg-gradient-to-br ${getScoreBg(analysis.score)} rounded-2xl p-6 text-center`}>
              <div className="text-6xl font-bold text-white">{analysis.score}</div>
              <div className="text-white/80 mt-1">/ 100 puntos de compatibilidad</div>
            </div>

            {/* Summary */}
            <div className="bg-white/10 rounded-xl p-4">
              <h3 className="text-white font-medium mb-2">📋 Resumen</h3>
              <p className="text-slate-300 text-sm">{analysis.summary}</p>
            </div>

            {/* Strengths */}
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <h3 className="text-green-400 font-medium mb-3">✅ Fortalezas</h3>
              <ul className="space-y-2">
                {analysis.strengths.map((s, i) => (
                  <li key={i} className="text-slate-300 text-sm flex gap-2">
                    <span className="text-green-400">•</span> {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* Improvements */}
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
              <h3 className="text-yellow-400 font-medium mb-3">⚡ Áreas de mejora</h3>
              <ul className="space-y-2">
                {analysis.improvements.map((imp, i) => (
                  <li key={i} className="text-slate-300 text-sm flex gap-2">
                    <span className="text-yellow-400">•</span> {imp}
                  </li>
                ))}
              </ul>
            </div>

            {/* Keywords */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                <h3 className="text-blue-400 font-medium mb-3">🎯 Keywords encontradas</h3>
                <div className="flex flex-wrap gap-2">
                  {analysis.keywords_found.map((k, i) => (
                    <span key={i} className="bg-blue-500/20 text-blue-300 text-xs px-2 py-1 rounded-full">
                      {k}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                <h3 className="text-red-400 font-medium mb-3">❌ Keywords faltantes</h3>
                <div className="flex flex-wrap gap-2">
                  {analysis.keywords_missing.map((k, i) => (
                    <span key={i} className="bg-red-500/20 text-red-300 text-xs px-2 py-1 rounded-full">
                      {k}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setAnalysis(null)}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-lg transition-colors"
            >
              🔄 Analizar de nuevo
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 
