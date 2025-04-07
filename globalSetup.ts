// globalSetup.ts
import { clearAccessibilityReportsDirectory } from './src/utils/accessibility-utils';

async function globalSetup() {
  console.log('🔁 Running global setup...');
  clearAccessibilityReportsDirectory();
}

export default globalSetup;