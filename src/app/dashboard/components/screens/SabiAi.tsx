"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useDashboard } from "../DashboardContext";
import {
  BackChevron,
  MicIcon,
  SearchIcon,
  SendIcon,
  SpeakButtonSVG,
  ThreadMark,
} from "./shared";
import { FREE_AI_DAILY, chatHistoryData as seedHistory } from "../../data";
import type { SubjectData } from "./DiscoverScreen";

type View = "launcher" | "answer" | "history" | "voice";

type Message =
  | { role: "user"; text: string }
  | { role: "ai"; html: string };

const VOICE_SAMPLES = [
  "Why does this reaction need a catalyst?",
  "Explain photosynthesis simply",
  "What's the difference between mitosis and meiosis?",
  "Can you check my working for this equation?",
];

function buildSearchIndex(subjects: Record<string, SubjectData>) {
  const idx: { subject: string; name: string; topic: string }[] = [];
  Object.keys(subjects).forEach((id) => {
    const s = subjects[id];
    s.topics.forEach((t) => idx.push({ subject: id, name: s.name, topic: t.t }));
  });
  return idx;
}

const SpeakButton = ({
  onSpeak,
  speaking,
}: {
  onSpeak: (e: React.MouseEvent) => void;
  speaking: boolean;
}) => (
  <button
    className={`speak-btn${speaking ? " speaking" : ""}`}
    onClick={onSpeak}
  >
    <SpeakButtonSVG />
    <span className="speak-label">{speaking ? "Playing…" : "Listen"}</span>
  </button>
);

