export interface GlobalVariableItem {
    id: string;
    data: Record<string, any>;
}

export interface GlobalData {
    variables: GlobalVariableItem[];
}

// Module-level cache for the active fetch promise
let globalVariablesPromise: Promise<GlobalData> | null = null;

// Module-level cache for the resolved data
let globalVariablesCache: GlobalData | null = null;

export const loadGlobalVariables = async (): Promise<GlobalData | null> => {
    // Return synchronous cache if available
    if (globalVariablesCache) {
        return globalVariablesCache;
    }

    // Check if we're in documentation environment (docs pages)
    // This is a simple check - you can refine this based on your routing
    const isDocsEnvironment = typeof window !== 'undefined' && 
        (window.location.pathname.includes('/docs/') || 
         window.location.hostname.includes('localhost') || 
         process.env.NODE_ENV === 'development');

    if (isDocsEnvironment) {
        // Return mock data for documentation
        const mockData: GlobalData = {
            variables: [
                {
                    id: 'globals',
                    data: {
                        siteName: { value: 'My Awesome Site' },
                        companyName: { value: 'Acme Inc.' },
                        siteEmail: { value: 'contact@example.com' },
                        phoneNumber: { value: '+1 (555) 123-4567' },
                        address: { value: '123 Main St, City, State' }
                    }
                }
            ]
        };
        globalVariablesCache = mockData;
        return mockData;
    }

    // Reuse existing promise if fetch is in progress
    if (globalVariablesPromise) {
        return globalVariablesPromise;
    }

    // Initialize new fetch
    globalVariablesPromise = fetch('/api/cms/globals/load')
        .then(async (res) => {
            if (res.status === 404) {
                return null;
            }
            if (!res.ok) {
                throw new Error('Failed to load globals');
            }
            return res.json();
        })
        .then((data) => {
            if (data && !Array.isArray(data.variables)) {
                throw new Error('Invalid globals response format');
            }
            globalVariablesCache = data;
            return data;
        })
        .catch((err) => {
            // Clear promise on error so we can retry
            globalVariablesPromise = null;
            throw err;
        });

    return globalVariablesPromise;
};
