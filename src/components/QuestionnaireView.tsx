import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  BookOpen, 
  Sparkles, 
  HelpCircle, 
  Award,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/questionnaire';
import { QuizQuestion } from '../types';

interface QuestionnaireViewProps {
  onBack: () => void;
  onSelectArticle: (slug: string) => void;
}

export const QuestionnaireView: React.FC<QuestionnaireViewProps> = ({
  onBack,
  onSelectArticle
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ: QuizQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
  const totalQuestions = QUIZ_QUESTIONS.length;

  const handleSelectOption = (optionIndex: number) => {
    if (selectedAnswers[currentQuestionIndex] !== undefined) return; // already answered
    setSelectedAnswers(prev => ({ ...prev, [currentQuestionIndex]: optionIndex }));
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setShowExplanation(false);
    setCurrentQuestionIndex(0);
    setIsFinished(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calculate score
  const correctCount = Object.entries(selectedAnswers).reduce((acc, [qIdx, ansIdx]) => {
    const q = QUIZ_QUESTIONS[Number(qIdx)];
    return q && q.correctIndex === ansIdx ? acc + 1 : acc;
  }, 0);

  // Missed questions for recommendations
  const missedQuestions = QUIZ_QUESTIONS.filter((q, idx) => {
    const selected = selectedAnswers[idx];
    return selected !== undefined && selected !== q.correctIndex;
  });

  const getTier = (score: number) => {
    if (score >= 9) return { label: 'Algorithm Master', desc: 'Outstanding knowledge! You understand how the Instagram algorithm evaluates engagement friction, watch time, and multi-surface signals.' };
    if (score >= 7) return { label: 'Growth Strategist', desc: 'Strong grasp! You recognize the core principles behind Instagram growth strategies and distribution cohorts.' };
    if (score >= 5) return { label: 'Active Practitioner', desc: 'Good baseline. Exploring detailed Instagram algorithm tips will help refine your content performance.' };
    return { label: 'Algorithm Explorer', desc: 'A great starting point. Review our foundational guides below to avoid common misconceptions.' };
  };

  const tier = getTier(correctCount);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-neutral-900 pb-20">
      {/* Header Banner */}
      <header className="bg-white border-b border-neutral-200 py-10 sm:py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-neutral-500 font-mono mb-4">
            <button 
              onClick={onBack}
              className="hover:text-neutral-900 transition-colors cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3 h-3 text-neutral-400" />
            <span className="text-neutral-900 font-semibold uppercase">
              Algorithm Knowledge Quiz
            </span>
          </nav>

          <div className="inline-flex items-center gap-2 mb-3 text-xs uppercase font-mono tracking-widest text-neutral-500">
            <Award className="w-3.5 h-3.5 text-rose-600" />
            <span>Interactive Assessment</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-neutral-900 mb-3">
            Instagram Algorithm Knowledge Assessment
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 font-light leading-relaxed max-w-2xl">
            Evaluate your understanding of the <strong>Instagram algorithm</strong>, benchmark your retention instincts, and discover targeted <strong>Instagram algorithm tips</strong> and verified <strong>Instagram growth strategies</strong>.
          </p>
        </div>
      </header>

      {/* Main Quiz Body */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        {!isFinished ? (
          <div className="bg-white border border-neutral-200 p-6 sm:p-10 shadow-xs rounded-sm">
            
            {/* Progress Bar & Counter */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs font-mono text-neutral-500 uppercase tracking-wider mb-2">
                <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
                <span className="font-semibold text-rose-600">{currentQ.topic}</span>
              </div>
              <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-neutral-900 transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Heading (H2 for semantic AEO structure) */}
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-neutral-900 leading-snug mb-6">
              {currentQ.question}
            </h2>

            {/* Options */}
            <div className="space-y-3 mb-6">
              {currentQ.options.map((option, optIdx) => {
                const isSelected = selectedAnswers[currentQuestionIndex] === optIdx;
                const isAnswered = selectedAnswers[currentQuestionIndex] !== undefined;
                const isCorrect = currentQ.correctIndex === optIdx;

                let btnStyles = "border-neutral-200 hover:border-neutral-400 bg-white text-neutral-800";
                if (isAnswered) {
                  if (isCorrect) {
                    btnStyles = "border-emerald-500 bg-emerald-50/70 text-emerald-950 font-medium";
                  } else if (isSelected && !isCorrect) {
                    btnStyles = "border-red-400 bg-red-50/70 text-red-950";
                  } else {
                    btnStyles = "border-neutral-200 bg-neutral-50/50 text-neutral-400";
                  }
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    disabled={isAnswered}
                    className={`w-full text-left p-4 border rounded-sm text-sm sm:text-base transition-all flex items-start gap-3.5 cursor-pointer ${btnStyles}`}
                  >
                    <span className="font-mono text-xs uppercase font-bold mt-0.5 text-neutral-400">
                      {String.fromCharCode(65 + optIdx)}.
                    </span>
                    <span className="flex-1 leading-relaxed">{option}</span>
                    {isAnswered && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    )}
                    {isAnswered && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Immediate Explanation Feedback */}
            {showExplanation && (
              <div className="p-5 bg-neutral-50 border-l-4 border-neutral-900 my-6 animate-in fade-in duration-200">
                <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-neutral-900 mb-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Verified Explanation</span>
                </div>
                <p className="text-sm text-neutral-700 leading-relaxed font-sans mb-3">
                  {currentQ.explanation}
                </p>
                <div className="text-xs text-neutral-500 font-mono">
                  Recommended reading:{" "}
                  <button
                    onClick={() => onSelectArticle(currentQ.recommendedSlug)}
                    className="text-rose-600 hover:underline font-semibold"
                  >
                    {currentQ.recommendedTitle}
                  </button>
                </div>
              </div>
            )}

            {/* Next / Submit Button */}
            {selectedAnswers[currentQuestionIndex] !== undefined && (
              <div className="flex justify-end pt-4 border-t border-neutral-100">
                <button
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-white text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer"
                >
                  <span>{currentQuestionIndex < totalQuestions - 1 ? 'Next Question' : 'View Final Results'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Final Results Screen */
          <div className="bg-white border border-neutral-200 p-8 sm:p-12 shadow-xs rounded-sm space-y-8">
            <div className="text-center max-w-lg mx-auto">
              <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-neutral-200">
                <Award className="w-8 h-8 text-neutral-900" />
              </div>
              <span className="text-xs uppercase font-mono text-neutral-400 tracking-wider">Assessment Complete</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900 mt-1 mb-2">
                Score: {correctCount} / {totalQuestions}
              </h2>
              <div className="inline-block px-3 py-1 bg-neutral-900 text-white font-mono text-xs uppercase tracking-wider font-bold mb-4">
                Tier: {tier.label}
              </div>
              <p className="text-sm text-neutral-600 leading-relaxed font-normal">
                {tier.desc}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-neutral-200">
              <button
                onClick={handleRestart}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-white text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake Questionnaire</span>
              </button>
              <button
                onClick={onBack}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-neutral-300 hover:border-neutral-900 text-neutral-800 text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>Return to Home</span>
              </button>
            </div>

            {/* Personalized Article Recommendations Based on Missed Questions */}
            <div className="pt-8 border-t border-neutral-200">
              <h3 className="font-serif text-xl font-bold text-neutral-900 mb-2">
                {missedQuestions.length > 0 ? "Targeted Articles to Boost Your Knowledge" : "Explore Master Guides for Continued Growth"}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 mb-5">
                {missedQuestions.length > 0 
                  ? "Based on your questionnaire responses, review these specific investigations to master the underlying Instagram algorithm ranking signals:"
                  : "You answered all questions correctly! Solidify your strategic edge with our in-depth guides on Instagram algorithm tips and Instagram growth strategies:"
                }
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(missedQuestions.length > 0 ? missedQuestions : QUIZ_QUESTIONS.slice(0, 4)).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onSelectArticle(item.recommendedSlug)}
                    className="p-4 border border-neutral-200 hover:border-neutral-900 bg-neutral-50/50 hover:bg-white transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-mono uppercase text-rose-600 font-bold block mb-1">
                        Topic: {item.topic}
                      </span>
                      <h4 className="text-sm font-semibold text-neutral-900 group-hover:text-rose-600 transition-colors line-clamp-2 mb-1.5">
                        {item.recommendedTitle}
                      </h4>
                    </div>
                    <div className="pt-3 border-t border-neutral-200/60 flex items-center justify-between text-xs font-semibold text-neutral-800 mt-2">
                      <span>Read full investigation</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
