# SkillLink Accessibility & SEO Guidelines

## 📋 Table of Contents

- [Accessibility Overview](#accessibility-overview)
- [WCAG 2.1 Compliance](#wcag-21-compliance)
- [Keyboard Navigation](#keyboard-navigation)
- [Screen Reader Support](#screen-reader-support)
- [Color & Contrast](#color--contrast)
- [SEO Optimization](#seo-optimization)
- [Meta Tags & Open Graph](#meta-tags--open-graph)
- [Structured Data](#structured-data)
- [Performance SEO](#performance-seo)
- [Testing & Validation](#testing--validation)

## ♿ Accessibility Overview

### Current Accessibility Features

**Implemented:**
- Semantic HTML structure
- Basic ARIA labels in navigation
- Theme-aware color system
- Focus management in interactive elements
- Keyboard navigation support

**Areas for Improvement:**
- Enhanced ARIA implementation
- Screen reader optimization
- Better focus management
- Motion preference support

### Accessibility Standards

SkillLink aims to meet **WCAG 2.1 AA** compliance standards:

- **Level A**: Basic accessibility features
- **Level AA**: Standard accessibility (our target)
- **Level AAA**: Enhanced accessibility (aspirational)

## 🎯 WCAG 2.1 Compliance

### Perceivable

#### Text Alternatives
```jsx
// Good: Descriptive alt text
<img 
  src="/course-image.jpg" 
  alt="JavaScript fundamentals course featuring coding examples and interactive exercises"
/>

// Good: Decorative images
<img 
  src="/decoration.svg" 
  alt="" 
  role="presentation"
/>

// Good: Complex images with descriptions
<img 
  src="/chart.png" 
  alt="Sales growth chart showing 25% increase"
  aria-describedby="chart-description"
/>
<div id="chart-description">
  Detailed description of the chart data...
</div>
```

#### Color and Contrast
```css
/* Enhanced contrast ratios */
:root {
  /* WCAG AA compliant colors (4.5:1 ratio minimum) */
  --text-primary: #111827;      /* 16.94:1 on white */
  --text-secondary: #374151;    /* 9.73:1 on white */
  --text-muted: #6b7280;        /* 4.69:1 on white */
}

.dark {
  /* Dark mode with proper contrast */
  --text-primary: #f9fafb;      /* 16.94:1 on dark background */
  --text-secondary: #e5e7eb;    /* 13.54:1 on dark background */
  --text-muted: #d1d5db;        /* 8.89:1 on dark background */
}

/* Focus indicators */
.focus-visible:focus {
  outline: 2px solid hsl(var(--primary));
  outline-offset: 2px;
  box-shadow: 0 0 0 3px hsl(var(--primary) / 0.2);
}
```

#### Adaptable Content
```jsx
// Responsive design with proper scaling
const ResponsiveComponent = () => {
  return (
    <div className="
      text-base sm:text-lg
      p-4 sm:p-6 lg:p-8
      min-h-[44px] /* Minimum touch target size */
    ">
      <h1 className="
        text-2xl sm:text-3xl lg:text-4xl
        font-bold
        mb-4 sm:mb-6
      ">
        Accessible Heading
      </h1>
    </div>
  );
};
```

### Operable

#### Keyboard Navigation
```jsx
// Enhanced keyboard navigation
const NavigationMenu = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const menuItems = useRef([]);

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % menuItems.current.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex((prev) => 
          prev === 0 ? menuItems.current.length - 1 : prev - 1
        );
        break;
      case 'Home':
        e.preventDefault();
        setActiveIndex(0);
        break;
      case 'End':
        e.preventDefault();
        setActiveIndex(menuItems.current.length - 1);
        break;
      case 'Escape':
        // Close menu
        break;
    }
  };

  useEffect(() => {
    menuItems.current[activeIndex]?.focus();
  }, [activeIndex]);

  return (
    <ul
      role="menu"
      onKeyDown={handleKeyDown}
      aria-label="Main navigation"
    >
      {items.map((item, index) => (
        <li key={item.id} role="none">
          <a
            ref={(el) => (menuItems.current[index] = el)}
            role="menuitem"
            href={item.href}
            tabIndex={index === activeIndex ? 0 : -1}
            aria-current={item.active ? 'page' : undefined}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
};
```

#### Focus Management
```jsx
// Modal with proper focus management
const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement;
      modalRef.current?.focus();
    } else {
      previousFocusRef.current?.focus();
    }
  }, [isOpen]);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
    
    // Trap focus within modal
    if (e.key === 'Tab') {
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements?.[0];
      const lastElement = focusableElements?.[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-lg"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
        tabIndex={-1}
        aria-labelledby="modal-title"
      >
        {children}
      </div>
    </div>
  );
};
```

### Understandable

#### Form Labels and Instructions
```jsx
// Accessible form components
const AccessibleForm = () => {
  const [errors, setErrors] = useState({});

  return (
    <form noValidate>
      <div className="form-group">
        <label htmlFor="email" className="required">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          required
          aria-describedby="email-help email-error"
          aria-invalid={errors.email ? 'true' : 'false'}
          className={`form-input ${errors.email ? 'error' : ''}`}
        />
        <div id="email-help" className="help-text">
          We'll use this to send you course updates
        </div>
        {errors.email && (
          <div id="email-error" className="error-text" role="alert">
            {errors.email}
          </div>
        )}
      </div>

      <fieldset>
        <legend>Notification Preferences</legend>
        <div className="checkbox-group">
          <input
            id="email-notifications"
            type="checkbox"
            aria-describedby="email-notifications-desc"
          />
          <label htmlFor="email-notifications">
            Email notifications
          </label>
          <div id="email-notifications-desc" className="help-text">
            Receive updates about new courses and features
          </div>
        </div>
      </fieldset>
    </form>
  );
};
```

#### Error Identification and Suggestions
```jsx
// Error handling component
const ErrorMessage = ({ error, suggestions = [] }) => {
  return (
    <div role="alert" className="error-container">
      <div className="error-icon" aria-hidden="true">⚠️</div>
      <div>
        <p className="error-message">{error}</p>
        {suggestions.length > 0 && (
          <div className="error-suggestions">
            <p>Suggestions:</p>
            <ul>
              {suggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
```

### Robust

#### Screen Reader Support
```jsx
// Screen reader announcements
const LiveRegion = ({ message, priority = 'polite' }) => {
  return (
    <div
      aria-live={priority}
      aria-atomic="true"
      className="sr-only"
    >
      {message}
    </div>
  );
};

// Usage in components
const CourseProgress = ({ progress }) => {
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    if (progress === 100) {
      setAnnouncement('Course completed! Congratulations!');
    } else if (progress % 25 === 0) {
      setAnnouncement(`Course ${progress}% complete`);
    }
  }, [progress]);

  return (
    <div>
      <div
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Course progress"
      >
        {progress}% Complete
      </div>
      <LiveRegion message={announcement} />
    </div>
  );
};
```

## 🎨 Color & Contrast

### Color System Enhancement
```css
/* Enhanced color system with WCAG compliance */
:root {
  /* Primary colors with sufficient contrast */
  --primary-50: #fef7ee;    /* Very light background */
  --primary-500: #f97316;   /* Primary action color */
  --primary-600: #ea580c;   /* Darker primary for better contrast */
  --primary-900: #9a3412;   /* Text on light backgrounds */

  /* Status colors with proper contrast */
  --success-50: #f0fdf4;
  --success-500: #22c55e;
  --success-900: #14532d;

  --error-50: #fef2f2;
  --error-500: #ef4444;
  --error-900: #7f1d1d;

  --warning-50: #fffbeb;
  --warning-500: #f59e0b;
  --warning-900: #78350f;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  :root {
    --primary: #000000;
    --background: #ffffff;
    --text: #000000;
    --border: #000000;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

## 🔍 SEO Optimization

### Enhanced HTML Structure
```html
<!-- index.html - Enhanced meta tags -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <!-- Basic SEO -->
  <title>SkillLink - Professional Learning & Networking Platform</title>
  <meta name="description" content="Connect, learn, and grow with SkillLink. Access professional courses, network with peers, and advance your career through our comprehensive learning platform." />
  <meta name="keywords" content="online learning, professional development, networking, skills training, career advancement, courses" />
  
  <!-- Open Graph -->
  <meta property="og:title" content="SkillLink - Professional Learning & Networking Platform" />
  <meta property="og:description" content="Connect, learn, and grow with SkillLink. Access professional courses and network with peers." />
  <meta property="og:image" content="/og-image.jpg" />
  <meta property="og:url" content="https://skilllink.com" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="SkillLink" />
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="SkillLink - Professional Learning Platform" />
  <meta name="twitter:description" content="Connect, learn, and grow with SkillLink." />
  <meta name="twitter:image" content="/twitter-image.jpg" />
  
  <!-- Additional Meta -->
  <meta name="author" content="SkillLink Team" />
  <meta name="robots" content="index, follow, max-image-preview:large" />
  <link rel="canonical" href="https://skilllink.com" />
  
  <!-- Favicon and Icons -->
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  
  <!-- Preconnect to external domains -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>
```

### Dynamic Meta Tags
```jsx
// hooks/useSEO.js
import { useDocumentTitle } from './useDocumentTitle';

export const useSEO = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website'
}) => {
  useDocumentTitle(title);

  useEffect(() => {
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords);
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    const ogImage = document.querySelector('meta[property="og:image"]');
    const ogUrl = document.querySelector('meta[property="og:url"]');

    if (ogTitle) ogTitle.setAttribute('content', title);
    if (ogDescription) ogDescription.setAttribute('content', description);
    if (ogImage && image) ogImage.setAttribute('content', image);
    if (ogUrl && url) ogUrl.setAttribute('content', url);

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url || window.location.href;
  }, [title, description, keywords, image, url]);
};

// Usage in components
const CoursePage = ({ course }) => {
  useSEO({
    title: `${course.title} - SkillLink`,
    description: course.description,
    keywords: course.tags.join(', '),
    image: course.thumbnail,
    url: `https://skilllink.com/courses/${course.slug}`
  });

  return (
    <div>
      {/* Course content */}
    </div>
  );
};
```

### Structured Data
```jsx
// components/StructuredData.jsx
const StructuredData = ({ data }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data)
      }}
    />
  );
};

// Course structured data
const CourseStructuredData = ({ course }) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": course.title,
    "description": course.description,
    "provider": {
      "@type": "Organization",
      "name": "SkillLink",
      "url": "https://skilllink.com"
    },
    "courseCode": course.code,
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "online",
      "courseWorkload": `PT${course.duration}H`,
      "instructor": {
        "@type": "Person",
        "name": course.instructor.name
      }
    },
    "offers": {
      "@type": "Offer",
      "price": course.price,
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": course.rating,
      "reviewCount": course.reviewCount,
      "bestRating": 5,
      "worstRating": 1
    }
  };

  return <StructuredData data={structuredData} />;
};
```

### SEO-Friendly URLs
```jsx
// utils/slugify.js
export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
};

