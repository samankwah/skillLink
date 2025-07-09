# SkillLink Development Guidelines

## 📋 Table of Contents

- [Development Setup](#development-setup)
- [Code Standards](#code-standards)
- [Component Development](#component-development)
- [State Management](#state-management)
- [Styling Guidelines](#styling-guidelines)
- [Performance Best Practices](#performance-best-practices)
- [Testing Guidelines](#testing-guidelines)
- [Git Workflow](#git-workflow)
- [Code Review Process](#code-review-process)

## 🚀 Development Setup

### Prerequisites

- **Node.js**: 18.0.0 or higher
- **npm**: 8.0.0 or higher
- **Git**: Latest version
- **VS Code**: Recommended IDE

### Initial Setup

1. **Clone the repository**
```bash
git clone [repository-url]
cd skillLink
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open browser**
Navigate to `http://localhost:5173`

### Development Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Fix linting errors
npm run lint:fix
```

## 📝 Code Standards

### File Naming Conventions

```
# Components (PascalCase)
Header.jsx
UserProfile.jsx
LoadingSkeleton.jsx

# Hooks (camelCase with 'use' prefix)
useDocumentTitle.js
useLocalStorage.js
useDebounce.js

# Utilities (camelCase)
utils.js
formatDate.js
apiHelpers.js

# Constants (UPPER_SNAKE_CASE)
API_ENDPOINTS.js
THEME_COLORS.js
```

### Import Organization

```jsx
// 1. React imports
import React, { useState, useEffect, memo } from 'react';

// 2. Third-party library imports
import { Link } from 'react-router-dom';
import { Search, Menu } from 'lucide-react';

// 3. Internal component imports
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// 4. Context and hook imports
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';

// 5. Utility imports
import { cn } from '@/lib/utils';
```

### Code Formatting

```jsx
// Use 2 spaces for indentation
const MyComponent = ({ 
  title, 
  description, 
  onClick,
  className 
}) => {
  // Component logic here
  const [isLoading, setIsLoading] = useState(false);
  
  return (
    <div className={cn("base-classes", className)}>
      <h2 className="text-xl font-semibold">
        {title}
      </h2>
      {description && (
        <p className="text-gray-600 mt-2">
          {description}
        </p>
      )}
    </div>
  );
};
```

## 🧩 Component Development

### Component Structure

```jsx
// Component template
import { memo, forwardRef } from 'react';
import { cn } from '@/lib/utils';

// PropTypes interface (if using TypeScript)
interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
}

const Component = memo(forwardRef<HTMLDivElement, ComponentProps>(({
  children,
  className,
  variant = 'default',
  size = 'md',
  disabled = false,
  onClick,
  ...props
}, ref) => {
  // Component logic
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        // Base styles
        "inline-flex items-center justify-center rounded-md font-medium",
        
        // Variant styles
        variant === 'default' && "bg-primary text-primary-foreground",
        variant === 'secondary' && "bg-secondary text-secondary-foreground",
        
        // Size styles
        size === 'sm' && "h-8 px-3 text-sm",
        size === 'md' && "h-10 px-4",
        size === 'lg' && "h-12 px-6 text-lg",
        
        // State styles
        disabled && "opacity-50 cursor-not-allowed",
        
        // Custom className
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {children}
    </div>
  );
}));

Component.displayName = 'Component';

export default Component;
```

### Component Documentation

```jsx
/**
 * Button component with multiple variants and sizes
 * 
 * @param variant - Button style variant ('default' | 'secondary' | 'outline')
 * @param size - Button size ('sm' | 'md' | 'lg')
 * @param disabled - Whether the button is disabled
 * @param onClick - Click handler function
 * @param children - Button content
 * @param className - Additional CSS classes
 * 
 * @example
 * <Button variant="default" size="md" onClick={handleClick}>
 *   Click me
 * </Button>
 */
```

### Custom Hooks

```jsx
// Custom hook template
import { useState, useEffect } from 'react';

export const useCustomHook = (initialValue, options = {}) => {
  const [value, setValue] = useState(initialValue);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Effect logic
  }, []);
  
  const updateValue = (newValue) => {
    setValue(newValue);
  };
  
  return {
    value,
    updateValue,
    loading,
    error
  };
};
```

## 🔄 State Management

### Context Pattern

```jsx
// Context creation
import { createContext, useContext, useReducer } from 'react';

const MyContext = createContext();

// Action types
const ACTION_TYPES = {
  SET_LOADING: 'SET_LOADING',
  SET_DATA: 'SET_DATA',
  SET_ERROR: 'SET_ERROR'
};

// Reducer
const myReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_LOADING:
      return { ...state, loading: action.payload };
    case ACTION_TYPES.SET_DATA:
      return { ...state, data: action.payload, loading: false };
    case ACTION_TYPES.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

// Provider component
export const MyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(myReducer, {
    data: null,
    loading: false,
    error: null
  });
  
  const actions = {
    setLoading: (loading) => dispatch({ type: ACTION_TYPES.SET_LOADING, payload: loading }),
    setData: (data) => dispatch({ type: ACTION_TYPES.SET_DATA, payload: data }),
    setError: (error) => dispatch({ type: ACTION_TYPES.SET_ERROR, payload: error })
  };
  
  return (
    <MyContext.Provider value={{ ...state, ...actions }}>
      {children}
    </MyContext.Provider>
  );
};

// Custom hook
export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within MyProvider');
  }
  return context;
};
```

### Local State Guidelines

```jsx
// Good: Use local state for component-specific data
const MyComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  
  return (
    // Component JSX
  );
};

// Good: Use context for shared state
const MyComponent = () => {
  const { user, updateUser } = useAuth();
  
  return (
    // Component JSX
  );
};
```

## 🎨 Styling Guidelines

### Tailwind CSS Usage

```jsx
// Preferred: Utility classes
<div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
    Card Title
  </h2>
</div>

// Use cn utility for conditional classes
import { cn } from '@/lib/utils';

<button 
  className={cn(
    "px-4 py-2 rounded-md font-medium transition-colors",
    variant === 'primary' && "bg-blue-500 text-white hover:bg-blue-600",
    variant === 'secondary' && "bg-gray-200 text-gray-900 hover:bg-gray-300",
    disabled && "opacity-50 cursor-not-allowed"
  )}
>
  Button
</button>
```

### Custom CSS Guidelines

```css
/* Use CSS custom properties for themes */
.my-component {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
  border: 1px solid hsl(var(--border));
}

/* Use logical properties */
.content {
  margin-inline-start: 1rem;
  padding-block: 2rem;
}

/* Mobile-first responsive design */
.responsive-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 768px) {
  .responsive-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .responsive-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### Animation Guidelines

```css
/* Use CSS custom properties for consistent animations */
.fade-in {
  animation: fadeIn var(--animation-duration, 300ms) ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Respect user preferences */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## ⚡ Performance Best Practices

### Component Optimization

```jsx
// Use React.memo for expensive components
const ExpensiveComponent = memo(({ data, onUpdate }) => {
  return (
    <div>
      {/* Complex rendering logic */}
    </div>
  );
});

// Use useMemo for expensive calculations
const MyComponent = ({ items }) => {
  const expensiveValue = useMemo(() => {
    return items.reduce((acc, item) => acc + item.value, 0);
  }, [items]);
  
  return <div>{expensiveValue}</div>;
};

// Use useCallback for event handlers
const MyComponent = ({ onSubmit }) => {
  const handleSubmit = useCallback((data) => {
    onSubmit(data);
  }, [onSubmit]);
  
  return <form onSubmit={handleSubmit} />;
};
```

### Lazy Loading

```jsx
// Lazy load components
import { lazy, Suspense } from 'react';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';

const LazyComponent = lazy(() => import('./LazyComponent'));

const MyComponent = () => {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <LazyComponent />
    </Suspense>
  );
};
```

### Image Optimization

```jsx
// Optimized image component
const OptimizedImage = ({ src, alt, className, ...props }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      {...props}
    />
  );
};
```

## 🧪 Testing Guidelines

### Component Testing

```jsx
// Test file structure
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/ui/button';

