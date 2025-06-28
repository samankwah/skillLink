import { memo } from 'react'

const LoadingSkeleton = memo(({ 
  width = 'w-full', 
  height = 'h-4', 
  className = '',
  variant = 'default',
  count = 1,
  space = 'space-y-2'
}) => {
  const baseClasses = 'animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded-md'
  
  const variants = {
    default: '',
    circular: 'rounded-full',
    card: 'rounded-lg',
    text: 'rounded-sm'
  }

  const skeletonClass = `${baseClasses} ${variants[variant]} ${width} ${height} ${className}`

  if (count === 1) {
    return <div className={skeletonClass} />
  }

  return (
    <div className={space}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={skeletonClass} />
      ))}
    </div>
  )
})

LoadingSkeleton.displayName = 'LoadingSkeleton'

// Pre-built skeleton components
export const CardSkeleton = memo(() => (
  <div className="border border-gray-200 rounded-lg p-6 space-y-4">
    <div className="flex items-center space-x-4">
      <LoadingSkeleton variant="circular" width="w-12" height="h-12" />
      <div className="space-y-2 flex-1">
        <LoadingSkeleton width="w-3/4" height="h-4" />
        <LoadingSkeleton width="w-1/2" height="h-3" />
      </div>
    </div>
    <LoadingSkeleton count={3} height="h-3" />
    <div className="flex justify-between items-center">
      <LoadingSkeleton width="w-20" height="h-6" />
      <LoadingSkeleton width="w-24" height="h-8" />
    </div>
  </div>
))

CardSkeleton.displayName = 'CardSkeleton'

export const CourseCardSkeleton = memo(() => (
  <div className="border border-gray-200 rounded-lg overflow-hidden">
    <LoadingSkeleton width="w-full" height="h-48" className="rounded-none" />
    <div className="p-6 space-y-4">
      <div className="flex items-center space-x-2">
        <LoadingSkeleton width="w-16" height="h-6" variant="card" />
        <LoadingSkeleton width="w-20" height="h-6" variant="card" />
      </div>
      <LoadingSkeleton width="w-full" height="h-6" />
      <LoadingSkeleton count={2} height="h-4" />
      <div className="flex items-center justify-between">
        <LoadingSkeleton width="w-24" height="h-8" />
        <LoadingSkeleton width="w-20" height="h-8" />
      </div>
    </div>
  </div>
))

CourseCardSkeleton.displayName = 'CourseCardSkeleton'

export const ProfileSkeleton = memo(() => (
  <div className="flex items-center space-x-4">
    <LoadingSkeleton variant="circular" width="w-16" height="h-16" />
    <div className="space-y-2 flex-1">
      <LoadingSkeleton width="w-40" height="h-5" />
      <LoadingSkeleton width="w-32" height="h-4" />
      <LoadingSkeleton width="w-24" height="h-3" />
    </div>
  </div>
))

ProfileSkeleton.displayName = 'ProfileSkeleton'

export default LoadingSkeleton