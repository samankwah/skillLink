import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Award, 
  RotateCcw,
  ChevronRight,
  AlertCircle
} from 'lucide-react'

const QuizPlayer = ({ 
  quizData, 
  onComplete, 
  onRetry,
  timeLimit = null,
  passingScore = 70 
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(timeLimit)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [startTime] = useState(Date.now())

  // Timer effect
  useEffect(() => {
    if (timeLimit && timeRemaining > 0 && !showResults) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleSubmitQuiz()
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [timeRemaining, showResults, timeLimit])

  const handleAnswerSelect = (questionId, answerIndex) => {
    if (isSubmitted) return
    
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }))
  }

  const handleNextQuestion = () => {
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  const calculateScore = () => {
    let correctAnswers = 0
    quizData.questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correctAnswers++
      }
    })
    return Math.round((correctAnswers / quizData.questions.length) * 100)
  }

  const handleSubmitQuiz = () => {
    const finalScore = calculateScore()
    setScore(finalScore)
    setIsSubmitted(true)
    setShowResults(true)

    const quizResult = {
      score: finalScore,
      passed: finalScore >= passingScore,
      totalQuestions: quizData.questions.length,
      correctAnswers: quizData.questions.filter(q => answers[q.id] === q.correctAnswer).length,
      timeTaken: Math.round((Date.now() - startTime) / 1000),
      answers: answers
    }

    if (onComplete) {
      onComplete(quizResult)
    }
  }

  const handleRetryQuiz = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
    setScore(0)
    setTimeRemaining(timeLimit)
    setIsSubmitted(false)
    
    if (onRetry) {
      onRetry()
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getAnswerStatus = (questionId, answerIndex) => {
    if (!isSubmitted) return 'default'
    
    const question = quizData.questions.find(q => q.id === questionId)
    const userAnswer = answers[questionId]
    
    if (answerIndex === question.correctAnswer) {
      return 'correct'
    } else if (answerIndex === userAnswer && answerIndex !== question.correctAnswer) {
      return 'incorrect'
    }
    return 'default'
  }

  const currentQuestionData = quizData.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / quizData.questions.length) * 100
  const allAnswered = quizData.questions.every(q => answers[q.id] !== undefined)

  if (showResults) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            {score >= passingScore ? (
              <Award className="w-6 h-6 text-green-600" />
            ) : (
              <XCircle className="w-6 h-6 text-red-600" />
            )}
            Quiz Results
          </CardTitle>
          <CardDescription>
            {score >= passingScore ? 'Congratulations! You passed!' : 'You need to retake this quiz.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Score Display */}
          <div className="text-center space-y-4">
            <div className="text-6xl font-bold">
              <span className={score >= passingScore ? 'text-green-600' : 'text-red-600'}>
                {score}%
              </span>
            </div>
            <div className="flex justify-center gap-8 text-sm text-muted-foreground">
              <div>
                <div className="font-semibold">Correct Answers</div>
                <div>{quizData.questions.filter(q => answers[q.id] === q.correctAnswer).length} / {quizData.questions.length}</div>
              </div>
              <div>
                <div className="font-semibold">Time Taken</div>
                <div>{formatTime(Math.round((Date.now() - startTime) / 1000))}</div>
              </div>
              <div>
                <div className="font-semibold">Passing Score</div>
                <div>{passingScore}%</div>
              </div>
            </div>
          </div>

          {/* Question Review */}
          <div className="space-y-4">
            <h3 className="font-semibold">Question Review</h3>
            {quizData.questions.map((question, index) => {
              const userAnswer = answers[question.id]
              const isCorrect = userAnswer === question.correctAnswer
              
              return (
                <Card key={question.id} className={`border-l-4 ${isCorrect ? 'border-l-green-500' : 'border-l-red-500'}`}>
                  <CardContent className="pt-4">
                    <div className="flex items-start gap-3">
                      {isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <p className="font-medium mb-2">
                          {index + 1}. {question.question}
                        </p>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">Your answer:</span>
                            <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                              {question.options[userAnswer] || 'Not answered'}
                            </span>
                          </div>
                          {!isCorrect && (
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground">Correct answer:</span>
                              <span className="text-green-600">
                                {question.options[question.correctAnswer]}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            {score < passingScore && (
              <Button onClick={handleRetryQuiz} variant="outline">
                <RotateCcw className="w-4 h-4 mr-2" />
                Retake Quiz
              </Button>
            )}
            <Button onClick={() => window.location.reload()}>
              Continue Course
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{quizData.title}</CardTitle>
            <CardDescription>
              Question {currentQuestion + 1} of {quizData.questions.length}
            </CardDescription>
          </div>
          {timeLimit && (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className={`font-mono ${timeRemaining < 60 ? 'text-red-600' : ''}`}>
                {formatTime(timeRemaining)}
              </span>
            </div>
          )}
        </div>
        <Progress value={progress} className="mt-2" />
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Question */}
        <div>
          <h3 className="text-lg font-semibold mb-4">
            {currentQuestionData.question}
          </h3>
          
          {/* Answer Options */}
          <div className="space-y-3">
            {currentQuestionData.options.map((option, index) => {
              const isSelected = answers[currentQuestionData.id] === index
              const status = getAnswerStatus(currentQuestionData.id, index)
              
              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(currentQuestionData.id, index)}
                  disabled={isSubmitted}
                  className={`w-full p-4 text-left border-2 rounded-lg transition-all ${
                    isSelected 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                  } ${
                    status === 'correct' ? 'border-green-500 bg-green-50' :
                    status === 'incorrect' ? 'border-red-500 bg-red-50' : ''
                  } ${isSubmitted ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? 'border-primary bg-primary text-white' : 'border-muted-foreground'
                    }`}>
                      <span className="text-sm font-medium">
                        {String.fromCharCode(65 + index)}
                      </span>
                    </div>
                    <span>{option}</span>
                    {status === 'correct' && (
                      <CheckCircle className="w-5 h-5 text-green-600 ml-auto" />
                    )}
                    {status === 'incorrect' && (
                      <XCircle className="w-5 h-5 text-red-600 ml-auto" />
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4 border-t">
          <Button
            variant="outline"
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          
          <div className="flex items-center gap-2">
            {!allAnswered && (
              <div className="flex items-center gap-1 text-amber-600 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>Answer all questions to submit</span>
              </div>
            )}
          </div>

          {currentQuestion === quizData.questions.length - 1 ? (
            <Button
              onClick={handleSubmitQuiz}
              disabled={!allAnswered || isSubmitted}
            >
              Submit Quiz
            </Button>
          ) : (
            <Button
              onClick={handleNextQuestion}
              disabled={answers[currentQuestionData.id] === undefined}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default QuizPlayer