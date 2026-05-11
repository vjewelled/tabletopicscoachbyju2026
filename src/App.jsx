import React, { useState, useEffect, useRef, useCallback } from "react";
import { Play, Pause, RotateCcw, SkipForward, Heart, Moon, Sun, Flame, History, Sparkles, Zap, Shuffle, BookOpen, X, Check, Clock, Award, Target, ChevronRight, Mic, MicOff, Square, Download } from "lucide-react";

// ============ QUESTION DATABASE ============
const QUESTIONS = {
  Funny: [
    "If animals could talk, which would be the rudest?",
    "What is the weirdest food combination you secretly enjoy?",
    "If your life were a sitcom, what would it be called?",
    "What is the most embarrassing thing you've done in public?",
    "If you were banned from using your favorite app for a year, what would happen?",
    "What conspiracy theory would be hilarious if true?",
    "If you became famous overnight, what would it be for?",
    "What is your funniest childhood memory?",
    "If your pet could review you online, what would it say?",
    "What is the strangest gift you've ever received?",
    "If you had to survive using only items in your bag right now, how long would you last?",
    "What fictional villain do you secretly sympathize with?",
    "What would your warning label say?",
    "What is the worst fashion trend you followed?",
    "If you could swap lives with a cartoon character for a day, who would it be?",
    "What is the funniest misunderstanding you've experienced?",
    "If aliens landed today, what would you show them first?",
    "What would happen if social media disappeared tomorrow?",
    "If you had a personal theme song, what would it sound like?",
    "What's the most dramatic thing you've done over something small?",
    "What is the funniest April Fools prank you've seen?",
  ],
  Deep: [
    "What moment made you realize life is short?",
    "What does home mean to you?",
    "What is something people pretend to understand?",
    "What is harder: starting or letting go?",
    "What does peace look like in your life?",
    "What is a silent struggle many people face?",
    "What does authenticity mean?",
    "What do people chase that never truly satisfies them?",
    "What is one memory you never want to forget?",
    "What role does faith or hope play during difficult times?",
    "What is something you learned too late?",
    "What is one thing you wish people appreciated more?",
    "What makes life meaningful beyond achievement?",
    "What personal value would you never compromise?",
    "What does emotional strength look like?",
    "What is something people need to forgive themselves for?",
    "What is one thing that instantly brings you comfort?",
    "What is the difference between surviving and thriving?",
    "What kind of legacy do you want to leave?",
    "What does being truly present mean?",
    "When you are 80 years old, what will matter to you the most?",
    "What is the difference between living and existing?",
  ],
  Leadership: [
    "What makes a good leader?",
    "Describe the best boss you've ever had.",
    "What is a leadership lesson you learned the hard way?",
    "What role does kindness play in leadership?",
    "What separates average speakers from memorable ones?",
    "What is one thing every manager should stop doing?",
    "What role does confidence play in success?",
    "What quality makes people trust someone?",
    "How do you handle criticism?",
    "What makes teamwork difficult?",
    "What is the biggest mistake young professionals make?",
    "What does professionalism mean today?",
    "What is more important: talent or consistency?",
    "What is the best career advice you've received?",
    "How do you stay productive during difficult days?",
    "What workplace habit annoys you the most?",
    "What does discipline mean to you?",
    "What is the best way to resolve conflict?",
    "What does respect look like?",
    "How do you know someone truly listens to you?",
  ],
  Career: [
    "What career would you pursue if money didn't matter?",
    "What workplace trend excites you most?",
    "Would you rather work remotely forever or always in an office?",
    "What is your dream work environment?",
    "What should schools teach that they currently don't?",
    "What is one decision that changed your path?",
    "What moment made you feel truly proud of yourself?",
    "What is the best compliment you ever received?",
    "What is a skill everyone should learn?",
    "What habit changed your life the most?",
    "What does success mean to you today?",
    "What does success cost?",
    "What experience taught you humility?",
    "What is one thing people misunderstand about you?",
    "Describe your first day at a new job or school.",
    "What would your future self thank you for?",
    "What is something you used to believe but no longer do?",
    "What lesson took you too long to learn?",
    "What motivates you when you feel stuck?",
    "What challenge made you stronger?",
  ],
  Relationships: [
    "What makes a friendship last?",
    "What is something people need to hear more often?",
    "What is the biggest problem in modern communication?",
    "What tradition should never disappear?",
    "What is one social rule that makes no sense?",
    "What makes someone unforgettable?",
    "What is something society pressures people too much about?",
    "What is one thing parents should teach children earlier?",
    "What makes someone emotionally intelligent?",
    "What small act can brighten someone's day?",
    "What is more important: honesty or kindness?",
    "What role does forgiveness play in life?",
    "What makes conversations meaningful?",
    "What social habit should disappear forever?",
    "What does loyalty mean to you?",
    "What is the secret to a healthy relationship?",
    "Who do you sometimes compare yourself to?",
    "What advice would you give your younger self?",
    "What is the best compliment to give someone?",
    "What makes someone trustworthy?",
  ],
  Storytelling: [
    "Tell us about a moment you almost gave up.",
    "Describe a time you learned from failure.",
    "Share a story about an unexpected opportunity.",
    "Talk about a memorable travel experience.",
    "Describe a moment that changed your perspective.",
    "Share a story about an awkward misunderstanding.",
    "Tell us about a teacher who impacted your life.",
    "Describe a challenge you didn't expect to overcome.",
    "Share a story about a risk that paid off.",
    "Tell us about a moment you felt completely unprepared.",
    "Describe your first day at a new job or school.",
    "Share a story involving a random act of kindness.",
    "Talk about a moment you laughed uncontrollably.",
    "Describe a lesson you learned from a child.",
    "Share a story about getting lost.",
    "Talk about a moment that restored your faith in people.",
    "Describe a time you had to speak up.",
    "Share a story about a surprising coincidence.",
    "Talk about a moment you felt brave.",
    "Describe a mistake that turned into something positive.",
    "Have you done anything lately worth remembering?",
    "What is your favorite holiday memory?",
  ],
  Technology: [
    "Is technology making people more connected or more isolated?",
    "What app has impacted your life the most?",
    "Would you trust AI to make important life decisions?",
    "What technology do you wish existed?",
    "What invention changed humanity the most?",
    "What would happen if the internet shut down for one week?",
    "Is social media helping or harming society?",
    "What skill is becoming more valuable because of AI?",
    "What job will disappear in the future?",
    "What technology scares you the most?",
    "What is one gadget you cannot live without?",
    "Should children have smartphones?",
    "How has technology changed friendships?",
    "What futuristic movie seems realistic now?",
    "What should never be automated?",
    "Is privacy becoming impossible?",
    "What is the biggest distraction in modern life?",
    "How should people balance screen time?",
    "What invention would improve your daily routine?",
    "What role should AI play in education?",
  ],
  Philosophy: [
    "What does freedom mean to you?",
    "Is happiness a choice?",
    "What gives life meaning?",
    "Can money buy peace of mind?",
    "What is more important: being respected or being liked?",
    "What makes someone wise?",
    "What is one thing people waste too much time on?",
    "What is the purpose of failure?",
    "Is it better to be realistic or optimistic?",
    "What is one truth people avoid?",
    "What does integrity look like?",
    "What is something worth sacrificing for?",
    "Can people truly change?",
    "What does maturity mean?",
    "What should people stop chasing?",
    "What is the difference between confidence and arrogance?",
    "What does living intentionally mean?",
    "What role does gratitude play in happiness?",
    "What belief shapes your life the most?",
    "Would you rather be a worried genius or a joyful simpleton?",
    "Which is worse: failing or never trying?",
    "Would you break the law to save a loved one?",
  ],
  "Rapid Fire": [
    "Coffee or tea, and why?",
    "Morning person or night owl?",
    "What is your comfort food?",
    "What song instantly changes your mood?",
    "What is your favorite word?",
    "What superpower would be the least useful?",
    "What is your go-to excuse for being late?",
    "What movie can you watch repeatedly?",
    "What smell brings back memories?",
    "What is your hidden talent?",
    "What is the best snack during a long meeting?",
    "What is your most used emoji?",
    "What is your favorite season and why?",
    "What is one thing you always procrastinate on?",
    "What fictional world would you vacation in?",
    "What is your weirdest habit?",
    "What instantly improves your mood?",
    "What is your guilty pleasure TV show?",
    "What would your TED Talk be about?",
    "What is one question you wish people asked more often?",
    "What makes you smile?",
    "What are you most grateful for?",
  ],
};