export default function SabiAi() {
  const { subjects, goTab } = useDashboard();
  const [view, setView] = useState<View>("launcher");
  const [askContext, setAskContext] = useState("all");
  const [msgs, setMsgs] = useState<Message[]>([]);
  const [launcherInput, setLauncherInput] = useState("");
  const [askInput, setAskInput] = useState("");
  const [voiceModeOn, setVoiceModeOn] = useState(false);
  const [history, setHistory] = useState(seedHistory);
  const [historySearch, setHistorySearch] = useState("");
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [isPlus, setIsPlus] = useState(false);
  const [usesLeft, setUsesLeft] = useState(FREE_AI_DAILY);
  const [materializing, setMaterializing] = useState(false);
  const [speakingKey, setSpeakingKey] = useState<string | null>(null);
  const [shareId, setShareId] = useState<string | null>(null);

  // voice learn
  const [vlListening, setVlListening] = useState(false);
  const [vlStatus, setVlStatus] = useState("Tap to speak");
  const [vlTranscript, setVlTranscript] = useState("");
  const [vlAnswer, setVlAnswer] = useState<{ html: string } | null>(null);
  const vlIdx = useRef(0);

  const searchIndex = useMemo(() => buildSearchIndex(subjects), [subjects]);
  const chatScroll = useRef<HTMLDivElement>(null);
  const speakTimers = useRef<Record<string, number>>({});

  const chatVisible = view === "answer" && msgs.length === 0;

  useEffect(() => {
    if (chatScroll.current)
      chatScroll.current.scrollTop = chatScroll.current.scrollHeight;
  }, [msgs, view, materializing]);

  const openUpgrade = () => setShowUpgrade(true);
  const closeUpgrade = () => setShowUpgrade(false);
  const activatePlus = () => {
    setIsPlus(true);
    setUsesLeft(FREE_AI_DAILY);
    setShowUpgrade(false);
  };

  const consumeAiUse = () => {
    if (isPlus) return true;
    if (usesLeft <= 0) return false;
    const next = usesLeft - 1;
    setUsesLeft(next);
    return true;
  };

  const usageLabel = (() => {
    if (isPlus)
      return {
        cls: "",
        label: "✨ AbSTopiq Plus — unlimited Sabi AI",
        link: "Manage",
      };
    return {
      cls: usesLeft <= 1 ? " low" : "",
      label: `${usesLeft} free Sabi AI question${usesLeft === 1 ? "" : "s"} left today`,
      link: "Upgrade",
    };
  })();

  const resolveGrounded = (text: string) => {
    if (askContext !== "all") {
      const sub = subjects[askContext];
      if (sub) return { sub, topic: sub.topics[0].t };
    }
    const hit = searchIndex.find(
      (r) =>
        text &&
        r.topic
          .toLowerCase()
          .split(" ")
          .some((w) => w.length > 3 && text.toLowerCase().includes(w)),
    );
    if (hit) return { sub: subjects[hit.subject], topic: hit.topic };
    return null;
  };

  const groundedHTML = (sub: SubjectData, topic: string) =>
    `Here's the grounded explanation for that, tied to your ${sub.name} syllabus rather than a generic web answer.
     <div class="grounding"><svg class="thread-mark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M2 12h20"/></svg><span class="chip">${sub.name} — ${topic}</span></div>
     <span data-speak-key="KEY">SPEAK</span>`;

  const stopSpeaking = () => {
    if (speakingKey !== null && speakTimers.current[speakingKey]) {
      window.clearTimeout(speakTimers.current[speakingKey]);
      delete speakTimers.current[speakingKey];
    }
    setSpeakingKey(null);
  };

  const toggleSpeak = (key: string) => {
    if (!isPlus) {
      openUpgrade();
      return;
    }
    if (speakingKey === key) {
      stopSpeaking();
      return;
    }
    stopSpeaking();
    setSpeakingKey(key);
    const durationMs = 2600;
    speakTimers.current[key] = window.setTimeout(() => {
      setSpeakingKey(null);
      delete speakTimers.current[key];
    }, durationMs);
  };

  const lockedBubble = (msg: string) => (
    <div className="bubble ai">
      {msg}
      <button className="modal-done-btn" style={{ marginTop: 10, padding: "8px 16px", fontSize: 12 }} onClick={openUpgrade}>
        Unlock AbSTopiq Plus →
      </button>
    </div>
  );

  const switchAskContext = (id: string) => setAskContext(id);

  const startNewChat = () => {
    setView("launcher");
    setAskContext("all");
    setMsgs([]);
    setAskInput("");
    setLauncherInput("");
    stopSpeaking();
  };

  const startFromLauncher = (text?: string) => {
    const value = (text ?? launcherInput).trim();
    setAskContext("all");
    setMsgs([]);
    setLauncherInput("");
    setView("answer");
    setAskInput(value);
    if (value) sendMessage(value);
  };

  const sendMessage = (raw: string) => {
    const text = raw.trim();
    if (!text) return;
    setMsgs((prev) => [...prev, { role: "user", text }]);
    setAskInput("");
    if (!consumeAiUse()) {
      setMsgs((prev) => [
        ...prev,
        {
          role: "ai",
          html: `That's today's 3 free Sabi AI questions used up. Practice, flashcards and lessons stay free — AbSTopiq Plus unlocks unlimited Sabi AI.<span data-lock></span>`,
        },
      ]);
      return;
    }
    setMaterializing(true);
    window.setTimeout(() => {
      setMaterializing(false);
      const g = resolveGrounded(text);
      if (!g) {
        const key = `unch_${Date.now()}`;
        setMsgs((prev) => [
          ...prev,
          {
            role: "ai",
            html: `I couldn't tell which subject or topic that's about — Sabi AI answers are grounded in your syllabus, so a specific subject helps.<span data-suggest></span>`,
          },
        ]);
        return;
      }
      const key = `ai_${Date.now()}`;
      setMsgs((prev) => [...prev, { role: "ai", html: groundedHTML(g.sub, g.topic).replace("KEY", key) }]);
      if (voiceModeOn) setSpeakingKey(key);
    }, 900);
  };

  const sendTypedAsk = () => {
    if (!askInput.trim() || materializing) return;
    sendMessage(askInput);
  };

  const quickAsk = (subId: string) => {
    setAskContext(subId);
    sendMessage(askInput);
  };

  const scanQuestion = () => {
    setMsgs((prev) => [
      ...prev,
      {
        role: "user",
        text: "",
      },
    ]);
    if (!consumeAiUse()) {
      setMsgs((prev) => [
        ...prev,
        {
          role: "ai",
          html: `That's today's 3 free Sabi AI questions used up. Scanning stays available on AbSTopiq Plus — unlimited.<span data-lock></span>`,
        },
      ]);
      return;
    }
    setMaterializing(true);
    window.setTimeout(() => {
      setMaterializing(false);
      const fallbackSub = subjects[askContext !== "all" ? askContext : Object.keys(subjects)[0]];
      const g = resolveGrounded("") || { sub: fallbackSub, topic: fallbackSub.topics[0].t };
      const q = g.sub.questions && g.sub.questions[0] ? g.sub.questions[0] : null;
      const key = `scan_${Date.now()}`;
      const html = q
        ? `I can read the question: "${q.text}" — ${q.explain}
           <div class="grounding"><svg class="thread-mark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M2 12h20"/></svg><span class="chip">${q.ref}</span></div>
           <span data-speak-key="${key}">SPEAK</span>`
        : `Got it — here's the grounded walkthrough for that question.
           <div class="grounding"><svg class="thread-mark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M2 12h20"/></svg><span class="chip">${g.sub.name} — ${g.topic}</span></div>
           <span data-speak-key="${key}">SPEAK</span>`;
      setMsgs((prev) => [...prev, { role: "ai", html }]);
      if (voiceModeOn) setSpeakingKey(key);
    }, 1300);
  };

  const startScan = () => {
    setMsgs([]);
    setView("answer");
    scanQuestion();
  };

  const toggleMic = () => {
    setAskInput("Why does this reaction need a catalyst?");
  };

  const toggleVoiceMode = () => {
    if (!isPlus) {
      openUpgrade();
      return;
    }
    setVoiceModeOn((v) => !v);
  };

  const toggleVoiceLearn = () => {
    if (vlListening) return;
    setVlListening(true);
    setVlStatus("Listening…");
    setVlTranscript("");
    setVlAnswer(null);
    window.setTimeout(() => {
      const text = VOICE_SAMPLES[vlIdx.current % VOICE_SAMPLES.length];
      vlIdx.current++;
      setVlStatus("Thinking…");
      setVlTranscript(text);
      if (!consumeAiUse()) {
        setVlStatus("Tap to speak");
        setVlAnswer({ html: "LOCK" });
        setVlListening(false);
        return;
      }
      window.setTimeout(() => {
        const fallbackSub = subjects[Object.keys(subjects)[0]];
        const g = resolveGrounded(text) || { sub: fallbackSub, topic: fallbackSub.topics[0].t };
        setVlStatus("Tap to ask another");
        setVlAnswer({ html: groundedHTML(g.sub, g.topic).replace("KEY", `vl_${Date.now()}`) });
        setVlListening(false);
      }, 900);
    }, 1400);
  };

  const openHistoryItem = (id: string) => {
    const convo = history.find((c) => c.id === id);
    if (!convo) return;
    setAskContext(convo.subject);
    setMsgs(
      convo.messages.map<Message>((m) =>
        m.role === "user"
          ? { role: "user", text: m.text ?? "" }
          : { role: "ai", html: m.html ?? "" },
      ),
    );
    setView("answer");
  };

  const deleteHistoryItem = (id: string) => {
    setHistory((prev) => prev.filter((c) => c.id !== id));
  };

  const q = historySearch.trim().toLowerCase();
  const filteredHistory = history.filter(
    (c) =>
      !q ||
      c.title.toLowerCase().includes(q) ||
      (subjects[c.subject] && subjects[c.subject].name.toLowerCase().includes(q)),
  );

  return (
    <>
      {showUpgrade && (
        <div className="modal-overlay show" onClick={closeUpgrade}>
          <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeUpgrade}>✕</button>
            <h2>Unlock AbSTopiq Plus</h2>
            <p style={{ fontSize: 13, color: "var(--ink-soft)", marginBottom: 16 }}>
              Practice questions, flashcards and lessons stay free — always. Plus unlocks unlimited Sabi AI chat, lesson audio, and full timed mock exams.
            </p>
            <div className="plan-toggle-row">
              <div className="plan-card" onClick={activatePlus}>
                <div className="pc-name">Monthly</div>
                <div className="pc-price">₦1,500</div>
                <div className="pc-period">per month</div>
              </div>
              <div className="plan-card best" onClick={activatePlus}>
                <span className="pc-badge">WAEC SEASON</span>
                <div className="pc-name">Exam-Ready Pass</div>
                <div className="pc-price">₦2,000</div>
                <div className="pc-period">through results day</div>
              </div>
            </div>
            <button className="modal-done-btn" onClick={activatePlus}>Start 7-day free trial →</button>
          </div>
        </div>
      )}

      <section className="screen active" id="screen-ask" style={{ display: view === "launcher" ? "block" : "none" }}>
        <div className="ask-header-row">
          <div>
            <span className="eyebrow">Grounded help, any subject</span>
            <h1 className="page-title">Sabi AI</h1>
          </div>
          <button className="header-icon-btn" title="Chat history" onClick={() => setView("history")}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>
          </button>
        </div>
        <p className="page-sub">AbSTopiq's AI — type it, say it, or scan it. Every answer traces back to your syllabus, on its own page.</p>

        <div className={`usage-chip${usageLabel.cls}`}>
          <span className="uc-label">{usageLabel.label}</span>
          <span className="uc-link" onClick={openUpgrade}>{usageLabel.link}</span>
        </div>

        <div className="voice-learn-card" onClick={() => setView("voice")}>
          <div className="vlc-icon">🎙️</div>
          <div className="vlc-text">
            <div className="vlc-title">Voice Learning</div>
            <div className="vlc-sub">Talk it through — Sabi AI listens and answers out loud</div>
          </div>
          <svg className="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
        </div>

        <span className="eyebrow" style={{ marginTop: 18, display: "block" }}>Or type your question</span>
        <div className="composer-v2" style={{ marginBottom: 16 }}>
          <button className="icon-btn" title="Scan a question" onClick={startScan}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
          </button>
          <input
            type="text"
            value={launcherInput}
            placeholder="Ask anything, any subject…"
            onChange={(e) => setLauncherInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && startFromLauncher()}
          />
          <button className="send-btn" onClick={() => startFromLauncher()}>
            <SendIcon />
          </button>
        </div>
      </section>

      <section className="screen active" id="screen-ask-answer" style={{ display: view === "answer" ? "flex" : "none" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
          <div className="back-row" style={{ marginBottom: 0 }} onClick={startNewChat}>
            <BackChevron /> Sabi AI
          </div>
          <button className="add-entry-btn" style={{ width: "auto", marginTop: 2, whiteSpace: "nowrap", padding: "9px 14px" }} onClick={startNewChat}>
            + New chat
          </button>
        </div>

        <div className="usage-chip" id="askUsageChip" style={{ display: chatVisible ? "" : "none" }}>
          <span className="uc-label">{usageLabel.label}</span>
          <span className="uc-link" onClick={openUpgrade}>{usageLabel.link}</span>
        </div>

        <div className={`voice-toggle${voiceModeOn ? " on" : ""}`} id="voiceToggle" onClick={toggleVoiceMode} style={{ display: chatVisible ? "" : "none" }}>
          <span className="vt-label">🔊 Voice replies <span className="plus-lock">⭐ PLUS</span></span>
          <span className="vt-switch"></span>
        </div>

        <div className="chat-scroll" id="askChat" ref={chatScroll}>
          {msgs.length === 0 ? (
            <div className="empty-ask">
              <div className="icon">🧠</div>
              <div style={{ fontWeight: 700, fontSize: 14.5 }}>Meet Sabi AI — ask about any topic, in any subject</div>
            </div>
          ) : (
            msgs.map((m, i) => (
              <div className={`bubble ${m.role}`} key={i}>
                {m.role === "user" ? (
                  m.text || (
                    <span>
                      Scanned a question from my textbook
                      <span className="scan-thumb"><span className="ph">📷</span><span>photo_scan_04.jpg</span></span>
                    </span>
                  )
                ) : (
                  (() => {
                    if (m.html.includes("data-lock")) return (
                      <span>
                        {lockText(m.html)}
                        <button className="modal-done-btn" style={{ marginTop: 10, padding: "8px 16px", fontSize: 12 }} onClick={openUpgrade}>
                          Unlock AbSTopiq Plus →
                        </button>
                      </span>
                    );
                    if (m.html.includes("data-suggest")) return (
                      <span>
                        I couldn't tell which subject or topic that's about — Sabi AI answers are grounded in your syllabus, so a specific subject helps.
                        <div className="ask-context-row" style={{ marginTop: 10 }}>
                          {["biology", "mathematics", "english"].map((sid) => (
                            <button key={sid} className="context-chip" onClick={() => quickAsk(sid)} style={{ marginRight: 6 }}>
                              {subjects[sid].icon} {subjects[sid].name}
                            </button>
                          ))}
                        </div>
                      </span>
                    );
                    const pure = m.html
                      .replace(/<span data-speak-key="([^"]+)">SPEAK<\/span>/g, "")
                      .replace(/\s+/g, " ")
                      .trim();
                    const keyMatch = m.html.match(/data-speak-key="([^"]+)"/);
                    const speakKey = keyMatch ? keyMatch[1] : null;
                    return (
                      <>
                        <span dangerouslySetInnerHTML={{ __html: pure }} />
                        {speakKey && (
                          <SpeakButton onSpeak={() => toggleSpeak(speakKey)} speaking={speakingKey === speakKey} />
                        )}
                      </>
                    );
                  })()
                )}
              </div>
            ))
          )}
          {materializing && (
            <div className="bubble ai">
              <div className="typing-dots"><span></span><span></span><span></span></div>
            </div>
          )}
        </div>

        <div className="composer-v2">
          <button className="icon-btn" title="Scan a question" onClick={() => view === "answer" && scanQuestion()}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
          </button>
          <button className="icon-btn mic" title="Ask by voice" onClick={toggleMic}>
            <MicIcon />
          </button>
          <input
            type="text"
            id="askInput"
            value={askInput}
            placeholder="Ask anything, any subject…"
            onChange={(e) => setAskInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendTypedAsk()}
          />
          <button className="send-btn" onClick={sendTypedAsk}>
            <SendIcon />
          </button>
        </div>
      </section>

      <section className="screen active" id="screen-chathistory" style={{ display: view === "history" ? "block" : "none" }}>
        <div className="back-row" onClick={() => setView("launcher")}>
          <BackChevron /> Sabi AI
        </div>
        <span className="eyebrow">All conversations</span>
        <h1 className="page-title">Chat history</h1>
        <input
          type="text"
          className="chat-history-search"
          style={{ width: "100%", marginBottom: 14 }}
          placeholder="Search past conversations…"
          value={historySearch}
          onChange={(e) => setHistorySearch(e.target.value)}
        />
        <div id="chatHistoryListFull">
          {filteredHistory.length === 0 ? (
            <div className="chat-history-empty">
              {q ? `No conversations match "${historySearch}".` : "No conversations yet — ask Sabi AI something to get started."}
            </div>
          ) : (
            filteredHistory.map((c) => (
              <div key={c.id}>
                <div className="chat-history-row" onClick={() => openHistoryItem(c.id)}>
                  <div className="chat-history-icon">{c.icon}</div>
                  <div className="chat-history-body">
                    <div className="chat-history-title">{c.title}</div>
                    <div className="chat-history-snippet">{subjects[c.subject] ? subjects[c.subject].name : "General"}</div>
                    <div className="chat-history-meta">{c.date}</div>
                  </div>
                  <button
                    className="chat-history-delete"
                    title="Delete conversation"
                    onClick={(e) => { e.stopPropagation(); deleteHistoryItem(c.id); }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18"/><path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2m2 0-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="screen active" id="screen-voicelearn" style={{ display: view === "voice" ? "flex" : "none" }}>
        <div className="back-row" onClick={() => setView("launcher")}>
          <BackChevron /> Sabi AI
        </div>
        <div className="voicelearn-stage">
          <div className={`vl-ring${vlListening ? " listening" : vlStatus === "Thinking…" ? " thinking" : ""}`} id="vlRing">
            <button className="vl-mic-btn" id="vlMicBtn" onClick={toggleVoiceLearn}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0"/><path d="M12 19v3"/></svg>
            </button>
          </div>
          <div className="vl-status" id="vlStatus">{vlStatus}</div>
          {vlTranscript && <div className="vl-transcript" id="vlTranscript">“{vlTranscript}”</div>}
          {vlAnswer && (
            <div className="vl-answer" id="vlAnswer">
              {vlAnswer.html === "LOCK" ? (
                <span>
                  That's today's 3 free Sabi AI questions used up. Voice Learning stays available on AbSTopiq Plus — unlimited.
                  <button className="modal-done-btn" style={{ marginTop: 10, padding: "8px 16px", fontSize: 12 }} onClick={openUpgrade}>
                    Unlock AbSTopiq Plus →
                  </button>
                </span>
              ) : (
                <span dangerouslySetInnerHTML={{ __html: vlAnswer.html.replace(/<span data-speak-key="[^"]+">SPEAK<\/span>/, "") }} />
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function lockText(html: string) {
  return html
    .replace("<span data-lock></span>", "")
    .replace(/\s+/g, " ")
    .trim();
}