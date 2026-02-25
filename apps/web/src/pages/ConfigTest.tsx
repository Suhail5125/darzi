import { useEffect, useState } from 'react';
import { verifyConfig, type ConfigVerification } from '@darzi/shared-utils';

/**
 * Configuration Test Page
 * 
 * This page verifies that environment variables are being read correctly
 * by the config module from @darzi/shared-utils.
 * 
 * To test:
 * 1. Run in development mode: npm run dev:web
 * 2. Navigate to /config-test
 * 3. Verify that VITE_API_URL and VITE_ENV are displayed correctly
 * 4. Build for production: npm run build:web
 * 5. Verify production values are used
 */
export function ConfigTest() {
  const [verification, setVerification] = useState<ConfigVerification | null>(null);

  useEffect(() => {
    const result = verifyConfig();
    setVerification(result);
    console.log('Config Verification:', result);
  }, []);

  if (!verification) {
    return <div className="p-8">Loading configuration...</div>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Environment Configuration Test</h1>
      
      <div className={`p-4 rounded-lg mb-6 ${verification.success ? 'bg-green-100 border border-green-400' : 'bg-red-100 border border-red-400'}`}>
        <h2 className="text-xl font-semibold mb-2">
          {verification.success ? '✅ Configuration Loaded Successfully' : '❌ Configuration Failed'}
        </h2>
        <p className="text-sm">Platform: <strong>{verification.platform}</strong></p>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">Messages</h2>
        <ul className="list-disc list-inside space-y-1">
          {verification.messages.map((msg: string, idx: number) => (
            <li key={idx} className="text-sm">{msg}</li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">Configuration Values</h2>
        <div className="bg-gray-100 p-4 rounded-lg">
          <pre className="text-sm">{JSON.stringify(verification.config, null, 2)}</pre>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">Environment Variables</h2>
        <div className="bg-gray-100 p-4 rounded-lg">
          <pre className="text-sm">{JSON.stringify(verification.config, null, 2)}</pre>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-300 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Testing Instructions:</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>Development mode should show values from <code>.env.development</code></li>
          <li>Production build should show values from <code>.env.production</code></li>
          <li>Verify API URL and environment match expected values</li>
          <li>Check console for detailed verification output</li>
        </ol>
      </div>
    </div>
  );
}
