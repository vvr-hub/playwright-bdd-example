// globalSetup.ts
import { clearAccessibilityReportsDirectory } from './src/utils/accessibilityUtils';

async function globalSetup() {
  console.log('🔁 Running global setup...');
  clearAccessibilityReportsDirectory();
}

export default globalSetup;