# Images Folder

This folder contains the project images for your portfolio.

## How to Add Your Project Images

1. **Add your image files** to this `images` folder with the following names:
   - `project1.jpg` - For the E-Commerce Mobile App project
   - `project2.jpg` - For the Brand Identity Design project

2. **Supported formats**: JPG, PNG, WebP, SVG
   - Recommended: JPG or PNG for best compatibility
   - Optimal size: 800x600px or 16:9 aspect ratio
   - File size: Under 2MB for faster loading

3. **Or customize the image names** by editing the `data-image` attribute in `index.html`:
   ```html
   <div class="project-card" data-image="./images/your-custom-image.jpg">
   ```

## Current Image Setup

```
images/
├── README.md (this file)
├── project1.jpg  ← E-Commerce Mobile App image
└── project2.jpg  ← Brand Identity Design image
```

## Features

- **Automatic Fallback**: If image fails to load, shows SVG placeholder
- **Hover Effects**: Images scale slightly on hover for better interaction
- **Responsive**: Images adapt to different screen sizes
- **Optimized**: Images are cropped to fit the project card perfectly

## Image Guidelines

### **Recommended Specifications:**
- **Dimensions**: 800x600px (4:3 ratio) or 1200x675px (16:9 ratio)
- **Format**: JPG (for photos) or PNG (for graphics with transparency)
- **Quality**: 80-90% compression for optimal balance
- **File Size**: 500KB - 2MB maximum

### **Content Tips:**
- Show your actual design work
- Use high-quality screenshots or mockups
- Ensure good contrast and readability
- Consider showing multiple screens/views in one image

### **Example Image Names:**
- `project1.jpg` - Main project screenshot
- `project2.jpg` - Brand identity showcase
- `ecommerce-app.png` - Custom naming (update HTML accordingly)
- `brand-design.jpg` - Custom naming (update HTML accordingly)

## Notes

- Images are automatically resized to fit the project card
- The system gracefully falls back to SVG icons if images are missing
- You can use online images by changing the path to a URL
- For best performance, optimize images before uploading