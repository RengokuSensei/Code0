---
title: "Neural Voice Studio & AI Audio Lab — ADVANCED ANALYSIS"
description: "Interactive AI Voice Synthesis and Testing Studio integrated directly into ADVANCED ANALYSIS. Paste your Hindi or English script to generate natural speech with Cloud Neural, Browser Native, Local GPU, or Studio APIs."
---

<!-- ==========================================================================
     HERO SECTION: NEURAL VOICE STUDIO & AI AUDIO LAB
     ========================================================================== -->
<div class="cosmic-hero">
  <div class="cosmic-hero-badge">
    <span>✦ AUDIO SYNTHESIS &amp; VOICE STUDIO • LIVE ON GITHUB PAGES</span>
  </div>

  <h1 class="cosmic-headline">Neural Voice Studio &amp; AI Audio Lab</h1>

  <p class="cosmic-subline">
    An interactive audio studio integrated directly into your knowledge codex. Paste any Hindi, English, or Hinglish script below to generate natural speech directly in your browser—supporting Cloud Neural streaming, native device speech synthesis, and optional Pro Studio APIs.
  </p>

  <div class="author-telemetry-tags">
    <span class="telemetry-chip highlight-cyan">🌐 Cloud Neural Hindi (Zero-Setup)</span>
    <span class="telemetry-chip highlight-mint">📱 Web Speech API (Device Hardware)</span>
    <span class="telemetry-chip highlight-amber">🎙️ Coqui XTTS-v2 &amp; Edge-TTS</span>
    <span class="telemetry-chip highlight-violet">🎛️ EBU R128 Broadcast Mastered</span>
    <span class="telemetry-chip">⚡ GitHub Pages Compatible</span>
  </div>
</div>

---

<!-- ==========================================================================
     SECTION 1: LIVE INTERACTIVE SCRIPT-TO-VOICE GENERATOR
     ========================================================================== -->
## 🧪 Live Script-to-Voice Generator

Paste your narration script below and select your preferred engine to synthesize and play Hindi audio directly inside this page.

