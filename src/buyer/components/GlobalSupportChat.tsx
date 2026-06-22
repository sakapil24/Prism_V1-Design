import * as React from 'react';
import { Startup, Deal } from '../types';

interface GlobalSupportChatProps {
  startup: Startup;
  deals: Deal[];
  isViewingDrilldown: boolean;
}

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

export function GlobalSupportChat({ startup, deals, isViewingDrilldown }: GlobalSupportChatProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [unread, setUnread] = React.useState(true);
  const [isTyping, setIsTyping] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: 'init-1',
      sender: 'ai',
      text: 'Hi there! 👋 I am your Prism AI Assistant. Ask me anything about recommended partners, deals, or your perks pool.',
      timestamp: new Date()
    }
  ]);

  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleOpenToggle = () => {
    setIsOpen(!isOpen);
    if (unread) {
      setUnread(false);
    }
  };

  const getAIResponse = (userText: string): string => {
    const text = userText.toLowerCase();

    // 1. Savanko / Legal Advisory / Cap Table
    if (
      text.includes('savanko') || 
      text.includes('sarvaank') || 
      text.includes('siddharth') || 
      text.includes('legal') || 
      text.includes('advisory') || 
      text.includes('lawyer') || 
      text.includes('compliance') ||
      text.includes('cap table')
    ) {
      return `**Savanko Partners** (formerly Sarvaank Associates) is our vetted specialist for **Legal Advisory & Cap Table Compliance**.\n\n• **Key Contact**: Siddharth Savanko (Founder & Partner)\n• **VC Client Relationships**: AXILOR, Anicut Capital, Speciale Invest\n• **Notable Transactions**: advised Navadhan Capital, Propelld, Snapmint, Alyve Health, CapGrid, and Cogos\n• **Ecosystem Offer**: Exclusive member benefits & custom engagements for founders.`;
    }

    // 2. Claiming Perks / Deals / Ledger
    if (
      text.includes('claim') || 
      text.includes('deal') || 
      text.includes('perk') || 
      text.includes('aws') || 
      text.includes('stripe') || 
      text.includes('notion') || 
      text.includes('redeem') || 
      text.includes('ledger')
    ) {
      return `Here's how to redeem your perks on Prism:\n\n1. Navigate to the **Deals** tab.\n2. Choose a partner deal (e.g. AWS $5k credits, Stripe $1k credits) and click **Claim Perk**.\n3. The deal starts as **Awaiting Review** while our relationships team handles approvals.\n4. Once verified, the status becomes **Active** and your promo code will be displayed.\n5. Monitor all claimed offers under your startup's **Redemption Ledger**.`;
    }

    // 3. Savings / Balance / Perks Pool
    if (
      text.includes('saving') || 
      text.includes('pool') || 
      text.includes('balance') || 
      text.includes('remaining') || 
      text.includes('money') || 
      text.includes('left') || 
      text.includes('aurelia')
    ) {
      const remaining = 31000 - startup.savingsTotal;
      return `Here is the current live perks status for **Aurelia Health**:\n\n• **Total Savings Claimed**: $${startup.savingsTotal.toLocaleString()}\n• **Remaining Perks Pool**: $${remaining.toLocaleString()}\n• **Active Utilizations**: ${startup.utilizationsCount} active deals\n• **Unclaimed Perks**: ${startup.activeClaimsCount} pending review`;
    }

    // 4. Greetings
    if (
      text.includes('hi') || 
      text.includes('hello') || 
      text.includes('hey') || 
      text.includes('greeting') || 
      text.includes('help')
    ) {
      return `Hello! How can I assist you today? You can ask me questions like:\n\n• *"Who should I hire for Cap Table support?"*\n• *"How do I redeem AWS credits?"*\n• *"What is my remaining perks balance?"*`;
    }

    // Default Fallback
    return `I can help you navigate startup benefits, claim software credits, or find contact details for vetted advisors like **Savanko Partners**. Could you clarify your question or choose one of the options below?`;
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `msg-${Date.now()}-user`,
      sender: 'user',
      text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponseText = getAIResponse(text);
      const aiMsg: Message = {
        id: `msg-${Date.now()}-ai`,
        sender: 'ai',
        text: aiResponseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 900);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage(inputValue);
    }
  };

  const suggestions = [
    'How do I claim a deal?',
    'Recommend a legal advisor',
    'Check remaining perks pool'
  ];

  // Dynamic positioning depending on active viewport views
  const bottomClass = isViewingDrilldown ? 'bottom-6' : 'bottom-[92px] lg:bottom-6';
  const panelBottomClass = isViewingDrilldown ? 'bottom-24' : 'bottom-[164px] lg:bottom-24';

  return (
    <>
      {/* Styles for typing bounce animation and custom scrollbar */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes dots-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .typing-dot {
          animation: dots-bounce 1s infinite ease-in-out;
        }
        .typing-dot:nth-child(2) {
          animation-delay: 0.2s;
        }
        .typing-dot:nth-child(3) {
          animation-delay: 0.4s;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #E5E5E5;
          border-radius: 99px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #D4D4D4;
        }
      `}} />

      {/* Floating Action Button (FAB) */}
      <button
        onClick={handleOpenToggle}
        className={`fixed right-6 z-50 ${bottomClass} w-16 h-16 rounded-full bg-[#C8102E] hover:bg-[#b00e28] text-white flex items-center justify-center cursor-pointer transition-all duration-300 shadow-[0_8px_32px_rgba(200,16,46,0.25)] hover:scale-105 active:scale-95 border-none focus:outline-none`}
        title="Support Chat"
        aria-label="Toggle support chat overlay"
      >
        {isOpen ? (
          <svg className="w-7 h-7 animate-scaleIn" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <div className="relative">
            <svg className="w-7 h-7 animate-scaleIn" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21.75l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
            </svg>
            {unread && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-green-400 border-2 border-[#C8102E]"></span>
              </span>
            )}
          </div>
        )}
      </button>

      {/* Chat Overlay Panel */}
      {isOpen && (
        <div
          className={`fixed right-6 z-50 ${panelBottomClass} w-[360px] max-w-[calc(100vw-32px)] h-[500px] max-h-[calc(100vh-140px)] bg-white border border-neutral-200/80 rounded-[24px] shadow-[0_16px_48px_rgba(0,0,0,0.16)] flex flex-col overflow-hidden animate-scaleIn font-sans`}
        >
          {/* Header Banner */}
          <div className="bg-neutral-900 text-white p-4.5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              {/* Bot Avatar */}
              <div className="w-9 h-9 rounded-xl bg-[#C8102E] text-white font-extrabold text-[13px] flex items-center justify-center shadow-inner select-none">
                AI
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-[14px] font-bold tracking-tight text-white leading-none">
                    Prism AI Assistant
                  </span>
                  {/* Status Indicator */}
                  <span className="w-2 h-2 rounded-full bg-green-500 block animate-pulse" />
                </div>
                <span className="text-[10px] text-neutral-450 font-bold mt-0.5 select-none">
                  Instant Help Center
                </span>
              </div>
            </div>
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="text-neutral-400 hover:text-white transition-colors cursor-pointer border-none bg-transparent"
              title="Close panel"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 custom-scrollbar bg-[#FAFAFA]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 max-w-[85%] ${msg.sender === 'user' ? 'self-end flex-row-reverse' : 'self-start'}`}
              >
                {/* Bot Icon for AI messages */}
                {msg.sender === 'ai' && (
                  <div className="w-6 h-6 shrink-0 rounded-md bg-neutral-200 text-neutral-700 font-extrabold text-[9.5px] flex items-center justify-center select-none mt-0.5">
                    P
                  </div>
                )}
                
                <div
                  className={`rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed shadow-sm whitespace-pre-line ${
                    msg.sender === 'user'
                      ? 'bg-neutral-900 text-white rounded-br-none'
                      : 'bg-white text-neutral-800 border border-neutral-100 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-2.5 self-start items-center">
                <div className="w-6 h-6 shrink-0 rounded-md bg-neutral-200 text-neutral-700 font-extrabold text-[9.5px] flex items-center justify-center select-none">
                  P
                </div>
                <div className="bg-white border border-neutral-100 rounded-2xl rounded-bl-none px-4.5 py-3 shadow-sm flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full typing-dot" />
                  <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full typing-dot" />
                  <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full typing-dot" />
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions & Prompt input */}
          <div className="p-3 bg-white border-t border-neutral-100 flex flex-col gap-2 shrink-0">
            {/* Suggestion Prompts */}
            {messages.length === 1 && !isTyping && (
              <div className="flex flex-col gap-1.5 pb-1">
                <span className="text-[9.5px] font-extrabold text-neutral-400 uppercase tracking-widest px-1">
                  Common Questions
                </span>
                <div className="flex flex-col gap-1">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSendMessage(s)}
                      className="text-left w-full px-3 py-1.5 bg-neutral-50 hover:bg-neutral-100 text-neutral-700 hover:text-black font-semibold text-[11.5px] border border-neutral-200/50 rounded-lg cursor-pointer transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Form */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask a question..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-1 bg-neutral-50 border border-neutral-200/80 rounded-xl px-3.5 py-2 text-[13px] focus:outline-none focus:border-neutral-900 transition-colors"
                disabled={isTyping}
              />
              <button
                onClick={() => handleSendMessage(inputValue)}
                disabled={!inputValue.trim() || isTyping}
                className="w-9 h-9 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white flex items-center justify-center cursor-pointer transition-colors border-none disabled:opacity-40 disabled:hover:bg-neutral-900 disabled:cursor-not-allowed shrink-0 shadow-sm"
                title="Send"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
