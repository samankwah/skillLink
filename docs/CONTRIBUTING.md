# Contributing to SkillLink

We welcome contributions to SkillLink! This document provides guidelines for contributing to the project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Contributing Guidelines](#contributing-guidelines)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Issue Reporting](#issue-reporting)
- [Feature Requests](#feature-requests)

## 🤝 Code of Conduct

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Standards

Examples of behavior that contributes to creating a positive environment include:

- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm 8.0.0 or higher
- Git
- Basic knowledge of React and JavaScript

### Development Setup

1. **Fork the repository**
   ```bash
   # Fork the repo on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/skilllink.git
   cd skilllink
   ```

2. **Set up upstream remote**
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/skilllink.git
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Verify setup**
   - Open `http://localhost:5173`
   - Ensure the application loads correctly
   - Run tests: `npm test`

## 🛠️ Contributing Guidelines

### Types of Contributions

We welcome various types of contributions:

1. **Bug Fixes**: Fix existing issues
2. **Feature Development**: Add new functionality
3. **Documentation**: Improve or add documentation
4. **Testing**: Add or improve tests
5. **Performance**: Optimize existing code
6. **Accessibility**: Improve accessibility features
7. **Design**: UI/UX improvements

### Contribution Workflow

1. **Find an issue** or create a new one
2. **Discuss** the proposed changes (for large features)
3. **Fork** the repository
4. **Create** a feature branch
5. **Develop** your changes
6. **Test** thoroughly
7. **Submit** a pull request

## 🔄 Pull Request Process

### Before You Start

1. **Check existing issues** to avoid duplicate work
2. **Create an issue** for new features or significant changes
3. **Discuss** your approach with maintainers

### Creating a Pull Request

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b bugfix/issue-description
   ```

2. **Make your changes**
   - Follow coding standards
   - Add tests for new functionality
   - Update documentation as needed

3. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat(component): add new feature description"
   ```

4. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create pull request**
   - Use a descriptive title
   - Provide detailed description
   - Link related issues
   - Add screenshots for UI changes

### Pull Request Template

```markdown
## Description
Brief description of the changes made.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## How Has This Been Tested?
Describe the tests that you ran to verify your changes.

## Screenshots (if applicable)
Add screenshots to help explain your changes.

## Checklist
- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
```

### Review Process

1. **Automated checks** must pass
2. **Code review** by maintainers
3. **Address feedback** if requested
4. **Final approval** and merge

## 📝 Coding Standards

### JavaScript/React Standards

```jsx
// Use functional components with hooks
const MyComponent = ({ title, onClick }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleClick = useCallback(() => {
    setIsLoading(true);
    onClick();
  }, [onClick]);
  
  return (
    <button 
      onClick={handleClick}
      disabled={isLoading}
      className="btn btn-primary"
    >
      {isLoading ? 'Loading...' : title}
    </button>
  );
};
```

### File Naming Conventions

- **Components**: PascalCase (`UserProfile.jsx`)
- **Hooks**: camelCase with 'use' prefix (`useLocalStorage.js`)
- **Utilities**: camelCase (`formatDate.js`)
- **Constants**: UPPER_SNAKE_CASE (`API_ENDPOINTS.js`)

### Code Organization

```
src/
├── components/
│   ├── common/          # Shared components
│   ├── forms/           # Form components
│   ├── layout/          # Layout components
│   └── ui/              # UI primitives
├── context/             # React contexts
├── hooks/               # Custom hooks
├── lib/                 # Utilities
├── pages/               # Page components
└── styles/              # CSS files
```

### CSS/Styling Standards

```jsx
// Use Tailwind classes with conditional logic
import { cn } from '@/lib/utils';

const Button = ({ variant, size, className, ...props }) => {
  return (
    <button
      className={cn(
        // Base styles
        "inline-flex items-center justify-center rounded-md font-medium transition-colors",
        
        // Variants
        variant === "default" && "bg-primary text-primary-foreground hover:bg-primary/90",
        variant === "outline" && "border border-input hover:bg-accent hover:text-accent-foreground",
        
        // Sizes
        size === "sm" && "h-8 px-3 text-xs",
        size === "lg" && "h-12 px-8",
        
        className
      )}
      {...props}
    />
  );
};
```

### Testing Standards

```jsx
// Component testing
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });
  
  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  it('is accessible', async () => {
    const { container } = render(<Button>Click me</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

### Documentation Standards

```jsx
/**
 * Button component with multiple variants and sizes
 * 
 * @param {string} variant - Button style variant
 * @param {string} size - Button size
 * @param {boolean} disabled - Whether button is disabled
 * @param {function} onClick - Click handler
 * @param {ReactNode} children - Button content
 * 
 * @example
 * <Button variant="primary" size="lg" onClick={handleClick}>
 *   Submit Form
 * </Button>
 */
```

## 🐛 Issue Reporting

### Bug Reports

When reporting bugs, please include:

1. **Clear title** describing the issue
2. **Steps to reproduce** the bug
3. **Expected behavior**
4. **Actual behavior**
5. **Screenshots** (if applicable)
6. **Environment information**:
   - Browser and version
   - Operating system
   - Node.js version
   - SkillLink version

### Bug Report Template

```markdown
## Bug Description
A clear and concise description of what the bug is.

## Steps to Reproduce
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

## Expected Behavior
A clear and concise description of what you expected to happen.

## Actual Behavior
A clear and concise description of what actually happened.

## Screenshots
If applicable, add screenshots to help explain your problem.

## Environment
- Browser: [e.g. Chrome 91.0]
- OS: [e.g. macOS 11.4]
- Node.js: [e.g. 18.16.0]
- SkillLink Version: [e.g. 1.0.0]

## Additional Context
Add any other context about the problem here.
```

## ✨ Feature Requests

### Feature Request Process

1. **Check existing issues** for similar requests
2. **Create detailed issue** with feature description
3. **Discuss** with maintainers and community
4. **Wait for approval** before starting development

### Feature Request Template

```markdown
## Feature Description
A clear and concise description of the feature you'd like to see.

## Problem Statement
What problem does this feature solve?

## Proposed Solution
Describe your proposed solution.

## Alternatives Considered
Describe alternative solutions you've considered.

## Use Cases
Provide specific use cases for this feature.

## Implementation Ideas
If you have ideas about implementation, share them here.

## Additional Context
Add any other context, mockups, or examples.
```

## 🏆 Recognition

We appreciate all contributions and will recognize contributors in:

- Release notes
- Contributors section in README
- Special mentions for significant contributions

### Types of Recognition

- **Code Contributors**: Direct code contributions
- **Bug Reporters**: High-quality bug reports
- **Feature Requesters**: Valuable feature suggestions
- **Documentation Contributors**: Documentation improvements
- **Community Helpers**: Helping other contributors

## 📞 Getting Help

### Communication Channels

- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: General questions and discussions
- **Discord**: Real-time chat (if available)
- **Email**: Direct contact for sensitive issues

### Questions and Support

- Check existing documentation first
- Search closed issues for solutions
- Ask questions in GitHub Discussions
- Be patient and respectful when asking for help

## 🚀 Release Process

### Release Schedule

- **Major releases**: Quarterly
- **Minor releases**: Monthly
- **Patch releases**: As needed for critical bugs

### Version Numbering

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

---

Thank you for contributing to SkillLink! Your efforts help make this platform better for everyone. 🎉