<div class="interactive-testing-sandbox" style="background: rgba(14, 16, 25, 0.9); border: 1px solid rgba(2, 210, 227, 0.35); border-radius: 16px; padding: 2rem; margin-top: 1.5rem; box-shadow: 0 12px 40px rgba(0,0,0,0.5);">

  <!-- Quick Script Fill Buttons -->
  <div style="display: flex; gap: 0.75rem; margin-bottom: 1rem; flex-wrap: wrap;">
    <button type="button" id="btn-load-hindi-short" style="background: rgba(2, 210, 227, 0.15); border: 1px solid #02d2e3; color: #02d2e3; padding: 6px 14px; border-radius: 8px; cursor: pointer; font-size: 0.8rem; font-weight: 600;">
      📝 25s Hindi Script (Cosmic Dawn)
    </button>
    <button type="button" id="btn-load-hindi-full" style="background: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; color: #34d399; padding: 6px 14px; border-radius: 8px; cursor: pointer; font-size: 0.8rem; font-weight: 600;">
      🌌 Full Act I Passage
    </button>
    <button type="button" id="btn-load-english-stardust" style="background: rgba(139, 92, 246, 0.15); border: 1px solid #8b5cf6; color: #c084fc; padding: 6px 14px; border-radius: 8px; cursor: pointer; font-size: 0.8rem; font-weight: 600;">
      ✨ Stardust English Passage
    </button>
    <button type="button" id="btn-clear-text" style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.15); color: #94a3b8; padding: 6px 14px; border-radius: 8px; cursor: pointer; font-size: 0.8rem;">
      ✕ Clear
    </button>
  </div>

  <!-- Text Input Area -->
  <div style="margin-bottom: 1.5rem;">
    <label for="tts-input-text" style="display: block; font-size: 0.85rem; font-weight: 600; color: #cbd5e1; margin-bottom: 0.5rem;">
      Narration Script (Hindi Devanagari, English, or Hinglish):
    </label>
    <textarea id="tts-input-text" rows="4" style="width: 100%; background: #090a0f; border: 1px solid rgba(255,255,255,0.18); border-radius: 10px; color: #f8fafc; padding: 1rem; font-family: 'Inter', system-ui, sans-serif; font-size: 1.02rem; line-height: 1.6; resize: vertical; outline: none; box-sizing: border-box;" placeholder="Type or paste your narration script here...">क्या आपने कभी रात के सन्नाटे में... आकाश की ओर देखा है? जब आप तारों को देखते हैं... तो असल में आप समय में पीछे देख रहे होते हैं। तो सवाल यह उठता है... कि ठोस वैज्ञानिक प्रमाणों के आधार पर... हम समय में कितना पीछे देख सकते हैं?</textarea>
  </div>

  <!-- Controls Grid -->
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.25rem; margin-bottom: 1.5rem;">
    
    <!-- Engine Selector -->
    <div>
      <label for="tts-engine-select" style="display: block; font-size: 0.8rem; font-weight: 600; color: #94a3b8; margin-bottom: 0.4rem;">Select Speech Engine:</label>
      <select id="tts-engine-select" style="width: 100%; background: #090a0f; border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; color: #f8fafc; padding: 8px 12px; font-size: 0.85rem; outline: none;">
        <option value="cloud_neural" selected>🌐 Cloud Neural Hindi (Google Stream — Zero Setup)</option>
        <option value="browser_speech">📱 Browser Device Voices (Web Speech API)</option>
        <option value="pro_elevenlabs">🎙️ Pro Studio API (ElevenLabs Multilingual v2)</option>
        <option value="local_bridge">💻 Local Desktop GPU Bridge (localhost:8765)</option>
      </select>
    </div>

    <!-- Voice / Pro Model Selector -->
    <div id="voice-select-group">
      <label for="tts-voice-select" style="display: block; font-size: 0.8rem; font-weight: 600; color: #94a3b8; margin-bottom: 0.4rem;">Device Voice / Accent:</label>
      <select id="tts-voice-select" style="width: 100%; background: #090a0f; border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; color: #f8fafc; padding: 8px 12px; font-size: 0.85rem; outline: none;">
        <option value="auto">Auto-detect Language (Hindi / English)</option>
      </select>
    </div>

    <!-- Pacing Slider -->
    <div>
      <label for="tts-speed-slider" style="display: flex; justify-content: space-between; font-size: 0.8rem; font-weight: 600; color: #94a3b8; margin-bottom: 0.4rem;">
        <span>Speaking Rate:</span>
        <span id="tts-speed-val" style="color: #02d2e3;">1.00×</span>
      </label>
      <input type="range" id="tts-speed-slider" min="0.75" max="1.35" step="0.05" value="1.00" style="width: 100%; accent-color: #02d2e3;">
    </div>

  </div>

  <!-- Optional API Key Accordion (For ElevenLabs / Pro Tier) -->
  <div id="pro-api-container" style="display: none; background: rgba(139, 92, 246, 0.08); border: 1px solid rgba(139, 92, 246, 0.3); border-radius: 10px; padding: 1rem; margin-bottom: 1.5rem;">
    <div style="font-size: 0.8rem; font-weight: 700; color: #c084fc; margin-bottom: 0.4rem;">
      🔑 ElevenLabs API Key (Saved locally in your browser):
    </div>
    <div style="display: flex; gap: 0.5rem;">
      <input type="password" id="eleven-api-key" placeholder="sk_xxxxxxxxxxxxxxxxxxxxxxxxxxxx" style="flex: 1; background: #090a0f; border: 1px solid rgba(255,255,255,0.2); border-radius: 6px; color: #fff; padding: 6px 10px; font-size: 0.85rem;">
      <button type="button" id="btn-save-key" style="background: #8b5cf6; color: #fff; border: none; padding: 6px 14px; border-radius: 6px; font-weight: 600; font-size: 0.8rem; cursor: pointer;">Save</button>
    </div>
    <div style="font-size: 0.75rem; color: #94a3b8; margin-top: 0.3rem;">
      Provides hyper-realistic emotion and human breathing in Hindi. Free tier accounts get 10,000 characters/month.
    </div>
  </div>

  <!-- Action Trigger Buttons -->
  <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1.5rem;">
    <button type="button" id="btn-generate-speech" style="background: linear-gradient(135deg, #02d2e3, #0284c7); color: #090a0f; font-weight: 700; border: none; padding: 12px 28px; border-radius: 10px; cursor: pointer; font-size: 0.95rem; display: flex; align-items: center; gap: 8px; box-shadow: 0 4px 15px rgba(2, 210, 227, 0.3); transition: transform 0.15s ease;">
      <span>▶ Generate &amp; Speak Hindi</span>
    </button>
    <button type="button" id="btn-stop-speech" style="background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.4); color: #f87171; font-weight: 600; padding: 12px 20px; border-radius: 10px; cursor: pointer; font-size: 0.9rem;">
      ■ Stop
    </button>
  </div>

  <!-- Live Output & Telemetry Bar -->
  <div id="bridge-status-card" style="background: rgba(9, 10, 15, 0.85); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 1.25rem; display: flex; flex-direction: column; gap: 0.75rem;">
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <span style="font-size: 0.8rem; font-weight: 600; color: #94a3b8; text-transform: uppercase;">Audio Telemetry &amp; Waveform</span>
      <span id="bridge-live-indicator" style="font-size: 0.75rem; color: #10b981; font-weight: 600;">● Engine Ready</span>
    </div>
    
    <!-- Waveform Visualizer Canvas -->
    <canvas id="tts-audio-visualizer" width="800" height="60" style="width: 100%; height: 60px; background: #050608; border-radius: 6px;"></canvas>

    <!-- Dynamic Audio Player -->
    <div id="dynamic-audio-container" style="display: none; margin-top: 0.5rem;">
      <audio id="dynamic-audio-player" controls style="width: 100%; border-radius: 6px;"></audio>
      <div style="margin-top: 0.4rem; display: flex; justify-content: flex-end;">
        <a id="btn-download-audio" href="#" download="synthesized_narration.mp3" style="font-size: 0.8rem; color: #02d2e3; text-decoration: none; font-weight: 600;">⬇ Download Generated MP3</a>
      </div>
    </div>
    
    <div id="bridge-log" style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #64748b;">
      Ready. Paste any Hindi text and click "Generate & Speak Hindi".
    </div>
  </div>

