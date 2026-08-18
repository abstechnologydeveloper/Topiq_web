export const chatHistoryData = [
  {id:'ch1', title:'Explain photosynthesis simply', subject:'biology', icon:'🧬', date:'Today, 8:12am',
    messages:[
      {role:'user', text:'Explain photosynthesis simply'},
      {role:'ai', html:'Here\'s the grounded explanation for that, tied to your Biology syllabus rather than a generic web answer.<div class="grounding"><svg class="thread-mark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M2 12h20"/></svg><span class="chip">§ Biology — Photosynthesis</span></div>'}
    ]},
  {id:'ch2', title:'Check my working for a quadratic equation', subject:'mathematics', icon:'📐', date:'Yesterday, 6:40pm',
    messages:[
      {role:'user', text:'Can you check my working for this equation?'},
      {role:'ai', html:'Here\'s the grounded explanation for that, tied to your Mathematics syllabus rather than a generic web answer.<div class="grounding"><svg class="thread-mark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M2 12h20"/></svg><span class="chip">§ Mathematics — Quadratic Equations</span></div>'}
    ]},
  {id:'ch3', title:'Difference between mitosis and meiosis', subject:'biology', icon:'🧬', date:'2 days ago',
    messages:[
      {role:'user', text:'What\'s the difference between mitosis and meiosis?'},
      {role:'ai', html:'Here\'s the grounded explanation for that, tied to your Biology syllabus rather than a generic web answer.<div class="grounding"><svg class="thread-mark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M2 12h20"/></svg><span class="chip">§ Biology — Cell Division</span></div>'}
    ]},
  {id:'ch4', title:'Figures of speech with examples', subject:'english', icon:'📝', date:'4 days ago',
    messages:[
      {role:'user', text:'Give me figures of speech with examples'},
      {role:'ai', html:'Here\'s the grounded explanation for that, tied to your English syllabus rather than a generic web answer.<div class="grounding"><svg class="thread-mark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M2 12h20"/></svg><span class="chip">§ English — Figures of Speech</span></div>'}
    ]}
];

export const VOICE_SAMPLE_QUESTIONS = [
  "Why does this reaction need a catalyst?",
  "Explain photosynthesis simply",
  "What's the difference between mitosis and meiosis?",
  "Can you check my working for this equation?"
];
