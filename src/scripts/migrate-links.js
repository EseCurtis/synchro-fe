#!/usr/bin/env node

/**
 * Migration Script: Replace Next.js Link with LinkWithProgress
 * 
 * This script helps migrate remaining Link components to use LinkWithProgress
 * for automatic NProgress integration.
 * 
 * Usage:
 * node src/scripts/migrate-links.js
 * 
 * Features:
 * - Finds all files with Link imports
 * - Shows which files need migration
 * - Provides migration suggestions
 * - Safe to run multiple times
 */

const fs = require('fs');
const path = require('path');

// Configuration
const SRC_DIR = path.join(__dirname, '..');
const PATTERNS = [
  '**/*.tsx',
  '**/*.ts',
  '**/*.jsx',
  '**/*.js'
];

// Files to exclude
const EXCLUDE_PATTERNS = [
  'node_modules/**',
  '.next/**',
  'dist/**',
  'build/**',
  '**/*.d.ts',
  '**/migrate-links.js'
];

function findFiles(dir = SRC_DIR, files = []) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      // Skip excluded directories
      const relativePath = path.relative(SRC_DIR, fullPath);
      const shouldSkip = EXCLUDE_PATTERNS.some(pattern => {
        const regex = new RegExp(pattern.replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*'));
        return regex.test(relativePath);
      });
      
      if (!shouldSkip) {
        findFiles(fullPath, files);
      }
    } else if (stat.isFile()) {
      // Check if file matches our patterns
      const ext = path.extname(item);
      if (['.tsx', '.ts', '.jsx', '.js'].includes(ext)) {
        files.push(fullPath);
      }
    }
  }
  
  return files;
}

function analyzeFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const relativePath = path.relative(SRC_DIR, filePath);
    
    const analysis = {
      file: relativePath,
      hasLinkImport: false,
      hasLinkWithProgressImport: false,
      linkUsages: [],
      needsMigration: false,
      suggestions: []
    };
    
    // Check for Link imports
    const linkImportRegex = /import\s+Link\s+from\s+["']next\/link["']/g;
    const linkWithProgressImportRegex = /import.*LinkWithProgress.*from/g;
    
    analysis.hasLinkImport = linkImportRegex.test(content);
    analysis.hasLinkWithProgressImport = linkWithProgressImportRegex.test(content);
    
    // Find Link usages
    const linkUsageRegex = /<Link\s+[^>]*>/g;
    let match;
    while ((match = linkUsageRegex.exec(content)) !== null) {
      analysis.linkUsages.push({
        line: content.substring(0, match.index).split('\n').length,
        match: match[0]
      });
    }
    
    // Determine if migration is needed
    analysis.needsMigration = analysis.hasLinkImport && analysis.linkUsages.length > 0;
    
    // Generate suggestions
    if (analysis.needsMigration) {
      analysis.suggestions.push(`Replace "import Link from 'next/link'" with "import LinkWithProgress from '../_components/ui/LinkWithProgress'"`);
      analysis.suggestions.push(`Replace all <Link> tags with <LinkWithProgress>`);
      
      if (analysis.hasLinkWithProgressImport) {
        analysis.suggestions.push(`Remove the old Link import since LinkWithProgress is already imported`);
      }
    }
    
    return analysis;
  } catch (error) {
    return {
      file: path.relative(SRC_DIR, filePath),
      error: error.message
    };
  }
}

function generateMigrationReport() {
  console.log('🔍 Analyzing Link components...\n');
  
  const files = findFiles();
  const analyses = files.map(analyzeFile);
  
  const needsMigration = analyses.filter(a => a.needsMigration);
  const alreadyMigrated = analyses.filter(a => a.hasLinkWithProgressImport && !a.needsMigration);
  const errors = analyses.filter(a => a.error);
  
  console.log('📊 Migration Report\n');
  console.log(`Total files analyzed: ${analyses.length}`);
  console.log(`Files needing migration: ${needsMigration.length}`);
  console.log(`Files already migrated: ${alreadyMigrated.length}`);
  console.log(`Files with errors: ${errors.length}\n`);
  
  if (needsMigration.length > 0) {
    console.log('🚨 Files needing migration:\n');
    needsMigration.forEach(analysis => {
      console.log(`📁 ${analysis.file}`);
      console.log(`   Link usages: ${analysis.linkUsages.length}`);
      analysis.suggestions.forEach(suggestion => {
        console.log(`   💡 ${suggestion}`);
      });
      console.log('');
    });
  }
  
  if (alreadyMigrated.length > 0) {
    console.log('✅ Files already migrated:\n');
    alreadyMigrated.forEach(analysis => {
      console.log(`📁 ${analysis.file}`);
    });
    console.log('');
  }
  
  if (errors.length > 0) {
    console.log('❌ Files with errors:\n');
    errors.forEach(analysis => {
      console.log(`📁 ${analysis.file}: ${analysis.error}`);
    });
    console.log('');
  }
  
  // Migration instructions
  console.log('📝 Migration Instructions:\n');
  console.log('1. For each file needing migration:');
  console.log('   - Replace the Link import with LinkWithProgress import');
  console.log('   - Replace all <Link> tags with <LinkWithProgress>');
  console.log('   - Remove any manual NProgress.start() calls (LinkWithProgress handles this automatically)');
  console.log('');
  console.log('2. Example migration:');
  console.log('   Before: import Link from "next/link"');
  console.log('   After:  import LinkWithProgress from "../_components/ui/LinkWithProgress"');
  console.log('');
  console.log('   Before: <Link href="/dashboard">Dashboard</Link>');
  console.log('   After:  <LinkWithProgress href="/dashboard">Dashboard</LinkWithProgress>');
  console.log('');
  console.log('3. LinkWithProgress automatically handles:');
  console.log('   - Starting NProgress on click');
  console.log('   - External links (no progress bar)');
  console.log('   - All Next.js Link props');
  console.log('   - TypeScript support');
}

// Run the analysis
if (require.main === module) {
  generateMigrationReport();
}

module.exports = {
  findFiles,
  analyzeFile,
  generateMigrationReport
};