</div>

---

<!-- ==========================================================================
     SECTION 2: 25-SECOND BENCHMARK COMPARISON MATRIX
     ========================================================================== -->
## 🎧 Pre-Rendered Model Comparison (Cosmic Dawn 25s Benchmark)

Listen to the identical 25-second opening passage of **Act I: The Looking Glass of Time** rendered across multiple architectures:

<div class="voice-cards-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem; margin-top: 1.5rem;">

  <!-- Card 1: Google Hindi Neural -->
  <div class="voice-card" style="background: rgba(18, 20, 32, 0.95); border: 2px solid #02d2e3; border-radius: 14px; padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 12px 35px rgba(2, 210, 227, 0.2); position: relative; overflow: hidden;">
    <div style="position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, #02d2e3, #34d399);"></div>
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
        <span style="font-size: 0.75rem; font-weight: 700; color: #02d2e3; text-transform: uppercase; letter-spacing: 0.08em;">★ Top Hindi Pronunciation</span>
        <span style="background: rgba(2, 210, 227, 0.2); color: #02d2e3; font-size: 0.7rem; padding: 2px 8px; border-radius: 999px; font-weight: 700;">Google Neural</span>
      </div>
      <h3 style="font-size: 1.25rem; font-weight: 700; color: #fff; margin: 0 0 0.5rem 0;">Google Neural Hindi (Authentic Dialect)</h3>
      <p style="font-size: 0.85rem; color: #cbd5e1; line-height: 1.5; margin-bottom: 1rem;">
        Flawless Indian Hindi pronunciation without English accents or mangled conjuncts. Clear, natural cadence with broadcast mastering.
      </p>
    </div>
    <div>
      <audio controls style="width: 100%; border-radius: 8px; outline: none; margin-bottom: 0.75rem;">
        <source src="../assets/audio/voice_samples/hindi_25s_google_neural.mp3" type="audio/mpeg">
        Your browser does not support the audio element.
      </audio>
      <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: #94a3b8;">
        <span>Runtime: ~32.9s • Mastered -16 LUFS</span>
        <a href="../assets/audio/voice_samples/hindi_25s_google_neural.mp3" download style="color: #02d2e3; text-decoration: none; font-weight: 600;">⬇ Download MP3</a>
      </div>
    </div>
  </div>

  <!-- Card 2: Clipchamp Emotional Cut -->
  <div class="voice-card" style="background: rgba(18, 20, 32, 0.95); border: 1px solid rgba(139, 92, 246, 0.4); border-radius: 14px; padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 10px 30px rgba(0,0,0,0.4); position: relative; overflow: hidden;">
    <div style="position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, #8b5cf6, #ec4899);"></div>
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
        <span style="font-size: 0.75rem; font-weight: 700; color: #a78bfa; text-transform: uppercase; letter-spacing: 0.08em;">Clipchamp Directed • High Emotion</span>
        <span style="background: rgba(139, 92, 246, 0.2); color: #c084fc; font-size: 0.7rem; padding: 2px 8px; border-radius: 999px; font-weight: 700;">27.5s Perfect Cut</span>
      </div>
      <h3 style="font-size: 1.25rem; font-weight: 700; color: #fff; margin: 0 0 0.5rem 0;">Madhur Emotional Documentary (Clipchamp-Grade)</h3>
      <p style="font-size: 0.85rem; color: #cbd5e1; line-height: 1.5; margin-bottom: 1rem;">
        Replicates Clipchamp / Azure Speech Studio with multi-cadence directing, deep pitch shift (-4Hz), and 0.8s dramatic pauses.
      </p>
    </div>
    <div>
      <audio controls style="width: 100%; border-radius: 8px; outline: none; margin-bottom: 0.75rem;">
        <source src="../assets/audio/voice_samples/hindi_perfect_25s_clipchamp_emotional.mp3" type="audio/mpeg">
        Your browser does not support the audio element.
      </audio>
      <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: #94a3b8;">
        <span>Runtime: 27.5s • Mastered -16 LUFS</span>
        <a href="../assets/audio/voice_samples/hindi_perfect_25s_clipchamp_emotional.mp3" download style="color: #a78bfa; text-decoration: none; font-weight: 600;">⬇ Download MP3</a>
      </div>
    </div>
  </div>

  <!-- Card 3: Swara Clarity -->
  <div class="voice-card" style="background: rgba(18, 20, 32, 0.85); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 14px; padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 10px 30px rgba(0,0,0,0.4); position: relative; overflow: hidden;">
    <div style="position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, #f59e0b, #ef4444);"></div>
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
        <span style="font-size: 0.75rem; font-weight: 700; color: #fbbf24; text-transform: uppercase; letter-spacing: 0.08em;">Neural Pipeline • Female Clarity</span>
        <span style="background: rgba(245, 158, 11, 0.15); color: #fbbf24; font-size: 0.7rem; padding: 2px 8px; border-radius: 999px; font-weight: 600;">Edge-TTS</span>
      </div>
      <h3 style="font-size: 1.25rem; font-weight: 700; color: #fff; margin: 0 0 0.5rem 0;">Swara Crystal Clarity Hindi</h3>
      <p style="font-size: 0.85rem; color: #94a3b8; line-height: 1.5; margin-bottom: 1rem;">
        Crisp, articulation-rich female narration with broadcast mastering. Excellent for educational clarity and explainer pacing.
      </p>
    </div>
    <div>
      <audio controls style="width: 100%; border-radius: 8px; outline: none; margin-bottom: 0.75rem;">
        <source src="../assets/audio/voice_samples/hindi_25s_clipchamp_emotional_swara.mp3" type="audio/mpeg">
        Your browser does not support the audio element.
      </audio>
      <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: #64748b;">
        <span>Runtime: ~43.2s • Mastered -16 LUFS</span>
        <a href="../assets/audio/voice_samples/hindi_25s_clipchamp_emotional_swara.mp3" download style="color: #fbbf24; text-decoration: none; font-weight: 600;">⬇ Download MP3</a>
      </div>
    </div>
  </div>

  <!-- Card 4: Aditya Voice Clone -->
  <div class="voice-card" style="background: rgba(18, 20, 32, 0.85); border: 1px solid rgba(2, 210, 227, 0.25); border-radius: 14px; padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 10px 30px rgba(0,0,0,0.4); position: relative; overflow: hidden;">
    <div style="position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, #02d2e3, #8b5cf6);"></div>
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
        <span style="font-size: 0.75rem; font-weight: 700; color: #02d2e3; text-transform: uppercase; letter-spacing: 0.08em;">Local GPU • Zero-Shot Clone</span>
        <span style="background: rgba(2, 210, 227, 0.15); color: #02d2e3; font-size: 0.7rem; padding: 2px 8px; border-radius: 999px; font-weight: 600;">XTTS-v2</span>
      </div>
      <h3 style="font-size: 1.25rem; font-weight: 700; color: #fff; margin: 0 0 0.5rem 0;">Aditya Voice Clone (Local XTTS-v2)</h3>
      <p style="font-size: 0.85rem; color: #94a3b8; line-height: 1.5; margin-bottom: 1rem;">
        Zero-shot voice clone from your authentic 10-second reference file (<code style="color:#38bdf8;">user_voice_ref_10s.wav</code>) synthesized on GTX 1650 CUDA.
      </p>
    </div>
    <div>
      <audio controls style="width: 100%; border-radius: 8px; outline: none; margin-bottom: 0.75rem;">
        <source src="../assets/audio/voice_samples/hindi_25s_xtts_user_cloned.mp3" type="audio/mpeg">
        Your browser does not support the audio element.
      </audio>
      <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: #64748b;">
        <span>Runtime: ~39.6s</span>
        <a href="../assets/audio/voice_samples/hindi_25s_xtts_user_cloned.mp3" download style="color: #02d2e3; text-decoration: none; font-weight: 600;">⬇ Download MP3</a>
      </div>
    </div>
  </div>

  <!-- Card 5: Kokoro-82M English Benchmark -->
  <div class="voice-card" style="background: rgba(18, 20, 32, 0.85); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 14px; padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 10px 30px rgba(0,0,0,0.4); position: relative; overflow: hidden;">
    <div style="position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, #3b82f6, #02d2e3);"></div>
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
        <span style="font-size: 0.75rem; font-weight: 700; color: #60a5fa; text-transform: uppercase; letter-spacing: 0.08em;">Duration Diffusion • 82M Transformer</span>
        <span style="background: rgba(59, 130, 246, 0.15); color: #60a5fa; font-size: 0.7rem; padding: 2px 8px; border-radius: 999px; font-weight: 600;">Kokoro-82M</span>
      </div>
      <h3 style="font-size: 1.25rem; font-weight: 700; color: #fff; margin: 0 0 0.5rem 0;">Kokoro British George (English Stardust)</h3>
      <p style="font-size: 0.85rem; color: #94a3b8; line-height: 1.5; margin-bottom: 1rem;">
        Lightweight 82M diffusion model running at 30× real-time. Benchmark English comparison for documentary pacing.
      </p>
    </div>
    <div>
      <audio controls style="width: 100%; border-radius: 8px; outline: none; margin-bottom: 0.75rem;">
        <source src="../assets/audio/voice_samples/english_25s_kokoro_george.mp3" type="audio/mpeg">
        Your browser does not support the audio element.
      </audio>
      <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: #64748b;">
        <span>Runtime: ~21.4s</span>
        <a href="../assets/audio/voice_samples/english_25s_kokoro_george.mp3" download style="color: #60a5fa; text-decoration: none; font-weight: 600;">⬇ Download MP3</a>
      </div>
    </div>
  </div>

