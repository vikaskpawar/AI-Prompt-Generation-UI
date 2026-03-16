import React, { useState } from 'react';
import { Sparkles, Copy, Download, Wand2, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [requirement, setRequirement] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const generatePrompt = () => {
    if (!requirement.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate generation delay
    setTimeout(() => {
      const prompt = constructPrompt(requirement);
      setGeneratedPrompt(prompt);
      setIsGenerating(false);
    }, 1500);
  };

  const constructPrompt = (req) => {
    // Highly structured prompt template based on the requested components
    return `# AI PROMPT: ${req.split(' ').slice(0, 5).join(' ')}...

## [ROLE]
Adopt the persona of an Expert ${req.includes('code') || req.includes('program') ? 'Full-Stack Developer and Technical Architect' : 'Strategic Consultant and Subject Matter Expert'}. You possess deep domain knowledge in ${req.substring(0, 50)} and prioritize precision, efficiency, and industry best practices.

## [INSTRUCTIONS]
1. Analyze the following requirement thoroughly: "${req}"
2. Break down the task into logical, sequential steps.
3. Ensure all edge cases are addressed proactively.
4. If multiple solutions exist, present the most optimized one first.
5. MANDATORY: Do not use deprecated methods or outdated patterns.

## [CONTEXT]
The goal is to provide a high-fidelity solution for "${req}". This is intended for production-level use cases where reliability and scalability are paramount. Avoid generic or superficial answers.

## [EXAMPLE]
(Template Match: ${req.includes('code') ? 'Clean Code Standard' : 'Professional Documentation Standard'})
- Input: Request for a specific logic or strategy.
- Output: Structured, modular, and well-documented response following the chosen format.

## [PARAMETERS]
- Complexity Level: Advanced / Enterprise-Grade
- Accuracy: 100% (Verifiable facts and code)
- Quality Constraints: Zero bad practices, DRY principle, SOLID principles (if applicable).
- Technical Debt: Minimal to none.

## [OUTPUT]
Provide the final result as a clean, structured artifact. 
- If code: Include necessary imports and clear modular structure.
- If text: Use markdown headings, bullet points, and highlight key takeaways.
- NO conversational filler. Start directly with the core solution.

## [TONE]
Technical, precise, objective, and authoritative. Focus exclusively on the request without unnecessary introductions or conclusions.`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadAsFile = () => {
    const element = document.createElement("a");
    const file = new Blob([generatedPrompt], {type: 'text/markdown'});
    element.href = URL.createObjectURL(file);
    element.download = "fine-tuned-prompt.md";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="container">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>AI Prompt Architect</h1>
        <p className="subtitle">Transform vague requirements into high-performance fine-tuned prompts.</p>
      </motion.div>

      <div className="input-section">
        <div>
          <label>Your Requirement</label>
          <textarea 
            placeholder="Describe what you want the AI to do (e.g., 'Create a React form with validation', 'Write a strategy for lead generation')..."
            value={requirement}
            onChange={(e) => setRequirement(e.target.value)}
          />
        </div>

        <button 
          className="btn-primary" 
          onClick={generatePrompt}
          disabled={isGenerating || !requirement.trim()}
        >
          {isGenerating ? (
            <div className="loading-dots">
              <div className="dot" />
              <div className="dot" />
              <div className="dot" />
            </div>
          ) : (
            <>
              <Wand2 size={20} />
              Generate Fine-Tuned Prompt
            </>
          )}
        </button>
      </div>

      <AnimatePresence>
        {generatedPrompt && (
          <motion.div 
            className="result-section"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <label>Generated Fine-Tuned Prompt</label>
            <div className="output-container">
              <div className="output-content">
                {generatedPrompt}
              </div>
              
              <div className="actions">
                <button className="btn-secondary action-btn" onClick={copyToClipboard}>
                  {copied ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
                  {copied ? 'Copied!' : 'Copy Prompt'}
                </button>
                <button className="btn-secondary action-btn" onClick={downloadAsFile}>
                  <Download size={16} />
                  Download .md
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-secondary)', opacity: 0.5 }}>
        Built with Antigravity • Premium Prompt Engineering System
      </div>
    </div>
  );
}

export default App;