describe('Button Component', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });
  
  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

### Hook Testing

```jsx
import { renderHook, act } from '@testing-library/react';
import { useCounter } from '@/hooks/useCounter';

describe('useCounter Hook', () => {
  it('initializes with correct value', () => {
    const { result } = renderHook(() => useCounter(0));
    expect(result.current.count).toBe(0);
  });
  
  it('increments counter', () => {
    const { result } = renderHook(() => useCounter(0));
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(1);
  });
});
```

## 🔀 Git Workflow

### Branch Naming

```bash
# Feature branches
feature/user-authentication
feature/dashboard-redesign

# Bug fix branches
bugfix/login-validation
bugfix/mobile-responsive-header

# Hotfix branches
hotfix/security-patch
hotfix/critical-bug-fix
```

### Commit Messages

```bash
# Format: type(scope): description

# Types: feat, fix, docs, style, refactor, test, chore

# Examples:
feat(auth): add user authentication system
fix(header): resolve mobile navigation issues
docs(components): update Button component documentation
style(theme): improve dark mode color contrast
refactor(utils): optimize date formatting functions
test(hooks): add tests for useLocalStorage hook
chore(deps): update React to version 18.2.0
```

### Pull Request Process

1. **Create feature branch**
```bash
git checkout -b feature/new-feature
```

2. **Make changes and commit**
```bash
git add .
git commit -m "feat(component): add new feature"
```

3. **Push branch**
```bash
git push origin feature/new-feature
```

4. **Create pull request**
   - Use descriptive title
   - Include detailed description
   - Add screenshots for UI changes
   - Request appropriate reviewers

## 🔍 Code Review Process

### Review Checklist

**Functionality**
- [ ] Code works as expected
- [ ] Edge cases are handled
- [ ] Error handling is implemented
- [ ] Performance considerations addressed

**Code Quality**
- [ ] Code follows style guidelines
- [ ] Components are properly structured
- [ ] Naming conventions followed
- [ ] No code duplication

**UI/UX**
- [ ] Responsive design implemented
- [ ] Accessibility features included
- [ ] Theme support added
- [ ] Loading states implemented

**Testing**
- [ ] Tests added for new functionality
- [ ] Existing tests still pass
- [ ] Edge cases covered
- [ ] Manual testing completed

### Review Comments

```javascript
// Good review comment
// Consider using useMemo here to optimize performance:
// const expensiveValue = useMemo(() => computation(), [deps]);

// Good review comment
// This component could benefit from error boundary:
// <ErrorBoundary><Component /></ErrorBoundary>

// Constructive feedback
// The loading state could be improved with a skeleton loader
// instead of a simple spinner for better UX.
```

## 📚 Resources

### Documentation
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/)

### Tools
- [React DevTools](https://react.dev/learn/react-developer-tools)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [ES7+ React/Redux/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)

### Code Quality
- [ESLint Rules](https://eslint.org/docs/rules/)
- [Prettier Configuration](https://prettier.io/docs/en/configuration.html)

---

*These development guidelines ensure consistent, maintainable, and high-quality code across the SkillLink project.*