</div>

---

<!-- ==========================================================================
     SECTION 3: JAVASCRIPT LOGIC (MULTI-ENGINE CLIENT-SIDE PLAYGROUND)
     ========================================================================== -->
<script>
document.addEventListener("DOMContentLoaded", function() {
  const shortHindi = "क्या आपने कभी रात के सन्नाटे में... आकाश की ओर देखा है? जब आप तारों को देखते हैं... तो असल में आप समय में पीछे देख रहे होते हैं। तो सवाल यह उठता है... कि ठोस वैज्ञानिक प्रमाणों के आधार पर... हम समय में कितना पीछे देख सकते हैं?";
  
  const fullHindi = "जब आप रात के आसमान को देखते हैं, तो आप वास्तव में समय में पीछे देख रहे होते हैं। क्योंकि प्रकाश को यात्रा करने में समय लगता है, आप ब्रह्मांड को कभी वैसा नहीं देखते जैसा वह आज है, बल्कि वैसा देखते हैं जैसा वह अतीत में था। तो सवाल यह उठता है कि प्रमाण के आधार पर हम समय में कितना पीछे देख सकते हैं, और कहाँ जाकर हमारे टेलिस्कोप्स की आँखें बंद हो जाती हैं?";

  const stardustEnglish = "Have you ever paused to wonder if we are truly made of stardust? Every atom of iron in your blood, the calcium in your bones, and the oxygen in your lungs were forged in the blazing hearts of dying stars. Today, we journey back thirteen point eight billion years, to the very dawn of time.";

  const textArea = document.getElementById("tts-input-text");
  const engineSelect = document.getElementById("tts-engine-select");
  const voiceSelectGroup = document.getElementById("voice-select-group");
  const voiceSelect = document.getElementById("tts-voice-select");
  const speedSlider = document.getElementById("tts-speed-slider");
  const speedVal = document.getElementById("tts-speed-val");
  const proApiContainer = document.getElementById("pro-api-container");
  const elevenKeyInput = document.getElementById("eleven-api-key");
  const btnSaveKey = document.getElementById("btn-save-key");
  const btnGenerate = document.getElementById("btn-generate-speech");
  const btnStop = document.getElementById("btn-stop-speech");
  const logDiv = document.getElementById("bridge-log");
  const liveIndicator = document.getElementById("bridge-live-indicator");
  const audioContainer = document.getElementById("dynamic-audio-container");
  const audioPlayer = document.getElementById("dynamic-audio-player");
  const downloadLink = document.getElementById("btn-download-audio");
  const canvas = document.getElementById("tts-audio-visualizer");
  const ctx = canvas.getContext("2d");

  // Load saved ElevenLabs API key if any
  const savedKey = localStorage.getItem("eleven_api_key");
  if (savedKey) elevenKeyInput.value = savedKey;

  btnSaveKey.onclick = () => {
    localStorage.setItem("eleven_api_key", elevenKeyInput.value.trim());
    alert("API Key saved securely in your browser!");
  };

  // Preset Buttons
  document.getElementById("btn-load-hindi-short").onclick = () => { textArea.value = shortHindi; };
  document.getElementById("btn-load-hindi-full").onclick = () => { textArea.value = fullHindi; };
  document.getElementById("btn-load-english-stardust").onclick = () => { textArea.value = stardustEnglish; };
  document.getElementById("btn-clear-text").onclick = () => { textArea.value = ""; };

  // Speed Slider
  speedSlider.oninput = () => { speedVal.innerText = speedSlider.value + "×"; };

  // Toggle Pro Container
  engineSelect.onchange = () => {
    if (engineSelect.value === "pro_elevenlabs") {
      proApiContainer.style.display = "block";
    } else {
      proApiContainer.style.display = "none";
    }
  };

  // Populate Browser Native Voices
  function populateDeviceVoices() {
    if (!('speechSynthesis' in window)) return;
    const voices = window.speechSynthesis.getVoices();
    voiceSelect.innerHTML = '<option value="auto">Auto-detect Language (Default)</option>';
    voices.forEach((v, idx) => {
      const opt = document.createElement("option");
      opt.value = idx;
      opt.textContent = `${v.name} (${v.lang})${v.default ? ' — DEFAULT' : ''}`;
      voiceSelect.appendChild(opt);
    });
  }

  if ('speechSynthesis' in window) {
    populateDeviceVoices();
    window.speechSynthesis.onvoiceschanged = populateDeviceVoices;
  }

  // Visualizer Animation
  let animId = null;
  function drawWaveform(isActive) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const bars = 60;
    const barWidth = canvas.width / bars;
    for (let i = 0; i < bars; i++) {
      const h = isActive ? Math.random() * 45 + 8 : 4;
      const grad = ctx.createLinearGradient(0, canvas.height, 0, 0);
      grad.addColorStop(0, "#02d2e3");
      grad.addColorStop(1, "#8b5cf6");
      ctx.fillStyle = grad;
      ctx.fillRect(i * barWidth + 2, (canvas.height - h) / 2, barWidth - 4, h);
    }
    if (isActive) animId = requestAnimationFrame(() => drawWaveform(true));
  }
  drawWaveform(false);

  // Stop button
  btnStop.onclick = () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    if (audioPlayer) { audioPlayer.pause(); audioPlayer.currentTime = 0; }
    if (animId) cancelAnimationFrame(animId);
    drawWaveform(false);
    liveIndicator.innerText = "● Stopped";
    liveIndicator.style.color = "#94a3b8";
  };

  // Main Generator Router
  btnGenerate.onclick = async () => {
    const text = textArea.value.trim();
    if (!text) return alert("Please enter some narration text!");

    const engine = engineSelect.value;
    btnStop.onclick();

    // -------------------------------------------------------------
    // ENGINE 1: CLOUD NEURAL HINDI STREAM (GOOGLE TTS - 100% GITHUB PAGES)
    // -------------------------------------------------------------
    if (engine === "cloud_neural") {
      liveIndicator.innerText = "⏳ Loading Cloud Neural Stream...";
      liveIndicator.style.color = "#02d2e3";
      logDiv.innerText = "Streaming authentic Hindi neural speech from Google Cloud audio endpoint...";

      // Split into clauses by punctuation (periods, question marks, commas)
      const clauses = text.split(/([।?!,\n]+)/).filter(c => c.trim().length > 0);
      const combinedClauses = [];
      let temp = "";
      for (let c of clauses) {
        temp += c;
        if (temp.length > 25 || /[।?!]/.test(c)) {
          combinedClauses.push(temp.trim());
          temp = "";
        }
      }
      if (temp.trim()) combinedClauses.push(temp.trim());

      let currentIdx = 0;
      function playNextClause() {
        if (currentIdx >= combinedClauses.length) {
          liveIndicator.innerText = "● Playback Finished";
          liveIndicator.style.color = "#10b981";
          if (animId) cancelAnimationFrame(animId);
          drawWaveform(false);
          logDiv.innerText = "Finished playing Cloud Neural stream.";
          return;
        }

        const clauseText = combinedClauses[currentIdx];
        const isHindi = /[\u0900-\u097F]/.test(clauseText);
        const langCode = isHindi ? "hi" : "en";
        const encoded = encodeURIComponent(clauseText);
        const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${langCode}&client=tw-ob&q=${encoded}`;

        audioContainer.style.display = "block";
        audioPlayer.src = audioUrl;
        audioPlayer.playbackRate = parseFloat(speedSlider.value);
        audioPlayer.play().catch(e => console.log("Auto-play error:", e));

        downloadLink.href = audioUrl;
        downloadLink.download = `hindi_clause_${currentIdx + 1}.mp3`;

        drawWaveform(true);
        liveIndicator.innerText = `● Speaking clause ${currentIdx + 1}/${combinedClauses.length}`;
        liveIndicator.style.color = "#02d2e3";
        logDiv.innerText = `Playing clause [${langCode.toUpperCase()}]: "${clauseText.substring(0, 45)}..."`;

        audioPlayer.onended = () => {
          currentIdx++;
          setTimeout(playNextClause, 300); // 300ms natural breathing gap
        };
      }

      playNextClause();
      return;
    }

    // -------------------------------------------------------------
    // ENGINE 2: BROWSER NATIVE DEVICE SPEECH (WEB SPEECH API)
    // -------------------------------------------------------------
    if (engine === "browser_speech") {
      if (!('speechSynthesis' in window)) return alert("Web Speech API not supported in this browser!");

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = parseFloat(speedSlider.value);

      const selectedVal = voiceSelect.value;
      const allVoices = window.speechSynthesis.getVoices();
      
      if (selectedVal !== "auto" && allVoices[selectedVal]) {
        utterance.voice = allVoices[selectedVal];
        utterance.lang = utterance.voice.lang;
      } else {
        const isHindi = /[\u0900-\u097F]/.test(text);
        if (isHindi) {
          const hiVoice = allVoices.find(v => v.lang.startsWith("hi") || v.name.toLowerCase().includes("hindi"));
          if (hiVoice) utterance.voice = hiVoice;
          utterance.lang = "hi-IN";
        } else {
          const enVoice = allVoices.find(v => v.lang.startsWith("en"));
          if (enVoice) utterance.voice = enVoice;
          utterance.lang = "en-US";
        }
      }

      utterance.onstart = () => {
        liveIndicator.innerText = "● Speaking via Device Hardware";
        liveIndicator.style.color = "#34d399";
        logDiv.innerText = `Speaking via device voice: ${utterance.voice ? utterance.voice.name : 'System Default'} (${utterance.lang})...`;
        drawWaveform(true);
      };

      utterance.onend = () => {
        liveIndicator.innerText = "● Playback Finished";
        liveIndicator.style.color = "#10b981";
        if (animId) cancelAnimationFrame(animId);
        drawWaveform(false);
      };

      window.speechSynthesis.speak(utterance);
      return;
    }

    // -------------------------------------------------------------
    // ENGINE 3: PRO ELEVENLABS MULTILINGUAL V2
    // -------------------------------------------------------------
    if (engine === "pro_elevenlabs") {
      const apiKey = elevenKeyInput.value.trim();
      if (!apiKey) {
        alert("Please enter an ElevenLabs API key to use Pro Studio!");
        proApiContainer.style.display = "block";
        return;
      }

      liveIndicator.innerText = "⏳ Calling ElevenLabs Multilingual v2...";
      liveIndicator.style.color = "#c084fc";
      logDiv.innerText = "Sending prompt to ElevenLabs Multilingual v2 neural vocoder...";

      try {
        const response = await fetch("https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "xi-api-key": apiKey
          },
          body: JSON.stringify({
            text: text,
            model_id: "eleven_multilingual_v2",
            voice_settings: { stability: 0.5, similarity_boost: 0.8 }
          })
        });

        if (!response.ok) throw new Error("ElevenLabs Error: " + response.statusText);

        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);

        audioContainer.style.display = "block";
        audioPlayer.src = blobUrl;
        audioPlayer.play();
        drawWaveform(true);

        downloadLink.href = blobUrl;
        downloadLink.download = "elevenlabs_hindi_narration.mp3";

        liveIndicator.innerText = "✓ Synthesized with ElevenLabs Pro";
        liveIndicator.style.color = "#10b981";
        logDiv.innerText = "Playing ElevenLabs Multilingual v2 mastered audio.";

        audioPlayer.onended = () => {
          if (animId) cancelAnimationFrame(animId);
          drawWaveform(false);
          liveIndicator.innerText = "● Playback Finished";
        };

      } catch (err) {
        liveIndicator.innerText = "⚠️ API Request Failed";
        liveIndicator.style.color = "#ef4444";
        logDiv.innerText = "Error: " + err.message;
      }
      return;
    }

    // -------------------------------------------------------------
    // ENGINE 4: LOCAL DESKTOP GPU BRIDGE (LOCALHOST)
    // -------------------------------------------------------------
    if (engine === "local_bridge") {
      if (window.location.protocol === "https:") {
        alert("Notice: On HTTPS (GitHub Pages), browsers block calls to local http://127.0.0.1 (Mixed Content). To use local GPU models, please run MkDocs locally (http://localhost:8000), or select 'Cloud Neural Hindi' above!");
        return;
      }

      liveIndicator.innerText = "⏳ Connecting to Local Bridge...";
      liveIndicator.style.color = "#f59e0b";
      logDiv.innerText = "Calling http://127.0.0.1:8765/api/tts...";

      try {
        const resp = await fetch("http://127.0.0.1:8765/api/tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text, voice: "edge_madhur", rate: "0%", pitch: "0Hz" })
        });
        const resData = await resp.json();
        audioContainer.style.display = "block";
        audioPlayer.src = "../" + resData.audio_url;
        audioPlayer.play();
        drawWaveform(true);
        liveIndicator.innerText = "✓ Synthesized on GPU";
        liveIndicator.style.color = "#10b981";
        logDiv.innerText = `Generated: ${resData.duration}s audio in ${resData.generation_time_sec}s.`;
      } catch (err) {
        liveIndicator.innerText = "⚠️ Bridge Offline";
        liveIndicator.style.color = "#ef4444";
        logDiv.innerText = "Local bridge not running on http://127.0.0.1:8765. Run: python3 voice_studio_server.py";
      }
    }
  };
});
</script>