// URL structure
const urls = {
  course: (slug) => `/courses/${slug}`,
  profile: (username) => `/profile/${username}`,
  topic: (category, slug) => `/learn/${category}/${slug}`,
  search: (query) => `/search?q=${encodeURIComponent(query)}`
};
```

## 🧪 Testing & Validation

### Accessibility Testing Tools

#### Automated Testing
```bash
# Install accessibility testing tools
npm install --save-dev @axe-core/react jest-axe

# Add to test setup
npm install --save-dev @testing-library/jest-dom
```

```jsx
// Testing accessibility
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Button } from '@/components/ui/button';

expect.extend(toHaveNoViolations);

describe('Button Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(<Button>Click me</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

#### Manual Testing Checklist

**Keyboard Navigation:**
- [ ] All interactive elements are keyboard accessible
- [ ] Tab order is logical
- [ ] Focus indicators are visible
- [ ] Escape key closes modals/dropdowns
- [ ] Arrow keys navigate within components

**Screen Reader Testing:**
- [ ] All content is announced correctly
- [ ] ARIA labels provide meaningful descriptions
- [ ] Form errors are announced
- [ ] Status changes are communicated
- [ ] Heading structure is logical

**Visual Testing:**
- [ ] Content is readable at 200% zoom
- [ ] Color contrast meets WCAG AA standards
- [ ] Focus indicators are visible
- [ ] Text doesn't get cut off
- [ ] Images have appropriate alt text

### SEO Testing

#### SEO Audit Script
```bash
#!/bin/bash
# seo-audit.sh

echo "🔍 Running SEO audit..."

# Check meta tags
echo "📋 Checking meta tags..."
grep -r "meta name=\"description\"" public/
grep -r "meta property=\"og:" public/

# Check structured data
echo "📊 Validating structured data..."
curl -s "https://validator.schema.org/" \
  -d "url=http://localhost:3000" \
  -d "format=json"

# Check sitemap
echo "🗺️ Checking sitemap..."
curl -s "http://localhost:3000/sitemap.xml" | xmllint --format -

# Lighthouse SEO audit
echo "🏮 Running Lighthouse SEO audit..."
npx lighthouse http://localhost:3000 \
  --only-categories=seo \
  --output=json \
  --output-path=./audit/seo-audit.json

echo "✅ SEO audit completed!"
```

### Performance Impact on SEO
```javascript
// Core Web Vitals monitoring for SEO
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

const sendToSEOAnalytics = ({ name, value, id }) => {
  // Core Web Vitals affect SEO rankings
  const vitals = {
    CLS: value < 0.1 ? 'good' : value < 0.25 ? 'needs-improvement' : 'poor',
    FID: value < 100 ? 'good' : value < 300 ? 'needs-improvement' : 'poor',
    LCP: value < 2500 ? 'good' : value < 4000 ? 'needs-improvement' : 'poor'
  };

  console.log(`${name}: ${value} (${vitals[name] || 'measured'})`);
  
  // Send to analytics for SEO monitoring
  if (window.gtag) {
    window.gtag('event', 'core_web_vital', {
      metric_name: name,
      metric_value: value,
      metric_rating: vitals[name]
    });
  }
};

// Monitor all Core Web Vitals
getCLS(sendToSEOAnalytics);
getFID(sendToSEOAnalytics);
getLCP(sendToSEOAnalytics);
```

## 📋 Implementation Checklist

### Accessibility Implementation

**Phase 1: Foundation**
- [ ] Enhance semantic HTML structure
- [ ] Add proper ARIA labels and descriptions
- [ ] Implement keyboard navigation
- [ ] Ensure color contrast compliance
- [ ] Add focus management

**Phase 2: Enhancement**
- [ ] Screen reader optimization
- [ ] Form accessibility improvements
- [ ] Error handling enhancement
- [ ] Motion preference support
- [ ] High contrast mode support

**Phase 3: Testing & Validation**
- [ ] Automated accessibility testing
- [ ] Screen reader testing
- [ ] Keyboard navigation testing
- [ ] Color contrast validation
- [ ] WCAG 2.1 AA compliance audit

### SEO Implementation

**Phase 1: Technical SEO**
- [ ] Meta tags optimization
- [ ] Structured data implementation
- [ ] Sitemap generation
- [ ] Robots.txt optimization
- [ ] URL structure improvement

**Phase 2: Content SEO**
- [ ] Heading structure optimization
- [ ] Image alt text enhancement
- [ ] Content optimization
- [ ] Internal linking strategy
- [ ] Social media integration

**Phase 3: Performance SEO**
- [ ] Core Web Vitals optimization
- [ ] Page speed improvements
- [ ] Mobile-first indexing
- [ ] Schema markup validation
- [ ] Analytics implementation

---

*This accessibility and SEO guide ensures SkillLink meets modern web standards for inclusivity and discoverability.*