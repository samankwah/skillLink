# SkillLink Component Documentation

## 📋 Table of Contents

- [Component Overview](#component-overview)
- [Layout Components](#layout-components)
- [UI Components](#ui-components)
- [Common Components](#common-components)
- [Form Components](#form-components)
- [Usage Examples](#usage-examples)
- [Component API Reference](#component-api-reference)

## 🎯 Component Overview

SkillLink uses a modular component architecture with four main categories:

- **Layout Components**: Structure and navigation
- **UI Components**: Reusable interface elements
- **Common Components**: Shared utility components
- **Form Components**: Input and form handling

## 🏗️ Layout Components

### Header (`/components/layout/Header.jsx`)

The main navigation header with responsive design and theme support.

**Features:**
- Responsive mobile/desktop layouts
- Integrated search functionality
- Theme toggle and notifications
- Profile dropdown integration

**Props:**
```jsx
interface HeaderProps {
  onMenuClick?: () => void;
}
```

**Usage:**
```jsx
import Header from '@/components/layout/Header';

<Header onMenuClick={() => setSidebarOpen(true)} />
```

### Sidebar (`/components/layout/Sidebar.jsx`)

Navigation sidebar with route highlighting and responsive behavior.

**Features:**
- Route-based active states
- Responsive collapse/expand
- Theme-aware styling
- Smooth animations

### Layout (`/components/layout/Layout.jsx`)

Main layout wrapper for authenticated pages.

**Features:**
- Header and sidebar integration
- Responsive content area
- Protected route handling
- Theme context provision

### PublicLayout (`/components/layout/PublicLayout.jsx`)

Layout wrapper for public pages (landing, login, register).

**Features:**
- Public header and footer
- Marketing-focused design
- SEO optimization
- Responsive structure

## 🎨 UI Components

### Button (`/components/ui/button.jsx`)

Versatile button component with multiple variants and sizes.

**Variants:**
- `default` - Primary button style
- `secondary` - Secondary button style
- `outline` - Outlined button
- `ghost` - Transparent button
- `destructive` - Danger/error button

**Sizes:**
- `sm` - Small button
- `md` - Medium button (default)
- `lg` - Large button
- `icon` - Icon-only button

**Usage:**
```jsx
import { Button } from '@/components/ui/button';

<Button variant="default" size="md" onClick={handleClick}>
  Click me
</Button>
```

### Card (`/components/ui/card.jsx`)

Flexible card component for content containers.

**Components:**
- `Card` - Main container
- `CardHeader` - Header section
- `CardTitle` - Title text
- `CardDescription` - Description text
- `CardContent` - Main content area
- `CardFooter` - Footer section

**Usage:**
```jsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Card content goes here.</p>
  </CardContent>
</Card>
```

### Input (`/components/ui/input.jsx`)

Styled input component with consistent theming.

**Features:**
- Theme-aware styling
- Focus states
- Error states
- Accessibility support

**Usage:**
```jsx
import { Input } from '@/components/ui/input';

<Input 
  type="text" 
  placeholder="Enter text..." 
  value={value}
  onChange={handleChange}
/>
```

### LoadingSkeleton (`/components/ui/LoadingSkeleton.jsx`)

Animated loading skeleton for better UX during data fetching.

**Features:**
- Multiple variants (default, circular, card, text)
- Configurable dimensions
- Smooth animations
- Pre-built skeleton components

**Pre-built Components:**
- `CardSkeleton` - Card loading state
- `CourseCardSkeleton` - Course card loading
- `ProfileSkeleton` - Profile loading state

**Usage:**
```jsx
import LoadingSkeleton, { CardSkeleton } from '@/components/ui/LoadingSkeleton';

// Basic skeleton
<LoadingSkeleton width="w-full" height="h-4" count={3} />

// Pre-built skeleton
<CardSkeleton />
```

### FadeInSection (`/components/ui/FadeInSection.jsx`)

Intersection Observer-based animation component for scroll-triggered effects.

**Features:**
- Multiple animation directions (up, down, left, right)
- Configurable delay and duration
- Threshold customization
- Once or repeat animations

**Props:**
```jsx
interface FadeInSectionProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  threshold?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  className?: string;
  once?: boolean;
}
```

**Usage:**
```jsx
import FadeInSection from '@/components/ui/FadeInSection';

<FadeInSection direction="up" delay={200} duration={600}>
  <div>Content that fades in</div>
</FadeInSection>
```

### HeroCarousel (`/components/ui/HeroCarousel.jsx`)

Hero section carousel for landing pages.

**Features:**
- Auto-play functionality
- Touch/swipe support
- Indicator dots
- Smooth transitions

### AnimatedCounter (`/components/ui/AnimatedCounter.jsx`)

Animated number counter for statistics and metrics.

**Features:**
- Smooth number transitions
- Configurable duration
- Format customization
- Intersection Observer trigger

### ErrorBoundary (`/components/ui/ErrorBoundary.jsx`)

Error boundary component for graceful error handling.

**Features:**
- Error state UI
- Retry functionality
- Error logging
- User-friendly messages

**Usage:**
```jsx
import ErrorBoundary from '@/components/ui/ErrorBoundary';

<ErrorBoundary>
  <ComponentThatMightError />
</ErrorBoundary>
```

## 🔧 Common Components

### ThemeToggle (`/components/common/ThemeToggle.jsx`)

Theme switching component with smooth transitions.

**Features:**
- Light/dark mode toggle
- System preference detection
- Smooth transitions
- Icon animations

**Usage:**
```jsx
import ThemeToggle from '@/components/common/ThemeToggle';

<ThemeToggle />
```

### NotificationBell (`/components/common/NotificationBell.jsx`)

Notification indicator with badge count.

**Features:**
- Unread count badge
- Click handling
- Theme-aware styling
- Accessibility support

### ProfileDropdown (`/components/common/ProfileDropdown.jsx`)

User profile dropdown menu.

**Features:**
- User avatar display
- Menu items
- Logout functionality
- Responsive design

### ProtectedRoute (`/components/common/ProtectedRoute.jsx`)

Route protection wrapper for authenticated pages.

**Features:**
- Authentication check
- Loading states
- Redirect handling
- Error boundaries

**Usage:**
```jsx
import ProtectedRoute from '@/components/common/ProtectedRoute';

<ProtectedRoute>
  <DashboardPage />
</ProtectedRoute>
```

### QuizPlayer (`/components/common/QuizPlayer.jsx`)

Interactive quiz component for learning modules.

**Features:**
- Question navigation
- Answer selection
- Progress tracking
- Results display

### VideoPlayer (`/components/common/VideoPlayer.jsx`)

Custom video player component.

**Features:**
- Custom controls
- Responsive design
- Keyboard shortcuts
- Progress tracking

## 📝 Form Components

### ExperienceForm (`/components/forms/ExperienceForm.jsx`)

Form for adding/editing work experience.

**Features:**
- Multi-step form
- Validation
- Date handling
- Rich text editing

### SkillForm (`/components/forms/SkillForm.jsx`)

Form for skill assessment and management.

**Features:**
- Skill selection
- Proficiency levels
- Category organization
- Validation

## 🎯 Usage Examples

### Creating a New Page

```jsx
// pages/NewPage.jsx
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import FadeInSection from '@/components/ui/FadeInSection';

const NewPage = () => {
  useDocumentTitle('New Page - SkillLink');
  
  return (
    <div className="container mx-auto px-4 py-8">
      <FadeInSection>
        <Card>
          <CardHeader>
            <CardTitle>New Page</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Page content goes here.</p>
            <Button variant="default" className="mt-4">
              Action Button
            </Button>
          </CardContent>
        </Card>
      </FadeInSection>
    </div>
  );
};

export default NewPage;
```

### Using Context

```jsx
// Using authentication context
import { useAuth } from '@/context/AuthContext';

const MyComponent = () => {
  const { user, login, logout, loading } = useAuth();
  
  if (loading) return <LoadingSkeleton />;
  
  return (
    <div>
      {user ? (
        <p>Welcome, {user.name}!</p>
      ) : (
        <Button onClick={() => login()}>Login</Button>
      )}
    </div>
  );
};
```

### Creating Loading States

```jsx
// Using loading skeleton
import LoadingSkeleton, { CardSkeleton } from '@/components/ui/LoadingSkeleton';

const MyComponent = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <CardSkeleton key={index} />
        ))}
      </div>
    );
  }
  
  return (
    <div>
      {/* Actual content */}
    </div>
  );
};
```

## 📚 Component API Reference

### Common Props

Most components accept these common props:

```jsx
interface CommonProps {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  id?: string;
  'data-testid'?: string;
}
```

### Theme-Aware Components

Components that respond to theme changes:

```jsx
// Theme context usage
import { useTheme } from '@/context/ThemeContext';

const MyComponent = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className={`my-component ${theme === 'dark' ? 'dark-variant' : 'light-variant'}`}>
      {/* Component content */}
    </div>
  );
};
```

### Accessibility Props

Components support accessibility props:

```jsx
interface AccessibilityProps {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  role?: string;
  tabIndex?: number;
}
```

### Animation Props

Components with animation support:

```jsx
interface AnimationProps {
  animate?: boolean;
  duration?: number;
  delay?: number;
  easing?: string;
}
```

## 🔄 State Management in Components

### Using Context

```jsx
// Component with context
import { useNotification } from '@/context/NotificationContext';

const MyComponent = () => {
  const { addNotification } = useNotification();
  
  const handleSuccess = () => {
    addNotification({
      type: 'success',
      message: 'Action completed successfully!',
      duration: 3000
    });
  };
  
  return <Button onClick={handleSuccess}>Complete Action</Button>;
};
```

### Local State Management

```jsx
// Component with local state
import { useState, useEffect } from 'react';

const MyComponent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetchData()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);
  
  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorBoundary />;
  
  return <div>{/* Component content */}</div>;
};
```

## 🎨 Styling Guidelines

### CSS Classes

```jsx
// Using Tailwind classes
<div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
    Component Title
  </h2>
</div>
```

### Custom Styling

```jsx
// Using utility classes
import { cn } from '@/lib/utils';

const MyComponent = ({ className, ...props }) => {
  return (
    <div 
      className={cn(
        "default-classes",
        "responsive-classes",
        className
      )}
      {...props}
    >
      {/* Component content */}
    </div>
  );
};
```

## 🧪 Testing Components

### Component Testing

```jsx
// Example test structure
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/button';

describe('Button Component', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
  
  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    screen.getByRole('button').click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

---

*This component documentation provides comprehensive information about the SkillLink component library and usage patterns.*