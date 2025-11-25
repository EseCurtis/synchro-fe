#!/usr/bin/env node

/**
 * SVG to TSX Icon Migration Script
 * 
 * This script reads SVG files from the sidebar icons directory and generates
 * TSX components with exact same designs including gradients and active states.
 * 
 * Usage:
 * node src/scripts/migrate-svg-icons.js
 */

const fs = require('fs');
const path = require('path');

const ICONS_DIR = path.join(__dirname, '../../public/images/icons/sidebar');
const OUTPUT_FILE = path.join(__dirname, '../app/_components/icons/ExactSidebarIcons.tsx');

// Icon mapping based on the sidebar navigation
const ICON_MAPPING = {
  'home': 'home',
  'user': 'user', 
  'coupon': 'events',
  'venues': 'venues',
  'kyc': 'kyc',
  'user-dollar': 'services',
  'support': 'support',
  'report': 'report',
  'audit': 'audit',
  'faq': 'faq',
  'settings': 'settings'
};

function readSVGFile(filename) {
  const filePath = path.join(ICONS_DIR, filename);
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.warn(`Could not read ${filename}:`, error.message);
    return null;
  }
}

function extractSVGContent(svgContent) {
  if (!svgContent) return null;
  
  // Extract viewBox
  const viewBoxMatch = svgContent.match(/viewBox="([^"]+)"/);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 25';
  
  // Extract all content between <svg> tags
  const contentMatch = svgContent.match(/<svg[^>]*>(.*)<\/svg>/s);
  const content = contentMatch ? contentMatch[1] : '';
  
  return { viewBox, content };
}

function generateIconComponent(iconName, inactiveSVG, activeSVG) {
  const inactive = extractSVGContent(inactiveSVG);
  const active = extractSVGContent(activeSVG);
  
  if (!inactive) {
    console.warn(`No inactive SVG found for ${iconName}`);
    return null;
  }
  
  const componentName = iconName.charAt(0).toUpperCase() + iconName.slice(1) + 'Icon';
  
  return `// ${componentName} - Exact replica from original SVG
export const ${componentName}: React.FC<IconProps> = ({ size = 24, className = "", color = "#718096", isActive = false }) => (
  <svg
    width={size}
    height={size}
    viewBox="${inactive.viewBox}"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {isActive ? (
      <>
        ${active ? active.content.replace(/id="([^"]+)"/g, 'id="$1_' + iconName + '"') : inactive.content}
      </>
    ) : (
      ${inactive.content.replace(/fill="#718096"/g, 'fill={color}')}
    )}
  </svg>
);`;
}

function generateIconMap(iconNames) {
  const mapEntries = iconNames.map(name => `  ${name}: ${name.charAt(0).toUpperCase() + name.slice(1)}Icon`).join(',\n');
  
  return `// Icon mapping for easy access
export const ExactSidebarIconMap = {
${mapEntries}
} as const;

export type ExactSidebarIconType = keyof typeof ExactSidebarIconMap;`;
}

function generateMigrationReport() {
  console.log('🔍 Analyzing SVG icon files...\n');
  
  const files = fs.readdirSync(ICONS_DIR);
  const iconFiles = files.filter(file => file.endsWith('.svg'));
  
  console.log(`Found ${iconFiles.length} SVG files:`);
  iconFiles.forEach(file => console.log(`  - ${file}`));
  
  const iconNames = [];
  const components = [];
  
  // Process each icon
  for (const [fileKey, iconName] of Object.entries(ICON_MAPPING)) {
    const inactiveFile = `${fileKey}.svg`;
    const activeFile = `${fileKey}_active.svg`;
    
    const inactiveSVG = readSVGFile(inactiveFile);
    const activeSVG = readSVGFile(activeFile);
    
    if (inactiveSVG) {
      const component = generateIconComponent(iconName, inactiveSVG, activeSVG);
      if (component) {
        components.push(component);
        iconNames.push(iconName);
        console.log(`✅ Generated component for ${iconName}`);
      }
    } else {
      console.log(`❌ Missing inactive SVG for ${iconName} (${inactiveFile})`);
    }
  }
  
  // Generate the complete file
  const fileContent = `import React from "react";

interface IconProps {
  size?: number;
  className?: string;
  color?: string;
  isActive?: boolean;
}

${components.join('\n\n')}

${generateIconMap(iconNames)}
`;
  
  // Write the file
  try {
    fs.writeFileSync(OUTPUT_FILE, fileContent);
    console.log(`\n✅ Generated ${OUTPUT_FILE}`);
    console.log(`📊 Created ${components.length} icon components`);
  } catch (error) {
    console.error('❌ Error writing file:', error.message);
  }
  
  console.log('\n📝 Next Steps:');
  console.log('1. Review the generated ExactSidebarIcons.tsx file');
  console.log('2. Update SidebarIcon.tsx to use the exact icons');
  console.log('3. Test the icons in the sidebar');
  console.log('4. Remove old SVG files if everything works correctly');
}

// Run the migration
if (require.main === module) {
  generateMigrationReport();
}

module.exports = {
  readSVGFile,
  extractSVGContent,
  generateIconComponent,
  generateMigrationReport
};