const CATEGORIES = Object.keys(QUESTIONS);
const ALL_QUESTIONS = CATEGORIES.flatMap((cat) => QUESTIONS[cat].map((q) => ({ text: q, category: cat })));

const CATEGORY_COLORS = {
  Funny: { bg: "bg-amber-500", text: "text-amber-700", soft: "bg-amber-50", border: "border-amber-300", dark: "dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-700" },
  Deep: { bg: "bg-indigo-600", text: "text-indigo-700", soft: "bg-indigo-50", border: "border-indigo-300", dark: "dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-700" },
  Leadership: { bg: "bg-rose-600", text: "text-rose-700", soft: "bg-rose-50", border: "border-rose-300", dark: "dark:bg-rose-900/30 dark:text-rose-300 dark:border-rose-700" },
  Career: { bg: "bg-emerald-600", text: "text-emerald-700", soft: "bg-emerald-50", border: "border-emerald-300", dark: "dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700" },
  Relationships: { bg: "bg-pink-500", text: "text-pink-700", soft: "bg-pink-50", border: "border-pink-300", dark: "dark:bg-pink-900/30 dark:text-pink-300 dark:border-pink-700" },
  Storytelling: { bg: "bg-violet-600", text: "text-violet-700", soft: "bg-violet-50", border: "border-violet-300", dark: "dark:bg-violet-900/30 dark:text-violet-300 dark:border-violet-700" },
  Technology: { bg: "bg-cyan-600", text: "text-cyan-700", soft: "bg-cyan-50", border: "border-cyan-300", dark: "dark:bg-cyan-900/30 dark:text-cyan-300 dark:border-cyan-700" },
  Philosophy: { bg: "bg-slate-700", text: "text-slate-700", soft: "bg-slate-100", border: "border-slate-300", dark: "dark:bg-slate-700/40 dark:text-slate-300 dark:border-slate-600" },
  "Rapid Fire": { bg: "bg-orange-500", text: "text-orange-700", soft: "bg-orange-50", border: "border-orange-300", dark: "dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-700" },
};

// ============ AUDIO (Web Audio API tones, no external assets) ============
const useAudio = () => {
  const ctxRef = useRef(null);
  const getCtx = () => {
    if (!ctxRef.current) {
      try {
        ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      } catch (e) {}
    }
    return ctxRef.current;
  };
  const tick = useCallback(() => {
    const ctx = getCtx();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = 1800;
    osc.type = "sine";
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.05, ctx.currentTime + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.06);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.07);
  }, []);
  const chime = useCallback(() => {
    const ctx = getCtx();
    if (!ctx) return;
    [880, 1320].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = freq;
      osc.type = "sine";
      const t = ctx.currentTime + i * 0.12;
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(0.2, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.7);
      osc.connect(gain).connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.75);
    });
  }, []);
  const bell = useCallback(() => {
    const ctx = getCtx();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = 660;
    osc.type = "triangle";
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 1.3);
  }, []);
  return { tick, chime, bell };
};

