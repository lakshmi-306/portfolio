# Projects Folder

This folder contains the PDF files for your portfolio projects.

## How to Add Your Project PDFs

1. **Add your PDF files** to this `projects` folder with the following names:
   - `ecommerce-mobile-app.pdf` - For the E-Commerce Mobile App project
   - `brand-identity-design.pdf` - For the Brand Identity Design project
   - `web-dashboard-design.pdf` - For the Web Dashboard Design project
   - `marketing-campaign-design.pdf` - For the Marketing Campaign Design project

2. **Or customize the file names** by editing the `projectData` object in `script.js`:
   ```javascript
   const projectData = {
       1: { 
           title: "E-Commerce Mobile App", 
           pdf: "./projects/your-custom-filename.pdf"
       },
       // ... other projects
   };
   ```

## Project Structure

```
projects/
├── README.md (this file)
├── ecommerce-mobile-app.pdf
├── brand-identity-design.pdf
├── web-dashboard-design.pdf
└── marketing-campaign-design.pdf
```

## Features

- **Direct PDF Viewing**: Click "View Project" to open PDFs in a modal viewer
- **New Tab Option**: Click "Open in New Tab" to view PDFs in a separate tab
- **Upload Fallback**: If a PDF file is missing, users can upload one temporarily
- **Error Handling**: Graceful fallback when PDF files are not found

## Notes

- PDF files should be optimized for web viewing
- Recommended file size: Under 10MB for better loading performance
- Supported format: PDF only