const { spawnSync } = require('node:child_process');
const fs = require('node:fs');

const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx';

function run(command, args) {
  const result = spawnSync(command, args, {
    stdio: 'inherit',
    shell: false,
  });
  return result.status ?? 1;
}

// Start each run with a clean result set so the report represents this execution only.
for (const directory of ['allure-results', 'allure-report']) {
  fs.rmSync(directory, { recursive: true, force: true });
}

console.log('\n=== Running Playwright tests ===\n');
const testExitCode = run(npx, ['playwright', 'test']);

console.log('\n=== Generating Allure report ===\n');
const reportExitCode = run(npx, [
  'allure',
  'generate',
  'allure-results',
  '--clean',
  '-o',
  'allure-report',
]);

if (reportExitCode !== 0) {
  console.error('\nAllure report generation failed.\n');
  process.exit(testExitCode || reportExitCode);
}

console.log('\n=== Opening Allure report in the browser ===\n');
const openExitCode = run(npx, ['allure', 'open', 'allure-report']);

if (openExitCode !== 0) {
  console.error('\nAllure server could not be started.\n');
}

process.exit(testExitCode || openExitCode);
