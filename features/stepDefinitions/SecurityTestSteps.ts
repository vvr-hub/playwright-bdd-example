
import { Given, When, Then } from './fixtures';
import { getConfig } from '../../envConfig';
import { generateZapReport, getActiveScanStatus, getSpiderStatus, startZapActiveScan, startZapSpider } from '../../src/utils/zapHelper';

const { baseUrl } = getConfig();

Given('OWASP ZAP is running', async function () {
  console.log('✅ Ensure OWASP ZAP is running on localhost:8090');
});

When('I scan the website with ZAP', async function () {
  console.log(`🚀 Starting ZAP Spider for ${baseUrl}...`);
  const spiderId = await startZapSpider(baseUrl);

  let spiderStatus = '0';
  while (spiderStatus !== '100') {
    spiderStatus = await getSpiderStatus(spiderId);
    console.log(`🔄 Spider progress: ${spiderStatus}%`);
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }
  console.log('✅ Spider completed.');

  console.log(`🚀 Starting ZAP Active Scan for ${baseUrl}...`);
  const activeScanId = await startZapActiveScan(baseUrl);

  let activeScanStatus = '0';
  while (activeScanStatus !== '100') {
    activeScanStatus = await getActiveScanStatus(activeScanId);
    console.log(`🔄 Active Scan progress: ${activeScanStatus}%`);
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }
  console.log('✅ Active Scan completed.');
});

Then('a security report should be generated', async function () {
  console.log('📄 Generating OWASP ZAP Report...');
  await generateZapReport();
  console.log('✅ ZAP Security Report generated.');
});