// ============ MAIN APP ============
export default function App() {
  // Persisted state
  const [darkMode, setDarkMode] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [history, setHistory] = useState([]);
  const [streak, setStreak] = useState(0);
  const [lastSessionDate, setLastSessionDate] = useState(null);
  const [totalSessions, setTotalSessions] = useState(0);
  const [confidenceScore, setConfidenceScore] = useState(50);
  const [soundOn, setSoundOn] = useState(true);

  // UI state
  const [selectedCategories, setSelectedCategories] = useState(new Set(CATEGORIES));
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [showFavoritesPanel, setShowFavoritesPanel] = useState(false);
  const [showHistoryPanel, setShowHistoryPanel] = useState(false);
  const [flipKey, setFlipKey] = useState(0);
  const [evalNotes, setEvalNotes] = useState("");

  // Timer state
  const [speechDuration, setSpeechDuration] = useState(120); // seconds
  const [customDuration, setCustomDuration] = useState(90);
  const [phase, setPhase] = useState("idle"); // idle | thinking | speaking | done
  const [prepTime, setPrepTime] = useState(30);
  const [prepRemaining, setPrepRemaining] = useState(30);
  const [speechElapsed, setSpeechElapsed] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Modes
  const [challengeMode, setChallengeMode] = useState(false);
  const [hotSeatMode, setHotSeatMode] = useState(false);
  const hotSeatRef = useRef(null);

  // Recording state
  const [recordingEnabled, setRecordingEnabled] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingUrl, setRecordingUrl] = useState(null);
  const [recordingError, setRecordingError] = useState(null);
  const [recordings, setRecordings] = useState([]); // {url, name, ts}
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const streamRef = useRef(null);

  const { tick, chime, bell } = useAudio();
  const intervalRef = useRef(null);

  // Load from localStorage
  useEffect(() => {
    try {
      const data = localStorage.getItem("tm-tabletopics");
      if (data) {
        const p = JSON.parse(data);
        setDarkMode(p.darkMode ?? false);
        setFavorites(p.favorites ?? []);
        setHistory(p.history ?? []);
        setStreak(p.streak ?? 0);
        setLastSessionDate(p.lastSessionDate ?? null);
        setTotalSessions(p.totalSessions ?? 0);
        setConfidenceScore(p.confidenceScore ?? 50);
        setSoundOn(p.soundOn ?? true);
      }
    } catch (e) {}
  }, []);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        "tm-tabletopics",
        JSON.stringify({ darkMode, favorites, history, streak, lastSessionDate, totalSessions, confidenceScore, soundOn })
      );
    } catch (e) {}
  }, [darkMode, favorites, history, streak, lastSessionDate, totalSessions, confidenceScore, soundOn]);

  // Apply dark mode
  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  // ===== Recording =====
  const startRecording = useCallback(async () => {
    if (!recordingEnabled) return;
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setRecordingError("Recording is not supported in this browser.");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      audioChunksRef.current = [];
      const mr = new MediaRecorder(stream);
      mr.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) audioChunksRef.current.push(e.data);
      };
      mr.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: mr.mimeType || "audio/webm" });
        const url = URL.createObjectURL(blob);
        setRecordingUrl(url);
        setRecordings((prev) => [{ url, name: `Speech ${new Date().toLocaleString()}`, ts: Date.now() }, ...prev].slice(0, 5));
        // Stop all tracks to release the mic
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((t) => t.stop());
          streamRef.current = null;
        }
      };
      mediaRecorderRef.current = mr;
      mr.start();
      setIsRecording(true);
      setRecordingError(null);
    } catch (err) {
      setRecordingError(err?.name === "NotAllowedError" ? "Microphone access denied." : "Could not start recording.");
      setRecordingEnabled(false);
    }
  }, [recordingEnabled]);

  const stopRecording = useCallback(() => {
    const mr = mediaRecorderRef.current;
    if (mr && mr.state !== "inactive") {
      try { mr.stop(); } catch (e) {}
    }
    setIsRecording(false);
  }, []);

  // Clean up the active stream on unmount
  useEffect(() => () => {
    if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop());
  }, []);

  // ===== Timer logic =====
  useEffect(() => {
    if (phase === "idle" || phase === "done" || isPaused) {
      clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      if (phase === "thinking") {
        setPrepRemaining((r) => {
          if (r <= 1) {
            if (soundOn) chime();
            setPhase("speaking");
            setSpeechElapsed(0);
            return 0;
          }
          if (soundOn && r <= 6) tick();
          return r - 1;
        });
      } else if (phase === "speaking") {
        setSpeechElapsed((e) => {
          const next = e + 1;
          // Toastmasters indicator chimes
          const min = Math.floor(speechDuration * 0.5);
          const yellow = Math.floor(speechDuration * 0.75);
          const red = speechDuration;
          if (soundOn && (next === min || next === yellow || next === red)) bell();
          if (next >= speechDuration + 30) {
            setPhase("done");
            return next;
          }
          return next;
        });
      }
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [phase, isPaused, soundOn, speechDuration, tick, chime, bell]);

  // Auto start/stop recording on phase changes
  useEffect(() => {
    if (phase === "speaking" && recordingEnabled && !isRecording) {
      // Clear any previous recording url when a fresh speech begins
      setRecordingUrl(null);
      startRecording();
    }
    if ((phase === "done" || phase === "idle") && isRecording) {
      stopRecording();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, recordingEnabled]);

  // Hot seat mode
  useEffect(() => {
    clearTimeout(hotSeatRef.current);
    if (hotSeatMode && phase === "speaking") {
      hotSeatRef.current = setTimeout(() => {
        pickNextQuestion();
        setPhase("thinking");
        setPrepRemaining(10);
        setSpeechElapsed(0);
      }, 20000);
    }
    return () => clearTimeout(hotSeatRef.current);
  }, [hotSeatMode, phase, speechElapsed]);

  // ===== Actions =====
  const pickNextQuestion = useCallback(() => {
    const pool = ALL_QUESTIONS.filter((q) => selectedCategories.has(q.category));
    if (pool.length === 0) {
      setCurrentQuestion({ text: "Select at least one category to begin.", category: "Funny" });
      return null;
    }
    const base = pool[Math.floor(Math.random() * pool.length)];
    const q = { ...base };
    if (challengeMode) {
      const twists = [
        " (Speak only in questions.)",
        " (Use a metaphor in every sentence.)",
        " (End with a call to action.)",
        " (Tell it as a story with a hero.)",
        " (Speak as if you were 100 years old.)",
      ];
      q.text = q.text + twists[Math.floor(Math.random() * twists.length)];
    }
    setCurrentQuestion(q);
    setFlipKey((k) => k + 1);
    setEvalNotes("");
    return q;
  }, [selectedCategories, challengeMode]);

  const handleStart = () => {
    // One-tap start: draw a question if needed, then immediately begin the prep timer.
    if (!currentQuestion) pickNextQuestion();
    const prep = hotSeatMode ? 10 : prepTime;
    setPrepRemaining(prep);
    setSpeechElapsed(0);
    setIsPaused(false);
    setPhase("thinking"); // <- prep countdown begins on this tick
  };

  const handlePauseResume = () => setIsPaused((p) => !p);

  const handleReset = () => {
    if (isRecording) stopRecording();
    setPhase("idle");
    setPrepRemaining(prepTime);
    setSpeechElapsed(0);
    setIsPaused(false);
  };

  const completeSession = () => {
    if (!currentQuestion) return;
    const today = new Date().toDateString();
    const newHistory = [
      { text: currentQuestion.text, category: currentQuestion.category, date: new Date().toISOString(), duration: speechElapsed, notes: evalNotes },
      ...history,
    ].slice(0, 50);
    setHistory(newHistory);
    setTotalSessions((n) => n + 1);
    // streak
    if (lastSessionDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      setStreak(lastSessionDate === yesterday ? streak + 1 : 1);
      setLastSessionDate(today);
    }
    // confidence based on hitting time bracket
    const min = speechDuration * 0.5;
    const max = speechDuration * 1.1;
    let delta = -2;
    if (speechElapsed >= min && speechElapsed <= max) delta = 4;
    else if (speechElapsed >= min * 0.7) delta = 1;
    setConfidenceScore((s) => Math.max(0, Math.min(100, s + delta)));
    setPhase("done");
  };

  const handleNext = () => {
    if (phase === "speaking" || phase === "thinking") completeSession();
    pickNextQuestion();
    // Auto-start prep timer for the new question (same one-tap flow as Start)
    const prep = hotSeatMode ? 10 : prepTime;
    setPrepRemaining(prep);
    setSpeechElapsed(0);
    setIsPaused(false);
    setPhase("thinking");
  };

  const toggleFavorite = (q) => {
    const key = q.text;
    if (favorites.some((f) => f.text === key)) {
      setFavorites(favorites.filter((f) => f.text !== key));
    } else {
      setFavorites([{ text: q.text, category: q.category }, ...favorites]);
    }
  };

  const toggleCategory = (cat) => {
    const next = new Set(selectedCategories);
    if (next.has(cat)) next.delete(cat);
    else next.add(cat);
    if (next.size === 0) return;
    setSelectedCategories(next);
  };

  const shuffleCategories = () => {
    const shuffled = [...CATEGORIES].sort(() => Math.random() - 0.5);
    const count = Math.max(2, Math.floor(Math.random() * shuffled.length));
    setSelectedCategories(new Set(shuffled.slice(0, count)));
  };

  // ===== Derived =====
  const isFavorite = currentQuestion && favorites.some((f) => f.text === currentQuestion.text);
  const prepPct = phase === "thinking" ? ((prepTime - prepRemaining) / prepTime) * 100 : phase === "idle" ? 0 : 100;
  const speechPct = Math.min(100, (speechElapsed / speechDuration) * 100);
  const minTime = Math.floor(speechDuration * 0.5);
  const yellowTime = Math.floor(speechDuration * 0.75);
  const timerColor = speechElapsed >= speechDuration ? "red" : speechElapsed >= yellowTime ? "yellow" : speechElapsed >= minTime ? "green" : "white";

  const fmt = (s) => {
    const m = Math.floor(s / 60);
    const ss = s % 60;
    return `${m}:${ss.toString().padStart(2, "0")}`;
  };

  const statusLabel = phase === "thinking" ? "Preparing" : phase === "speaking" ? "Speaking" : phase === "done" ? "Time's Up" : "Ready";

  // ===== Render =====
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-[#0a0e1a] text-slate-900 dark:text-stone-100 transition-colors duration-500 font-serif relative overflow-x-hidden">
      {/* Decorative background */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.04] dark:opacity-[0.06]">
        <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, #9b1c1c 0%, transparent 40%), radial-gradient(circle at 80% 70%, #1e3a8a 0%, transparent 40%)" }} />
      </div>
      <div className="fixed inset-0 pointer-events-none opacity-[0.015] dark:opacity-[0.025] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

      {/* Header */}
      <header className="relative z-10 border-b border-stone-200 dark:border-stone-800 backdrop-blur-md bg-stone-50/70 dark:bg-[#0a0e1a]/70 sticky top-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-700 to-rose-900 flex items-center justify-center shadow-lg shadow-rose-900/20 shrink-0">
              <span className="text-white font-bold text-lg" style={{ fontFamily: "Georgia, serif" }}>T</span>
            </div>
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight leading-none truncate" style={{ fontFamily: "Playfair Display, Georgia, serif" }}>
                Tabletopics Trainer
              </h1>
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400 mt-1">Impromptu Practice</p>
            </div>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <button onClick={() => setShowFavoritesPanel(true)} className="p-2 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800 transition relative" title="Favorites">
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && <span className="absolute -top-0.5 -right-0.5 text-[10px] bg-rose-700 text-white rounded-full w-4 h-4 flex items-center justify-center font-bold">{favorites.length}</span>}
            </button>
            <button onClick={() => setShowHistoryPanel(true)} className="p-2 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800 transition" title="History">
              <History className="w-5 h-5" />
            </button>
            <button onClick={() => setSoundOn(!soundOn)} className="p-2 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800 transition" title="Toggle sound">
              <span className="text-base">{soundOn ? "🔔" : "🔕"}</span>
            </button>
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800 transition" title="Theme">
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Stats bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 sm:mb-8">
          <StatCard icon={<Flame className="w-4 h-4" />} label="Streak" value={`${streak} ${streak === 1 ? "day" : "days"}`} accent="text-orange-600 dark:text-orange-400" />
          <StatCard icon={<Award className="w-4 h-4" />} label="Sessions" value={totalSessions} accent="text-emerald-600 dark:text-emerald-400" />
          <StatCard icon={<Target className="w-4 h-4" />} label="Confidence" value={`${confidenceScore}%`} accent="text-rose-600 dark:text-rose-400" />
          <StatCard icon={<Heart className="w-4 h-4" />} label="Favorites" value={favorites.length} accent="text-pink-600 dark:text-pink-400" />
        </div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-6 lg:gap-8">
          {/* LEFT — main column */}
          <div className="space-y-6">
            {/* Question card with flip animation */}
            <div className="perspective-1000">
              <div
                key={flipKey}
                className="relative rounded-3xl bg-white dark:bg-stone-900 shadow-2xl shadow-stone-300/40 dark:shadow-black/60 border border-stone-200 dark:border-stone-800 overflow-hidden min-h-[320px] sm:min-h-[360px]"
                style={{ animation: "flipIn 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
              >
                {/* Top ribbon */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-700 via-rose-900 to-rose-700" />

                {/* Status badge */}
                <div className="absolute top-5 right-5 z-10 flex items-center gap-2">
                  {isRecording && (
                    <span className="text-[10px] uppercase tracking-[0.2em] px-2.5 py-1.5 rounded-full font-bold bg-rose-700 text-white flex items-center gap-1.5 shadow-lg shadow-rose-900/30">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      REC
                    </span>
                  )}
                  {phase !== "idle" && (
                    <span className={`text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full font-bold ${
                      phase === "thinking" ? "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300" :
                      phase === "speaking" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300" :
                      "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300"
                    }`}>
                      <span className={phase === "speaking" ? "inline-block w-1.5 h-1.5 rounded-full bg-emerald-600 mr-1.5 animate-pulse" : ""} />
                      {statusLabel}
                    </span>
                  )}
                </div>

                <div className="p-6 sm:p-10 pt-12 sm:pt-14">
                  {currentQuestion ? (
                    <>
                      <div className="flex items-center gap-2 mb-5">
                        <span className={`text-[10px] uppercase tracking-[0.25em] font-bold px-2.5 py-1 rounded ${CATEGORY_COLORS[currentQuestion.category].soft} ${CATEGORY_COLORS[currentQuestion.category].text} ${CATEGORY_COLORS[currentQuestion.category].dark}`}>
                          {currentQuestion.category}
                        </span>
                        {challengeMode && (
                          <span className="text-[10px] uppercase tracking-[0.2em] font-bold px-2.5 py-1 rounded bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 flex items-center gap-1">
                            <Zap className="w-3 h-3" /> Challenge
                          </span>
                        )}
                        {hotSeatMode && (
                          <span className="text-[10px] uppercase tracking-[0.2em] font-bold px-2.5 py-1 rounded bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300 flex items-center gap-1">
                            <Flame className="w-3 h-3" /> Hot Seat
                          </span>
                        )}
                      </div>
                      <p className="text-2xl sm:text-3xl lg:text-4xl leading-tight font-medium text-stone-900 dark:text-stone-100" style={{ fontFamily: "Playfair Display, Georgia, serif" }}>
                        "{currentQuestion.text}"
                      </p>
                      <div className="mt-8 flex items-center justify-between">
                        <button onClick={() => toggleFavorite(currentQuestion)} className="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-400 hover:text-rose-700 dark:hover:text-rose-400 transition group">
                          <Heart className={`w-5 h-5 transition ${isFavorite ? "fill-rose-700 text-rose-700" : "group-hover:scale-110"}`} />
                          {isFavorite ? "Saved" : "Save question"}
                        </button>
                        <div className="text-xs text-stone-400 dark:text-stone-500 italic">Speak from the heart.</div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <BookOpen className="w-12 h-12 mx-auto text-stone-300 dark:text-stone-700 mb-4" />
                      <p className="text-lg text-stone-500 dark:text-stone-400 mb-6" style={{ fontFamily: "Playfair Display, Georgia, serif" }}>Ready when you are.</p>
                      <button onClick={handleStart} className="px-6 py-3 rounded-full bg-rose-800 hover:bg-rose-900 text-white text-sm font-semibold tracking-wide shadow-lg shadow-rose-900/30 transition inline-flex items-center gap-2">
                        <Play className="w-4 h-4" /> Start
                      </button>
                      <p className="text-xs text-stone-400 dark:text-stone-500 mt-3">Question + 30s think time begins on tap.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Timer display */}
            {currentQuestion && (
              <div className="rounded-3xl bg-white dark:bg-stone-900 shadow-xl shadow-stone-300/30 dark:shadow-black/50 border border-stone-200 dark:border-stone-800 p-6 sm:p-8">
                {phase === "thinking" || phase === "idle" ? (
                  <PrepRing remaining={prepRemaining} total={prepTime} active={phase === "thinking"} />
                ) : (
                  <SpeechTimer elapsed={speechElapsed} total={speechDuration} color={timerColor} minTime={minTime} yellowTime={yellowTime} />
                )}

                {/* Controls */}
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                  {phase === "idle" || phase === "done" ? (
                    <button onClick={handleStart} className="col-span-2 sm:col-span-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm shadow-lg shadow-emerald-900/20 transition">
                      <Play className="w-4 h-4" /> Start
                    </button>
                  ) : (
                    <button onClick={handlePauseResume} className="col-span-2 sm:col-span-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm shadow-lg shadow-amber-900/20 transition">
                      {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                      {isPaused ? "Resume" : "Pause"}
                    </button>
                  )}
                  <button onClick={handleReset} className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 font-semibold text-sm transition">
                    <RotateCcw className="w-4 h-4" /> Reset
                  </button>
                  {phase === "speaking" && (
                    <button onClick={completeSession} className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm shadow-lg shadow-blue-900/20 transition">
                      <Check className="w-4 h-4" /> Done
                    </button>
                  )}
                  <button onClick={handleNext} className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-rose-800 hover:bg-rose-900 text-white font-semibold text-sm shadow-lg shadow-rose-900/20 transition col-span-2 sm:col-span-1">
                    <SkipForward className="w-4 h-4" /> Next
                  </button>
                </div>
              </div>
            )}

            {/* Evaluation notes */}
            {(phase === "speaking" || phase === "done") && currentQuestion && (
              <div className="rounded-3xl bg-white dark:bg-stone-900 shadow-lg border border-stone-200 dark:border-stone-800 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-rose-700 dark:text-rose-400" />
                  <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-stone-700 dark:text-stone-300">Self-Evaluation</h3>
                </div>
                <textarea
                  value={evalNotes}
                  onChange={(e) => setEvalNotes(e.target.value)}
                  placeholder="How did it go? What worked? What would you improve next time?"
                  className="w-full h-24 px-4 py-3 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-rose-700/40 font-sans"
                />
              </div>
            )}
          </div>

          {/* RIGHT — controls sidebar */}
          <aside className="space-y-5">
            {/* Speech duration */}
            <Panel title="Speech Duration">
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "1 min", v: 60 },
                  { label: "2 min", v: 120 },
                  { label: "Custom", v: customDuration },
                ].map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => setSpeechDuration(opt.v)}
                    className={`px-2 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition ${
                      speechDuration === opt.v
                        ? "bg-rose-800 text-white shadow-md shadow-rose-900/30"
                        : "bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              {speechDuration === customDuration && (
                <div className="mt-3">
                  <input
                    type="range"
                    min="30"
                    max="420"
                    step="15"
                    value={customDuration}
                    onChange={(e) => {
                      const v = parseInt(e.target.value);
                      setCustomDuration(v);
                      setSpeechDuration(v);
                    }}
                    className="w-full accent-rose-800"
                  />
                  <div className="text-xs text-stone-500 dark:text-stone-400 text-center mt-1 font-mono">{fmt(customDuration)}</div>
                </div>
              )}
            </Panel>

            {/* Prep time */}
            <Panel title="Think Time">
              <div className="grid grid-cols-3 gap-2">
                {[15, 30, 60].map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setPrepTime(t);
                      setPrepRemaining(t);
                    }}
                    className={`px-2 py-2.5 rounded-lg text-xs font-bold transition ${
                      prepTime === t
                        ? "bg-amber-600 text-white shadow-md shadow-amber-900/30"
                        : "bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700"
                    }`}
                  >
                    {t}s
                  </button>
                ))}
              </div>
            </Panel>

            {/* Categories */}
            <Panel title="Categories" action={
              <button onClick={shuffleCategories} className="text-xs flex items-center gap-1 text-rose-700 dark:text-rose-400 hover:underline">
                <Shuffle className="w-3 h-3" /> Shuffle
              </button>
            }>
              <div className="flex flex-wrap gap-1.5">
                {CATEGORIES.map((cat) => {
                  const active = selectedCategories.has(cat);
                  const c = CATEGORY_COLORS[cat];
                  return (
                    <button
                      key={cat}
                      onClick={() => toggleCategory(cat)}
                      className={`text-[11px] px-2.5 py-1.5 rounded-full font-bold uppercase tracking-wider transition border ${
                        active
                          ? `${c.bg} text-white border-transparent shadow-sm`
                          : "bg-transparent border-stone-300 dark:border-stone-700 text-stone-500 dark:text-stone-500 hover:border-stone-400 dark:hover:border-stone-600"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </Panel>

            {/* Modes */}
            <Panel title="Modes">
              <div className="space-y-2">
                <ModeToggle label="Challenge Mode" desc="Adds a creative twist" icon={<Zap className="w-4 h-4" />} active={challengeMode} onClick={() => setChallengeMode(!challengeMode)} />
                <ModeToggle label="Hot Seat" desc="Rapid-fire questions" icon={<Flame className="w-4 h-4" />} active={hotSeatMode} onClick={() => setHotSeatMode(!hotSeatMode)} />
              </div>
            </Panel>

            {/* Recording */}
            <Panel title="Audio Recording">
              <ModeToggle
                label="Record my speech"
                desc={isRecording ? "Recording in progress…" : "Auto-records during Speaking phase"}
                icon={isRecording ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                active={recordingEnabled}
                onClick={() => {
                  if (recordingEnabled && isRecording) stopRecording();
                  setRecordingEnabled(!recordingEnabled);
                  setRecordingError(null);
                }}
              />
              {recordingError && (
                <p className="text-[11px] text-rose-600 dark:text-rose-400 mt-2 leading-snug">{recordingError}</p>
              )}
              {recordingUrl && !isRecording && (
                <div className="mt-3 p-3 rounded-lg bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase tracking-[0.18em] font-bold text-stone-600 dark:text-stone-400">Last Take</span>
                    <a href={recordingUrl} download={`tabletopics-${Date.now()}.webm`} className="text-[11px] flex items-center gap-1 text-rose-700 dark:text-rose-400 hover:underline">
                      <Download className="w-3 h-3" /> Save
                    </a>
                  </div>
                  <audio src={recordingUrl} controls className="w-full h-8" style={{ filter: "var(--audio-filter)" }} />
                </div>
              )}
              {recordings.length > 1 && (
                <details className="mt-3">
                  <summary className="text-[10px] uppercase tracking-[0.18em] font-bold text-stone-500 dark:text-stone-400 cursor-pointer hover:text-rose-700 dark:hover:text-rose-400">Previous takes ({recordings.length - 1})</summary>
                  <ul className="mt-2 space-y-2">
                    {recordings.slice(1).map((r) => (
                      <li key={r.ts} className="p-2 rounded-lg bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800">
                        <div className="text-[10px] text-stone-500 dark:text-stone-400 mb-1 font-mono">{new Date(r.ts).toLocaleTimeString()}</div>
                        <audio src={r.url} controls className="w-full h-8" />
                      </li>
                    ))}
                  </ul>
                </details>
              )}
              <p className="text-[10px] text-stone-500 dark:text-stone-500 mt-3 leading-relaxed">
                Recordings stay in your browser only. Your mic activates the moment Speaking begins.
              </p>
            </Panel>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-stone-200 dark:border-stone-800 mt-8 py-6 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-stone-500 dark:text-stone-400 font-medium">
            All Rights Reserved
          </p>
          <span className="hidden sm:inline text-stone-300 dark:text-stone-700">·</span>
          <p className="text-xs text-stone-500 dark:text-stone-400" style={{ fontFamily: "Playfair Display, Georgia, serif" }}>
            Created by <span className="font-semibold text-rose-700 dark:text-rose-400">JuXGTMC</span> 2026
          </p>
        </div>
      </footer>

      {/* Favorites panel */}
      {showFavoritesPanel && (
        <SlideOver title="Saved Questions" onClose={() => setShowFavoritesPanel(false)}>
          {favorites.length === 0 ? (
            <EmptyState icon={<Heart className="w-10 h-10" />} text="No saved questions yet. Tap the heart on any question to keep it." />
          ) : (
            <ul className="space-y-2">
              {favorites.map((f, i) => (
                <li key={i} className="group p-4 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-rose-300 dark:hover:border-rose-700 transition">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <span className={`text-[9px] uppercase tracking-widest font-bold ${CATEGORY_COLORS[f.category].text} dark:${CATEGORY_COLORS[f.category].dark.split(" ")[1]}`}>{f.category}</span>
                      <p className="text-sm mt-1 leading-snug" style={{ fontFamily: "Playfair Display, Georgia, serif" }}>{f.text}</p>
                    </div>
                    <div className="flex flex-col gap-1 shrink-0">
                      <button
                        onClick={() => {
                          setCurrentQuestion(f);
                          setFlipKey((k) => k + 1);
                          setShowFavoritesPanel(false);
                        }}
                        className="p-1.5 rounded-md hover:bg-rose-100 dark:hover:bg-rose-900/40 transition"
                        title="Use this question"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                      <button onClick={() => toggleFavorite(f)} className="p-1.5 rounded-md hover:bg-rose-100 dark:hover:bg-rose-900/40 transition" title="Remove">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </SlideOver>
      )}

      {/* History panel */}
      {showHistoryPanel && (
        <SlideOver title="Speaking History" onClose={() => setShowHistoryPanel(false)}>
          {history.length === 0 ? (
            <EmptyState icon={<History className="w-10 h-10" />} text="Your past sessions will appear here once you complete a speech." />
          ) : (
            <ul className="space-y-2">
              {history.map((h, i) => (
                <li key={i} className="p-4 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`text-[9px] uppercase tracking-widest font-bold ${CATEGORY_COLORS[h.category]?.text || ""}`}>{h.category}</span>
                    <div className="flex items-center gap-2 text-[10px] text-stone-500 dark:text-stone-400 font-mono">
                      <Clock className="w-3 h-3" />
                      {fmt(h.duration)} · {new Date(h.date).toLocaleDateString()}
                    </div>
                  </div>
                  <p className="text-sm leading-snug" style={{ fontFamily: "Playfair Display, Georgia, serif" }}>{h.text}</p>
                  {h.notes && (
                    <p className="text-xs italic mt-2 text-stone-600 dark:text-stone-400 border-l-2 border-rose-700 pl-2">{h.notes}</p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </SlideOver>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');
        body { font-family: 'Inter', system-ui, sans-serif; }
        .font-serif { font-family: 'Inter', system-ui, sans-serif; }
        @keyframes flipIn {
          0% { opacity: 0; transform: rotateY(-90deg) scale(0.9); }
          60% { opacity: 1; transform: rotateY(10deg) scale(1.02); }
          100% { opacity: 1; transform: rotateY(0deg) scale(1); }
        }
        @keyframes pulse-ring {
          0%, 100% { box-shadow: 0 0 0 0 rgba(190, 18, 60, 0.4); }
          50% { box-shadow: 0 0 0 12px rgba(190, 18, 60, 0); }
        }
        .perspective-1000 { perspective: 1000px; }
      `}</style>
    </div>
  );
}

// ============ COMPONENTS ============
function StatCard({ icon, label, value, accent }) {
  return (
    <div className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-3 sm:p-4 shadow-sm">
      <div className={`flex items-center gap-1.5 ${accent} mb-1`}>
        {icon}
        <span className="text-[10px] uppercase tracking-[0.18em] font-bold">{label}</span>
      </div>
      <div className="text-xl sm:text-2xl font-bold tracking-tight" style={{ fontFamily: "Playfair Display, Georgia, serif" }}>{value}</div>
    </div>
  );
}

function Panel({ title, children, action }) {
  return (
    <div className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold text-stone-700 dark:text-stone-300">{title}</h3>
        {action}
      </div>
      {children}
    </div>
  );
}

function ModeToggle({ label, desc, icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-3 rounded-xl transition text-left ${
        active
          ? "bg-rose-50 dark:bg-rose-900/20 border border-rose-300 dark:border-rose-800"
          : "bg-stone-50 dark:bg-stone-950 border border-transparent hover:border-stone-300 dark:hover:border-stone-700"
      }`}
    >
      <div className={`p-2 rounded-lg ${active ? "bg-rose-700 text-white" : "bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-400"}`}>{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-bold">{label}</div>
        <div className="text-[10px] text-stone-500 dark:text-stone-400">{desc}</div>
      </div>
      <div className={`w-9 h-5 rounded-full transition relative shrink-0 ${active ? "bg-rose-700" : "bg-stone-300 dark:bg-stone-700"}`}>
        <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${active ? "left-4" : "left-0.5"}`} />
      </div>
    </button>
  );
}

function PrepRing({ remaining, total, active }) {
  const pct = total > 0 ? (remaining / total) * 100 : 0;
  const r = 90;
  const C = 2 * Math.PI * r;
  const offset = C - (pct / 100) * C;
  return (
    <div className="flex flex-col items-center">
      <div className="text-[10px] uppercase tracking-[0.25em] font-bold text-amber-700 dark:text-amber-400 mb-3">
        {active ? "Think Time" : "Get Ready"}
      </div>
      <div className="relative w-52 h-52 sm:w-60 sm:h-60">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r={r} stroke="currentColor" className="text-stone-200 dark:text-stone-800" strokeWidth="10" fill="none" />
          <circle
            cx="100"
            cy="100"
            r={r}
            stroke="url(#amberGrad)"
            strokeWidth="10"
            fill="none"
            strokeDasharray={C}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.9s linear" }}
          />
          <defs>
            <linearGradient id="amberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-5xl sm:text-6xl font-bold tabular-nums tracking-tight" style={{ fontFamily: "Playfair Display, Georgia, serif" }}>{remaining}</div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400 mt-1">seconds</div>
        </div>
      </div>
    </div>
  );
}

function SpeechTimer({ elapsed, total, color, minTime, yellowTime }) {
  const fmt = (s) => {
    const m = Math.floor(s / 60);
    const ss = s % 60;
    return `${m}:${ss.toString().padStart(2, "0")}`;
  };
  const colorClasses = {
    white: { bar: "bg-stone-400", glow: "shadow-stone-300/40", text: "text-stone-700 dark:text-stone-300", dot: "bg-stone-400" },
    green: { bar: "bg-emerald-600", glow: "shadow-emerald-500/40", text: "text-emerald-700 dark:text-emerald-400", dot: "bg-emerald-600" },
    yellow: { bar: "bg-amber-500", glow: "shadow-amber-500/40", text: "text-amber-700 dark:text-amber-400", dot: "bg-amber-500" },
    red: { bar: "bg-rose-700", glow: "shadow-rose-700/50", text: "text-rose-700 dark:text-rose-400", dot: "bg-rose-700" },
  };
  const c = colorClasses[color];
  const pct = Math.min(100, (elapsed / total) * 100);

  return (
    <div>
      <div className="flex items-end justify-between mb-4 gap-3 flex-wrap">
        <div>
          <div className={`text-[10px] uppercase tracking-[0.25em] font-bold ${c.text} mb-1 flex items-center gap-1.5`}>
            <span className={`w-2 h-2 rounded-full ${c.dot} ${color !== "white" ? "animate-pulse" : ""}`} />
            Speaking
          </div>
          <div className={`text-6xl sm:text-7xl font-bold tabular-nums tracking-tight ${c.text}`} style={{ fontFamily: "Playfair Display, Georgia, serif" }}>
            {fmt(elapsed)}
          </div>
        </div>
        <div className="text-right text-xs text-stone-500 dark:text-stone-400 font-mono">
          Target: {fmt(total)}
        </div>
      </div>

      {/* Toastmasters indicator bar */}
      <div className="relative h-4 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden border border-stone-200 dark:border-stone-700">
        <div className={`absolute inset-y-0 left-0 ${c.bar} transition-all duration-1000 ease-linear shadow-lg ${c.glow}`} style={{ width: `${pct}%` }} />
        {/* Markers */}
        <div className="absolute top-0 bottom-0 w-px bg-emerald-600/60" style={{ left: `${(minTime / total) * 100}%` }} title="Green light" />
        <div className="absolute top-0 bottom-0 w-px bg-amber-500/60" style={{ left: `${(yellowTime / total) * 100}%` }} title="Yellow warning" />
        <div className="absolute top-0 bottom-0 w-0.5 bg-rose-700/80 right-0" title="Red light" />
      </div>
      <div className="flex justify-between mt-1.5 text-[10px] uppercase tracking-wider font-bold">
        <span className="text-stone-400">Start</span>
        <span className="text-emerald-600">Green {fmt(minTime)}</span>
        <span className="text-amber-600">Yellow {fmt(yellowTime)}</span>
        <span className="text-rose-700">Red {fmt(total)}</span>
      </div>
    </div>
  );
}

function SlideOver({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm" onClick={onClose} style={{ animation: "fadeIn 0.3s ease" }} />
      <div className="ml-auto relative w-full max-w-md h-full bg-stone-50 dark:bg-[#0a0e1a] border-l border-stone-200 dark:border-stone-800 shadow-2xl flex flex-col" style={{ animation: "slideIn 0.4s cubic-bezier(0.22, 1, 0.36, 1)" }}>
        <div className="flex items-center justify-between p-5 border-b border-stone-200 dark:border-stone-800">
          <h2 className="text-xl font-bold" style={{ fontFamily: "Playfair Display, Georgia, serif" }}>{title}</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800 transition">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">{children}</div>
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
      `}</style>
    </div>
  );
}

function EmptyState({ icon, text }) {
  return (
    <div className="text-center py-16 text-stone-400 dark:text-stone-600">
      <div className="mx-auto mb-4 flex justify-center">{icon}</div>
      <p className="text-sm max-w-xs mx-auto leading-relaxed">{text}</p>
    </div>
  );
}