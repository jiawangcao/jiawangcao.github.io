import React from 'react';
import ReactMarkdown from 'react-markdown';

interface AnalysisResultProps {
  content: string;
}

export const AnalysisResult: React.FC<AnalysisResultProps> = ({ content }) => {
  return (
    <div className="w-full max-w-3xl mx-auto bg-slate-900/50 border border-slate-800 p-6 md:p-10 rounded-xl shadow-2xl">
      <div className="prose prose-invert prose-amber prose-lg max-w-none font-serif leading-loose">
        <ReactMarkdown
            components={{
                h1: ({node, ...props}) => <h1 className="text-center text-amber-500 border-b border-amber-900/50 pb-4 mb-8" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-amber-400 mt-8 mb-4 flex items-center" {...props} />,
                strong: ({node, ...props}) => <strong className="text-amber-200 font-bold" {...props} />,
                p: ({node, ...props}) => <p className="mb-4 text-slate-300" {...props} />,
                li: ({node, ...props}) => <li className="text-slate-300 marker:text-amber-700" {...props} />,
            }}
        >
          {content}
        </ReactMarkdown>
      </div>
      
      <div className="mt-12 pt-6 border-t border-slate-800 text-center">
        <p className="text-xs text-slate-500 italic">
          * 命理分析仅供参考，命运掌握在自己手中。<br/>
          (Destiny analysis is for reference only; fate lies in your own hands.)
        </p>
      </div>
    </div>
  );
};