import { Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { createHtmlReport } from 'axe-html-reporter';
import * as fs from 'fs';
import * as path from 'path';
import type { AxeResults } from 'axe-core';

type ReportMeta = {
  scenario: string;
  tags: string[];
  browserName: string;
  passed: boolean;
};

export async function runAccessibilityCheck(page: Page): Promise<AxeResults> {
  return await new AxeBuilder({ page }).analyze();
}

export async function saveAccessibilityReport(
  results: AxeResults,
  reportFileName: string,
  metadata: ReportMeta
) {
  const reportDir = 'accessibility-reports';
  const reportDirAbsolute = path.resolve(process.cwd(), reportDir);
  const reportPath = path.join(reportDirAbsolute, reportFileName);
  const indexPath = path.join(reportDirAbsolute, 'index.html');

  fs.mkdirSync(reportDirAbsolute, { recursive: true });

  const originalCwd = process.cwd();
  process.chdir(reportDirAbsolute);

  createHtmlReport({
    results,
    options: {
      projectKey: 'playwright-bdd-example',
      outputDir: '.',
      reportFileName,
    },
  });

  process.chdir(originalCwd);

  // ✅ Confirm that report was actually created
  if (!fs.existsSync(reportPath)) {
    console.warn(`🚨 Report not found at expected path: ${reportPath}`);
    return;
  }

  const now = new Date();
  const iso = now.toISOString();
  const date = iso.split('T')[0];
  const time = iso.split('T')[1].replace('Z', '');
  const statusColor = metadata.passed ? 'green' : 'red';
  const badge = `<span style="background:${statusColor};color:white;padding:2px 6px;border-radius:4px;font-size:0.8em;">${metadata.passed ? 'PASS' : 'FAIL'}</span>`;

  const linkHTML = `
    <li data-timestamp="${iso}">
      ${badge} <strong>${time}</strong><br/>
      <em>Scenario:</em> ${metadata.scenario}<br/>
      <em>Tags:</em> ${metadata.tags.join(', ') || 'None'}<br/>
      <em>Browser:</em> ${metadata.browserName}<br/>
      <a href="${reportFileName}" target="_blank">${reportFileName}</a>
    </li>`;

  // Generate index.html if missing
  if (!fs.existsSync(indexPath)) {
    const baseHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>Accessibility Summary Report</title>
        <style>
          body { font-family: sans-serif; margin: 2rem; }
          .group-title { margin-top: 2rem; color: #222; font-size: 1.4em; border-bottom: 1px solid #ccc; }
          ul { padding-left: 1rem; list-style-type: disc; }
          li { margin-bottom: 1.2rem; }
          a { text-decoration: none; color: #007acc; }
          a:hover { text-decoration: underline; }
        </style>
      </head>
      <body>
        <h1>Accessibility Summary Report</h1>
        <ul id="report-list">
        </ul>
        <script>
          const ul = document.getElementById("report-list");
          const lis = Array.from(ul.children);
          lis.sort((a, b) => new Date(b.dataset.timestamp) - new Date(a.dataset.timestamp));
          lis.forEach(li => ul.appendChild(li));
        </script>
      </body>
      </html>
    `.trim();
    fs.writeFileSync(indexPath, baseHtml);
  }

  const indexHTML = fs.readFileSync(indexPath, 'utf8');
  const updatedHTML = indexHTML.replace('</ul>', `${linkHTML}\n</ul>`);
  fs.writeFileSync(indexPath, updatedHTML);

  console.log(`${metadata.passed ? '✅' : '❌'} Report saved: ${reportPath}`);
}
