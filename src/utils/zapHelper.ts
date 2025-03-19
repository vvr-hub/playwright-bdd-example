import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { getConfig, zapConfig } from '../../envConfig';

const { baseUrl } = getConfig();
const ZAP_API = zapConfig.apiUrl; // Use ZAP API URL from centralized config

export const startZapSpider = async (target: string = baseUrl) => {
    const response = await axios.get(`${ZAP_API}/JSON/spider/action/scan/`, {
        params: { url: target },
    });
    return response.data.scan;
};

export const getSpiderStatus = async (scanId: string) => {
    const response = await axios.get(`${ZAP_API}/JSON/spider/view/status/`, {
        params: { scanId },
    });
    return response.data.status;
};

export const startZapActiveScan = async (target: string = baseUrl) => {
    const response = await axios.get(`${ZAP_API}/JSON/ascan/action/scan/`, {
        params: { url: target },
    });
    return response.data.scan;
};

export const getActiveScanStatus = async (scanId: string) => {
    const response = await axios.get(`${ZAP_API}/JSON/ascan/view/status/`, {
        params: { scanId },
    });
    return response.data.status;
};

export const generateZapReport = async () => {
    try {
        // Ensure the report directory is created at the project root
        const reportDir = path.join(process.cwd(), 'zap-reports');
        const reportPath = path.join(reportDir, 'security-report.html');

        // Create the directory if it does not exist
        if (!fs.existsSync(reportDir)) {
            fs.mkdirSync(reportDir, { recursive: true });
            console.log(`📂 Created directory: ${reportDir}`);
        }

        // Fetch the report from ZAP (No API Key required)
        const response = await axios.get(`${ZAP_API}/OTHER/core/other/htmlreport/`, {
            responseType: 'text',
        });

        // Save the report
        fs.writeFileSync(reportPath, response.data);
        console.log(`✅ ZAP Security Report saved to: ${reportPath}`);
    } catch (error) {
        console.error('❌ Error generating ZAP report:', error.message);
    }
};
