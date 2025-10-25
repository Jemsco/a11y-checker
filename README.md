# A11y-Checker

A11y-Checker is a CLI tool to scan HTML files for accessibility issues using the `axe-core` library. It is written in TypeScript and can be used as a command-line tool or integrated into other projects.

## Features

- Scans HTML files for accessibility violations
- Outputs results in a readable format
- Supports JSON output for automated workflows
- Easy to install and run

## Getting Started

### Dependencies

- Node.js v18+ (or compatible version)
- TypeScript
- axe-core
- jsdom
- commander

### Installing

```bash
npm install
```

Clone the repository and build the project:

```bash
git clone <your-repo-url>
cd a11y-checker
npm install
npm run build
```

## Running the Program

Scan a sample HTML file:

```bash
 a11y-checker path/to/your/file.html
```

## Testing

run the tests

```bash
npm run test
```

## Help

Documentation coming soon.

## Authors

Jay Brass

## Version History

- 0.1.1
  - Various bug fixes and optimizations
  - See [commit changes](https://github.com/jemsco/a11y-checker/commits)
  - See [release history](https://github.com/jemsco/a11y-checker/releases)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
