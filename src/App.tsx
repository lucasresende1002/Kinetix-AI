import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronRight, 
  Clock, 
  Dumbbell, 
  Info, 
  Moon, 
  Plus, 
  ShieldAlert, 
  Stethoscope, 
  TrendingUp,
  User,
  Zap,
  RotateCcw,
  Target
} from 'lucide-react';
import { assessAthleteRisk, AthleteData, AssessmentResult } from './services/geminiService';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Logo } from './components/Logo';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [formData, setFormData] = useState<AthleteData>({
    age: 25,
    sport: '',
    daysSinceLastInjury: 30,
    bpm: 140,
    pse: 7,
    distanceKm: 5,
    sleepHours: 8,
    stressLevel: 5,
    currentPainLevel: 0,
    currentPainLocation: '',
    isRecurrence: false,
    isCompensatory: false,
    injuryType: 'Muscular',
    rehabStatus: 'Recente',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const assessment = await assessAthleteRisk(formData);
      setResult(assessment);
    } catch (error) {
      console.error("Falha na avaliação:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-[#E4E3E0] relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 data-grid pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 border-b border-[#141414] px-6 py-4 flex justify-between items-center bg-[#E4E3E0]/80 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <Logo className="w-12 h-12" />
          <div>
            <h1 className="font-mono text-xl font-black tracking-tighter uppercase leading-none">KINETIX AI</h1>
            <p className="font-serif italic text-[10px] opacity-60 uppercase tracking-widest">Advanced Biomechanical Intelligence</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-6 font-mono text-[10px] uppercase opacity-60">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Core Engine: Online</span>
          </div>
          <div className="h-4 w-[1px] bg-[#141414]/20" />
          <span>v2.5.0</span>
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto p-6 lg:p-12">
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid lg:grid-cols-12 gap-12"
            >
              {/* Left Column: Intro */}
              <div className="lg:col-span-4 space-y-8">
                <div className="space-y-4">
                  <div className="inline-block px-3 py-1 bg-[#141414] text-[#E4E3E0] font-mono text-[9px] uppercase tracking-widest rounded-full">
                    Protocolo de Segurança
                  </div>
                  <h2 className="font-serif italic text-5xl lg:text-6xl leading-tight">
                    Blindagem <br />
                    <span className="font-sans not-italic font-bold uppercase tracking-tighter">Atlética</span>
                  </h2>
                  <p className="text-sm opacity-70 leading-relaxed max-w-sm">
                    O KINETIX AI processa vetores de esforço e biomarcadores em tempo real para blindar sua performance contra falhas estruturais.
                  </p>
                </div>

                <div className="space-y-6 pt-8 border-t border-[#141414]/10">
                  <div className="flex items-start gap-3 group">
                    <div className="w-8 h-8 rounded-lg bg-[#141414]/5 flex items-center justify-center group-hover:bg-[#141414] group-hover:text-[#E4E3E0] transition-colors">
                      <Target className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-mono text-[11px] font-bold uppercase">Precisão Cirúrgica</h3>
                      <p className="text-[11px] opacity-60">Análise baseada em redes neurais de medicina esportiva.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 group">
                    <div className="w-8 h-8 rounded-lg bg-[#141414]/5 flex items-center justify-center group-hover:bg-[#141414] group-hover:text-[#E4E3E0] transition-colors">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-mono text-[11px] font-bold uppercase">Resposta Imediata</h3>
                      <p className="text-[11px] opacity-60">Diagnóstico de risco gerado em milissegundos.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Form */}
              <div className="lg:col-span-8">
                <form onSubmit={handleSubmit} className="space-y-8 bg-white/40 p-8 rounded-3xl border border-[#141414]/5 backdrop-blur-md shadow-2xl shadow-black/5">
                  <div className="grid md:grid-cols-2 gap-10">
                    {/* Section: Perfil */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 border-b-2 border-[#141414] pb-2">
                        <User className="w-4 h-4" />
                        <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest">Identidade Bio</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="font-mono text-[9px] uppercase opacity-50">Idade</label>
                          <input 
                            type="number" 
                            value={formData.age}
                            onChange={e => setFormData({...formData, age: Number(e.target.value)})}
                            className="w-full bg-transparent border-b border-[#141414]/20 py-2 font-mono text-sm focus:border-[#141414] outline-none transition-colors"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="font-mono text-[9px] uppercase opacity-50">Esporte</label>
                          <input 
                            type="text" 
                            placeholder="Ex: Futebol"
                            value={formData.sport}
                            onChange={e => setFormData({...formData, sport: e.target.value})}
                            className="w-full bg-transparent border-b border-[#141414]/20 py-2 font-mono text-sm focus:border-[#141414] outline-none transition-colors"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="font-mono text-[9px] uppercase opacity-50">Histórico (Dias sem lesão)</label>
                        <input 
                          type="number" 
                          value={formData.daysSinceLastInjury}
                          onChange={e => setFormData({...formData, daysSinceLastInjury: Number(e.target.value)})}
                          className="w-full bg-transparent border-b border-[#141414]/20 py-2 font-mono text-sm focus:border-[#141414] outline-none transition-colors"
                        />
                      </div>
                    </div>

                    {/* Section: Histórico de Lesão Detalhado */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 border-b-2 border-[#141414] pb-2">
                        <ShieldAlert className="w-4 h-4" />
                        <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest">Histórico de Lesão</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="font-mono text-[9px] uppercase opacity-50">Tipo de Lesão</label>
                          <select 
                            value={formData.injuryType}
                            onChange={e => setFormData({...formData, injuryType: e.target.value})}
                            className="w-full bg-transparent border-b border-[#141414]/20 py-2 font-mono text-sm focus:border-[#141414] outline-none transition-colors"
                          >
                            <option value="Muscular">Muscular</option>
                            <option value="Ligamentar">Ligamentar</option>
                            <option value="Tendínea">Tendínea</option>
                            <option value="Outra">Outra</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="font-mono text-[9px] uppercase opacity-50">Status Reabilitação</label>
                          <select 
                            value={formData.rehabStatus}
                            onChange={e => setFormData({...formData, rehabStatus: e.target.value})}
                            className="w-full bg-transparent border-b border-[#141414]/20 py-2 font-mono text-sm focus:border-[#141414] outline-none transition-colors"
                          >
                            <option value="Recente">Recente</option>
                            <option value="Antiga e Bem Reabilitada">Antiga/Reabilitada</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex flex-col gap-3">
                        <label className="flex items-center gap-3 cursor-pointer group">
                          <input 
                            type="checkbox"
                            checked={formData.isRecurrence}
                            onChange={e => setFormData({...formData, isRecurrence: e.target.checked})}
                            className="w-4 h-4 rounded border-[#141414]/20 text-[#141414] focus:ring-[#141414]"
                          />
                          <span className="font-mono text-[10px] uppercase opacity-70 group-hover:opacity-100 transition-opacity">Reincidência no mesmo local</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer group">
                          <input 
                            type="checkbox"
                            checked={formData.isCompensatory}
                            onChange={e => setFormData({...formData, isCompensatory: e.target.checked})}
                            className="w-4 h-4 rounded border-[#141414]/20 text-[#141414] focus:ring-[#141414]"
                          />
                          <span className="font-mono text-[10px] uppercase opacity-70 group-hover:opacity-100 transition-opacity">Lesão Compensatória (Cadeia)</span>
                        </label>
                      </div>
                    </div>

                    {/* Section: Métricas de Treino */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 border-b-2 border-[#141414] pb-2">
                        <Activity className="w-4 h-4" />
                        <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest">Vetores de Carga</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="font-mono text-[9px] uppercase opacity-50">BPM (Pico)</label>
                          <input 
                            type="number" 
                            value={formData.bpm}
                            onChange={e => setFormData({...formData, bpm: Number(e.target.value)})}
                            className="w-full bg-transparent border-b border-[#141414]/20 py-2 font-mono text-sm focus:border-[#141414] outline-none transition-colors"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="font-mono text-[9px] uppercase opacity-50">Volume (KM)</label>
                          <input 
                            type="number" step="0.1"
                            value={formData.distanceKm}
                            onChange={e => setFormData({...formData, distanceKm: Number(e.target.value)})}
                            className="w-full bg-transparent border-b border-[#141414]/20 py-2 font-mono text-sm focus:border-[#141414] outline-none transition-colors"
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="font-mono text-[9px] uppercase opacity-50">PSE (Intensidade 1-10)</label>
                        <input 
                          type="range" min="1" max="10"
                          value={formData.pse}
                          onChange={e => setFormData({...formData, pse: Number(e.target.value)})}
                          className="w-full h-1 bg-[#141414]/10 rounded-lg appearance-none cursor-pointer accent-[#141414] mt-4"
                        />
                        <div className="flex justify-between font-mono text-[8px] opacity-40">
                          <span>LEVE</span>
                          <span>{formData.pse}</span>
                          <span>MÁXIMO</span>
                        </div>
                      </div>
                    </div>

                    {/* Section: Recuperação */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 border-b-2 border-[#141414] pb-2">
                        <Moon className="w-4 h-4" />
                        <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest">Status de Recuperação</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="font-mono text-[9px] uppercase opacity-50">Sono (Horas)</label>
                          <input 
                            type="number" 
                            value={formData.sleepHours}
                            onChange={e => setFormData({...formData, sleepHours: Number(e.target.value)})}
                            className="w-full bg-transparent border-b border-[#141414]/20 py-2 font-mono text-sm focus:border-[#141414] outline-none transition-colors"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="font-mono text-[9px] uppercase opacity-50">Estresse (1-10)</label>
                          <input 
                            type="range" min="1" max="10"
                            value={formData.stressLevel}
                            onChange={e => setFormData({...formData, stressLevel: Number(e.target.value)})}
                            className="w-full h-1 bg-[#141414]/10 rounded-lg appearance-none cursor-pointer accent-[#141414] mt-4"
                          />
                          <div className="flex justify-between font-mono text-[8px] opacity-40">
                            <span>CALMO</span>
                            <span>{formData.stressLevel}</span>
                            <span>ESTRESSADO</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Section: Dor */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 border-b-2 border-[#141414] pb-2">
                        <AlertTriangle className="w-4 h-4" />
                        <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest">Sinais de Alerta</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="font-mono text-[9px] uppercase opacity-50">Dor (0-10)</label>
                          <input 
                            type="number" min="0" max="10"
                            value={formData.currentPainLevel}
                            onChange={e => setFormData({...formData, currentPainLevel: Number(e.target.value)})}
                            className="w-full bg-transparent border-b border-[#141414]/20 py-2 font-mono text-sm focus:border-[#141414] outline-none transition-colors"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="font-mono text-[9px] uppercase opacity-50">Localização</label>
                          <input 
                            type="text" 
                            placeholder="Ex: Joelho"
                            value={formData.currentPainLocation}
                            onChange={e => setFormData({...formData, currentPainLocation: e.target.value})}
                            className="w-full bg-transparent border-b border-[#141414]/20 py-2 font-mono text-sm focus:border-[#141414] outline-none transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <button
                      type="submit"
                      disabled={loading}
                      className={cn(
                        "w-full py-5 bg-[#141414] text-[#E4E3E0] font-mono text-sm font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-all active:scale-[0.98] rounded-xl shadow-xl shadow-black/20",
                        loading && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-[#E4E3E0]/20 border-t-[#E4E3E0] rounded-full animate-spin" />
                          Processando Vetores...
                        </>
                      ) : (
                        <>
                          Iniciar Diagnóstico
                          <ChevronRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="space-y-8"
            >
              {/* Result Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="space-y-2">
                  <button 
                    onClick={handleReset}
                    className="flex items-center gap-2 font-mono text-[10px] uppercase opacity-50 hover:opacity-100 transition-opacity mb-4 bg-[#141414]/5 px-3 py-1 rounded-full"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Novo Diagnóstico
                  </button>
                  <h2 className="font-serif italic text-5xl lg:text-6xl">Relatório <br /><span className="font-sans not-italic font-bold uppercase tracking-tighter">KINETIX</span></h2>
                </div>

                <div className="bg-[#141414] text-[#E4E3E0] p-10 rounded-3xl min-w-[280px] flex flex-col items-center justify-center space-y-2 shadow-2xl shadow-black/30">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-60">Risco Biomecânico</span>
                  <div className={cn(
                    "text-5xl font-black uppercase tracking-tighter",
                    result.riskLevel === 'Alto' ? 'text-red-500' : 
                    result.riskLevel === 'Moderado' ? 'text-amber-500' : 'text-emerald-500'
                  )}>
                    {result.riskLevel}
                  </div>
                  <div className="w-full h-2 bg-[#E4E3E0]/10 rounded-full mt-6 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${result.riskScore}%` }}
                      className={cn(
                        "h-full",
                        result.riskLevel === 'Alto' ? 'bg-red-500' : 
                        result.riskLevel === 'Moderado' ? 'bg-amber-500' : 'bg-emerald-500'
                      )}
                    />
                  </div>
                  <span className="font-mono text-[10px] opacity-40 mt-2 tracking-widest">SCORE: {result.riskScore}/100</span>
                </div>
              </div>

              {/* Result Grid */}
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Analysis */}
                <div className="lg:col-span-2 space-y-8">
                  <div className="bg-white p-10 rounded-3xl border border-[#141414]/5 shadow-2xl shadow-black/5">
                    <div className="flex items-center gap-3 border-b-2 border-[#141414] pb-4 mb-8">
                      <Activity className="w-6 h-6" />
                      <h3 className="font-mono text-sm font-bold uppercase tracking-widest">Análise de Redes Neurais</h3>
                    </div>
                    <p className="text-base leading-relaxed opacity-80 font-medium italic font-serif">
                      "{result.analysis}"
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white p-10 rounded-3xl border border-[#141414]/5 shadow-2xl shadow-black/5">
                      <div className="flex items-center gap-3 border-b-2 border-[#141414] pb-4 mb-8">
                        <Zap className="w-6 h-6" />
                        <h3 className="font-mono text-sm font-bold uppercase tracking-widest">Protocolos</h3>
                      </div>
                      <ul className="space-y-6">
                        {result.recommendations.map((rec, i) => (
                          <li key={i} className="flex items-start gap-4 text-sm opacity-80 group">
                            <div className="w-6 h-6 rounded-full bg-[#141414]/5 flex items-center justify-center flex-shrink-0 group-hover:bg-[#141414] group-hover:text-[#E4E3E0] transition-colors">
                              <span className="font-mono text-[10px]">{i+1}</span>
                            </div>
                            <span className="leading-tight">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-white p-10 rounded-3xl border border-[#141414]/5 shadow-2xl shadow-black/5">
                      <div className="flex items-center gap-3 border-b-2 border-[#141414] pb-4 mb-8">
                        <TrendingUp className="w-6 h-6" />
                        <h3 className="font-mono text-sm font-bold uppercase tracking-widest">Biomarcadores</h3>
                      </div>
                      <div className="space-y-4">
                        {result.keyFactors.map((factor, i) => (
                          <div key={i} className="flex items-center justify-between p-4 bg-[#E4E3E0]/30 rounded-xl border border-[#141414]/5">
                            <span className="text-[11px] font-mono uppercase font-bold tracking-tight">{factor.factor}</span>
                            {factor.impact === 'Positivo' ? (
                              <div className="flex items-center gap-1 text-emerald-600">
                                <span className="font-mono text-[9px] font-bold">OTIMIZADO</span>
                                <CheckCircle2 className="w-4 h-4" />
                              </div>
                            ) : factor.impact === 'Negativo' ? (
                              <div className="flex items-center gap-1 text-red-600">
                                <span className="font-mono text-[9px] font-bold">CRÍTICO</span>
                                <AlertTriangle className="w-4 h-4" />
                              </div>
                            ) : (
                              <div className="flex items-center gap-1 text-amber-600">
                                <span className="font-mono text-[9px] font-bold">ALERTA</span>
                                <Info className="w-4 h-4" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sidebar: Quick Stats */}
                <div className="space-y-8">
                  <div className="bg-[#141414] text-[#E4E3E0] p-10 rounded-3xl space-y-8 shadow-2xl shadow-black/20">
                    <div className="flex items-center justify-between">
                      <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest opacity-50">Log de Sessão</h3>
                      <Logo className="w-6 h-6 opacity-50" />
                    </div>
                    <div className="space-y-6">
                      <div className="flex justify-between items-center border-b border-[#E4E3E0]/10 pb-3">
                        <span className="font-mono text-[10px] uppercase opacity-60">Modalidade</span>
                        <span className="text-sm font-bold tracking-tight">{formData.sport}</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-[#E4E3E0]/10 pb-3">
                        <span className="font-mono text-[10px] uppercase opacity-60">Carga Ativa</span>
                        <span className="text-sm font-bold tracking-tight">{formData.distanceKm}km | PSE {formData.pse}</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-[#E4E3E0]/10 pb-3">
                        <span className="font-mono text-[10px] uppercase opacity-60">Cardio Pico</span>
                        <span className="text-sm font-bold tracking-tight">{formData.bpm} BPM</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-[#E4E3E0]/10 pb-3">
                        <span className="font-mono text-[10px] uppercase opacity-60">Tipo Lesão</span>
                        <span className="text-sm font-bold tracking-tight">{formData.injuryType}</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-[#E4E3E0]/10 pb-3">
                        <span className="font-mono text-[10px] uppercase opacity-60">Reincidência</span>
                        <span className="text-sm font-bold tracking-tight">{formData.isRecurrence ? 'SIM' : 'NÃO'}</span>
                      </div>
                    </div>
                    <div className="pt-6">
                      <div className="p-6 bg-[#E4E3E0]/5 rounded-2xl border border-[#E4E3E0]/10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-2 opacity-10">
                          <ShieldAlert className="w-12 h-12" />
                        </div>
                        <p className="text-[11px] italic opacity-70 leading-relaxed relative z-10">
                          "O KINETIX AI não apenas prevê o risco, ele redefine sua capacidade de adaptação fisiológica através de dados."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Decoration */}
      <footer className="relative z-10 p-12 flex flex-col items-center gap-4 opacity-30">
        <div className="w-24 h-[1px] bg-[#141414]" />
        <div className="font-mono text-[8px] uppercase tracking-[0.8em]">
          KINETIX NEURAL ENGINE // SECURED BY AI
        </div>
      </footer>
    </div>
  );
}
