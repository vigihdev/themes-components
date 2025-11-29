# @vigihdev/themes-components

A utility package for managing Bootstrap theme imports and COMPONENTS in your project.

## 📦 Installation

```bash
npm install @vigihdev/themes-components
```

## ⚙️ Configuration

Create a `.env.path` file in your project root with the following configuration:

```env
BASEPATH_THEMES_COMPONENTS=.
NODE_MODULES_THEMES_COMPONENTS=node_modules
ASSETS_THEMES_COMPONENTS=src/assets
BOOTSTRAP_IMPORT_THEMES_COMPONENTS=src/assets/bootstrap--import
BOOTSTRAP4_IMPORT=../bootstrap4/node_modules/bootstrap/scss
```

### Environment Variables Explanation

- `BASEPATH_THEMES_COMPONENTS`: Base path for themes COMPONENTS
- `NODE_MODULES_THEMES_COMPONENTS`: Node modules directory path
- `ASSETS_THEMES_COMPONENTS`: Assets directory path
- `BOOTSTRAP_IMPORT_THEMES_COMPONENTS`: Output directory for Bootstrap imports
- `BOOTSTRAP4_IMPORT`: Source Bootstrap 4 SCSS files path

## 🚀 Usage

### Available Commands

```bash
# Generate Bootstrap theme imports
npm run build:theme-imports
```

### Package.json Scripts Setup

Add this to your `package.json` scripts:

```json
{
  "scripts": {
    "build:theme-imports": "themes-components build:theme-imports"
  }
}
```

## 📁 Generated Structure

After running the build command, the package will generate:

```
src/assets/bootstrap--import/
└── _index.scss          # Main import file for Bootstrap COMPONENTS
```

The `_index.scss` file contains imports for:

- Bootstrap mixins
- Bootstrap functions
- Bootstrap variables

## 🔧 API

### ThemeImport.build()

Generates the Bootstrap theme import files based on your configuration.

```javascript
const { ThemeImport } = require("@vigihdev/themes-components");

// Generate theme imports
ThemeImport.build();
```

## 📝 Example

### Basic Usage

1. Install the package:

```bash
npm install @vigihdev/themes-components
```

2. Create `.env.path` file in your project root

3. Add script to package.json:

```json
{
  "scripts": {
    "build:theme-imports": "themes-components build:theme-imports"
  }
}
```

4. Run the command:

```bash
npm run build:theme-imports
```

## 🛠️ Development

### Building from Source

```bash
# Clone the repository
git clone https://github.com/vigihdev/themes-components.git

# Install dependencies
npm install

# Build the project
npm run build
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

If you have any questions or issues, please open an issue on [GitHub](https://github.com/vigihdev/themes-components).

---

**Maintained by [Vigih Sentosa](https://github.com/vigihdev)**
