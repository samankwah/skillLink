import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  RotateCcw, 
  RotateCw,
  Settings
} from 'lucide-react'

const VideoPlayer = ({ 
  lessonTitle, 
  onProgress, 
  onComplete, 
  autoPlay = false,
  showControls = true 
}) => {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [hasStarted, setHasStarted] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2]

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      const current = video.currentTime
      setCurrentTime(current)
      
      if (onProgress && duration > 0) {
        const progressPercent = (current / duration) * 100
        onProgress(progressPercent)
      }
    }

    const handleLoadedMetadata = () => {
      setDuration(video.duration)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      if (onComplete) {
        onComplete()
      }
    }

    const handlePlay = () => {
      setIsPlaying(true)
      if (!hasStarted) {
        setHasStarted(true)
      }
    }

    const handlePause = () => {
      setIsPlaying(false)
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('ended', handleEnded)
    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('ended', handleEnded)
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
    }
  }, [duration, onProgress, onComplete, hasStarted])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
  }

  const handleSeek = (e) => {
    const video = videoRef.current
    if (!video) return

    const rect = e.currentTarget.getBoundingClientRect()
    const pos = (e.clientX - rect.left) / rect.width
    video.currentTime = pos * duration
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    video.muted = !video.muted
    setIsMuted(video.muted)
  }

  const handleVolumeChange = (e) => {
    const video = videoRef.current
    if (!video) return

    const newVolume = parseFloat(e.target.value)
    video.volume = newVolume
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  const toggleFullscreen = () => {
    const video = videoRef.current
    if (!video) return

    if (!document.fullscreenElement) {
      video.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const skipTime = (seconds) => {
    const video = videoRef.current
    if (!video) return

    video.currentTime += seconds
  }

  const changeSpeed = (speed) => {
    const video = videoRef.current
    if (!video) return

    video.playbackRate = speed
    setPlaybackSpeed(speed)
    setShowSettings(false)
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className="relative bg-black rounded-lg overflow-hidden group">
      {/* Video Element - Simulated */}
      <div className="aspect-video relative bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src="/placeholder-video.mp4" // In a real app, this would be the actual video URL
          poster="/api/placeholder/800/450"
          preload="metadata"
        />
        
        {/* Play/Pause Overlay */}
        {!hasStarted && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <Button
              onClick={togglePlay}
              size="lg"
              className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/50 rounded-full w-20 h-20"
            >
              <Play className="w-8 h-8 ml-1" />
            </Button>
          </div>
        )}

        {/* Center Play/Pause for quick access */}
        <div
          className="absolute inset-0 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={togglePlay}
        >
          {isPlaying ? (
            <Pause className="w-12 h-12 text-white bg-black/50 rounded-full p-2" />
          ) : (
            <Play className="w-12 h-12 text-white bg-black/50 rounded-full p-2 ml-1" />
          )}
        </div>
      </div>

      {/* Controls */}
      {showControls && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
          {/* Progress Bar */}
          <div className="mb-4">
            <div
              className="w-full h-2 bg-white/20 rounded-full cursor-pointer"
              onClick={handleSeek}
            >
              <div
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              {/* Play/Pause */}
              <Button
                variant="ghost"
                size="icon"
                onClick={togglePlay}
                className="text-white hover:bg-white/20"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </Button>

              {/* Skip Back/Forward */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => skipTime(-10)}
                className="text-white hover:bg-white/20"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => skipTime(10)}
                className="text-white hover:bg-white/20"
              >
                <RotateCw className="w-4 h-4" />
              </Button>

              {/* Volume */}
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleMute}
                  className="text-white hover:bg-white/20"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </Button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Time */}
              <span className="text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Speed Control */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowSettings(!showSettings)}
                  className="text-white hover:bg-white/20"
                >
                  <Settings className="w-4 h-4" />
                </Button>
                {showSettings && (
                  <div className="absolute bottom-full right-0 mb-2 bg-black/90 rounded-lg p-2 min-w-[100px]">
                    <div className="text-xs font-medium mb-2">Speed</div>
                    {speeds.map((speed) => (
                      <button
                        key={speed}
                        onClick={() => changeSpeed(speed)}
                        className={`block w-full text-left px-2 py-1 text-xs rounded hover:bg-white/20 ${
                          playbackSpeed === speed ? 'bg-white/20' : ''
                        }`}
                      >
                        {speed}x
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Fullscreen */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleFullscreen}
                className="text-white hover:bg-white/20"
              >
                <Maximize className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {!hasStarted && (
        <div className="absolute top-4 left-4 text-white">
          <h3 className="font-semibold">{lessonTitle}</h3>
          <p className="text-sm opacity-75">Click to start learning</p>
        </div>
      )}
    </div>
  )
}

export default VideoPlayer