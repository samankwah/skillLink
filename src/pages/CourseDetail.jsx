import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { 
  ArrowLeft,
  Play,
  Pause,
  CheckCircle,
  Clock,
  Users,
  Star,
  Award,
  FileText,
  HelpCircle,
  BookOpen,
  ChevronRight,
  XCircle
} from 'lucide-react'
import { useLMS } from '@/context/LMSContext'
import VideoPlayer from '@/components/common/VideoPlayer'
import QuizPlayer from '@/components/common/QuizPlayer'
import ReviewModal from '@/components/common/ReviewModal'

const CourseDetail = () => {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const { courses, enrolledCourses, courseProgress, updateProgress, completeCourse } = useLMS()
  const [currentLesson, setCurrentLesson] = useState(0)
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [courseCompleted, setCourseCompleted] = useState(false)
  const [notification, setNotification] = useState(null)

  const course = courses.find(c => c.id === parseInt(courseId))
  const isEnrolled = enrolledCourses.some(c => c.id === parseInt(courseId))
  const progress = courseProgress[courseId] || {}

  useEffect(() => {
    // Auto-hide notification after 3 seconds
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [notification])

  if (!course) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Course not found</p>
        <Button asChild className="mt-4">
          <Link to="/courses">Back to Courses</Link>
        </Button>
      </div>
    )
  }

  if (!isEnrolled) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Button variant="ghost" asChild>
          <Link to="/courses">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Courses
          </Link>
        </Button>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Enrollment Required</h3>
              <p className="text-muted-foreground mb-4">
                You need to enroll in this course to access the content
              </p>
              <Button asChild>
                <Link to="/courses">Browse Courses</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const completedLessons = Object.keys(progress).filter(key => progress[key]).length
  const totalLessons = course.lessons.length
  const courseProgressPercent = Math.round((completedLessons / totalLessons) * 100)

  const handleLessonComplete = async (lessonId) => {
    updateProgress(courseId, lessonId, true)
    setNotification({ type: 'success', message: 'Lesson completed!' })
    
    // Check if course is completed
    const newCompleted = completedLessons + 1
    if (newCompleted === totalLessons) {
      await handleCourseComplete()
    } else {
      // Auto-advance to next lesson
      if (currentLesson < course.lessons.length - 1) {
        setTimeout(() => {
          setCurrentLesson(prev => prev + 1)
        }, 1500)
      }
    }
  }

  const handleCourseComplete = async () => {
    try {
      const certificate = await completeCourse(parseInt(courseId))
      if (certificate) {
        setCourseCompleted(true)
        setNotification({ type: 'success', message: 'Course completed! Certificate generated!' })
        setShowReviewModal(true)
      }
    } catch (error) {
      setNotification({ type: 'error', message: 'Error completing course' })
    }
  }

  const handleVideoProgress = (progress) => {
    // Mark lesson as completed when 90% watched
    if (progress >= 90 && !progress[currentLessonData.id]) {
      handleLessonComplete(currentLessonData.id)
    }
  }

  const handleQuizComplete = (result) => {
    if (result.passed) {
      handleLessonComplete(currentLessonData.id)
    } else {
      setNotification({ 
        type: 'error', 
        message: `Quiz failed with ${result.score}%. You need ${70}% to pass.` 
      })
    }
  }

  const currentLessonData = course.lessons[currentLesson]

  // Quiz data for the current lesson
  const getQuizData = () => {
    if (currentLessonData.type !== 'quiz') return null
    
    return {
      title: currentLessonData.title,
      questions: [
        {
          id: 1,
          question: "What is the main purpose of JavaScript?",
          options: ["Styling web pages", "Adding interactivity to web pages", "Database management", "Server configuration"],
          correctAnswer: 1
        },
        {
          id: 2,
          question: "Which keyword is used to declare a variable in JavaScript?",
          options: ["var", "let", "const", "All of the above"],
          correctAnswer: 3
        },
        {
          id: 3,
          question: "What does DOM stand for?",
          options: ["Document Object Model", "Data Object Management", "Dynamic Object Method", "Document Oriented Markup"],
          correctAnswer: 0
        }
      ]
    }
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Button variant="ghost" asChild>
          <Link to="/courses">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Courses
          </Link>
        </Button>
        <Badge variant="secondary" className="w-fit">
          {courseProgressPercent}% Complete
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Course Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl">{course.title}</CardTitle>
              <CardDescription>{course.description}</CardDescription>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Users className="h-3 w-3" />
                  <span>{course.enrolledCount} enrolled</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span>{course.rating}</span>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Lesson Content */}
          {currentLessonData.type === 'video' ? (
            <VideoPlayer
              lessonTitle={currentLessonData.title}
              onProgress={handleVideoProgress}
              onComplete={() => handleLessonComplete(currentLessonData.id)}
              autoPlay={false}
            />
          ) : (
            <QuizPlayer
              quizData={getQuizData()}
              onComplete={handleQuizComplete}
              onRetry={() => setNotification({ type: 'info', message: 'Retaking quiz...' })}
              passingScore={70}
            />
          )}

        </div>

        {/* Sidebar - Curriculum */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Course Progress</CardTitle>
              <Progress value={courseProgressPercent} className="mt-2" />
              <p className="text-sm text-muted-foreground">
                {completedLessons} of {totalLessons} lessons completed
              </p>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Curriculum</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {course.lessons.map((lesson, index) => (
                <div
                  key={lesson.id}
                  onClick={() => setCurrentLesson(index)}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    index === currentLesson
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        progress[lesson.id]
                          ? 'bg-green-100 text-green-600'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {progress[lesson.id] ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <span className="text-xs">{index + 1}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-1">{lesson.title}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          {lesson.type === 'video' ? (
                            <Play className="w-3 h-3" />
                          ) : (
                            <FileText className="w-3 h-3" />
                          )}
                          <span>{lesson.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {courseProgressPercent === 100 && (
            <Card className="border-green-200 bg-green-50">
              <CardContent className="pt-6 text-center">
                <Award className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-green-900 mb-2">Course Completed!</h3>
                <p className="text-sm text-green-700 mb-4">
                  Congratulations! You've completed this course.
                </p>
                <Button asChild size="sm" className="bg-green-600 hover:bg-green-700">
                  <Link to="/certificates">View Certificate</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg border-l-4 ${
          notification.type === 'success' ? 'bg-green-50 border-green-500 text-green-700' :
          notification.type === 'error' ? 'bg-red-50 border-red-500 text-red-700' :
          'bg-blue-50 border-blue-500 text-blue-700'
        }`}>
          <div className="flex items-center gap-2">
            {notification.type === 'success' && <CheckCircle className="w-5 h-5" />}
            {notification.type === 'error' && <XCircle className="w-5 h-5" />}
            <span className="font-medium">{notification.message}</span>
          </div>
        </div>
      )}

      {/* Review Modal */}
      <ReviewModal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        courseId={courseId}
        courseName={course.title}
      />
    </div>
  )
}

export default CourseDetail