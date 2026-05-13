// Community Watch Crime Reporting System - Main JavaScript
// Database Connection and API Configuration

/**
 * Database Configuration
 * Update these settings based on your PostgreSQL setup
 */
const DB_CONFIG = {
    host: 'localhost',
    port: 5432,
    database: 'community_watch_db',
    user: 'your_db_user',
    password: 'your_db_password'
};

/**
 * API Endpoints Configuration
 * These endpoints should be implemented in your backend server
 */
const API_BASE_URL = 'http://localhost:3000/api';

const API_ENDPOINTS = {
    // Authentication
    login: `${API_BASE_URL}/auth/login`,
    register: `${API_BASE_URL}/auth/register`,
    logout: `${API_BASE_URL}/auth/logout`,

    // Citizens
    getCitizens: `${API_BASE_URL}/citizens`,
    getCitizenById: (id) => `${API_BASE_URL}/citizens/${id}`,
    updateCitizen: (id) => `${API_BASE_URL}/citizens/${id}`,

    // Staff
    getStaff: `${API_BASE_URL}/staff`,
    getStaffById: (id) => `${API_BASE_URL}/staff/${id}`,
    createStaff: `${API_BASE_URL}/staff`,
    updateStaff: (id) => `${API_BASE_URL}/staff/${id}`,
    deleteStaff: (id) => `${API_BASE_URL}/staff/${id}`,

    // Reports
    getReports: `${API_BASE_URL}/reports`,
    getReportById: (id) => `${API_BASE_URL}/reports/${id}`,
    createReport: `${API_BASE_URL}/reports`,
    updateReport: (id) => `${API_BASE_URL}/reports/${id}`,
    deleteReport: (id) => `${API_BASE_URL}/reports/${id}`,

    // Incident Types
    getIncidentTypes: `${API_BASE_URL}/incident-types`,

    // Authority Actions
    getActions: `${API_BASE_URL}/actions`,
    createAction: `${API_BASE_URL}/actions`,
    updateAction: (id) => `${API_BASE_URL}/actions/${id}`,

    // Report Resolutions
    getResolutions: `${API_BASE_URL}/resolutions`,
    createResolution: `${API_BASE_URL}/resolutions`,

    // Analytics
    getAnalytics: `${API_BASE_URL}/analytics`,
    getHotspots: `${API_BASE_URL}/analytics/hotspots`,

    // Media
    uploadMedia: `${API_BASE_URL}/media/upload`,
    getMedia: (reportId) => `${API_BASE_URL}/media/report/${reportId}`
};

/**
 * Validation Functions
 */
const Validation = {
    /**
     * Validate password strength
     * @param {string} password - Password to validate
     * @returns {object} - {valid: boolean, message: string}
     */
    validatePassword: (password) => {
        if (password.length < 8) {
            return { valid: false, message: 'Password must be at least 8 characters long' };
        }
        if (!/[A-Z]/.test(password)) {
            return { valid: false, message: 'Password must contain at least one uppercase letter' };
        }
        if (!/[a-z]/.test(password)) {
            return { valid: false, message: 'Password must contain at least one lowercase letter' };
        }
        if (!/[0-9]/.test(password)) {
            return { valid: false, message: 'Password must contain at least one number' };
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            return { valid: false, message: 'Password must contain at least one special character' };
        }
        return { valid: true, message: 'Strong password' };
    },

    /**
     * Validate Malaysian IC number format
     * @param {string} ic - IC number to validate
     * @returns {boolean} - True if valid, false otherwise
     */
    validateIC: (ic) => {
        const icPattern = /^\d{6}-\d{2}-\d{4}$/;
        return icPattern.test(ic);
    },

    /**
     * Validate Malaysian phone number
     * @param {string} phone - Phone number to validate
     * @returns {boolean} - True if valid, false otherwise
     */
    validatePhoneNumber: (phone) => {
        const phonePattern = /^01\d{8,9}$/;
        const formattedPhone = phone.replace(/-/g, '').replace(/\s/g, '');
        return phonePattern.test(formattedPhone);
    },

    /**
     * Validate email format
     * @param {string} email - Email to validate
     * @returns {boolean} - True if valid, false otherwise
     */
    validateEmail: (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }
};

/**
 * API Helper Functions
 */
const API = {
    /**
     * Generic API request handler
     * @param {string} url - API endpoint URL
     * @param {object} options - Fetch options
     * @returns {Promise} - API response
     */
    request: async (url, options = {}) => {
        try {
            const token = localStorage.getItem('authToken');
            const headers = {
                'Content-Type': 'application/json',
                ...options.headers
            };

            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const response = await fetch(url, {
                ...options,
                headers
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status} ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API Request Failed:', error);
            throw error;
        }
    },

    /**
     * GET request
     */
    get: (url) => API.request(url, { method: 'GET' }),

    /**
     * POST request
     */
    post: (url, data) => API.request(url, {
        method: 'POST',
        body: JSON.stringify(data)
    }),

    /**
     * PUT request
     */
    put: (url, data) => API.request(url, {
        method: 'PUT',
        body: JSON.stringify(data)
    }),

    /**
     * DELETE request
     */
    delete: (url) => API.request(url, { method: 'DELETE' })
};

/**
 * Authentication Functions
 */
const Auth = {
    /**
     * Login user
     * @param {string} email - User email
     * @param {string} password - User password
     * @param {string} userType - 'citizen' or 'staff'
     * @returns {Promise} - Login response
     */
    login: async (email, password, userType) => {
        const response = await API.post(API_ENDPOINTS.login, {
            email,
            password,
            userType
        });

        if (response.token) {
            localStorage.setItem('authToken', response.token);
            localStorage.setItem('userType', userType);
            localStorage.setItem('userId', response.userId);
        }

        return response;
    },

    /**
     * Register new citizen
     * @param {object} userData - User registration data
     * @returns {Promise} - Registration response
     */
    register: async (userData) => {
        return await API.post(API_ENDPOINTS.register, userData);
    },

    /**
     * Logout user
     */
    logout: () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userType');
        localStorage.removeItem('userId');
        window.location.href = '/login';
    },

    /**
     * Check if user is authenticated
     * @returns {boolean} - True if authenticated
     */
    isAuthenticated: () => {
        return !!localStorage.getItem('authToken');
    },

    /**
     * Get current user type
     * @returns {string|null} - User type or null
     */
    getUserType: () => {
        return localStorage.getItem('userType');
    }
};

/**
 * Report Functions
 */
const Reports = {
    /**
     * Create new report
     * @param {object} reportData - Report data
     * @returns {Promise} - Created report
     */
    create: async (reportData) => {
        return await API.post(API_ENDPOINTS.createReport, reportData);
    },

    /**
     * Get all reports
     * @returns {Promise} - Array of reports
     */
    getAll: async () => {
        return await API.get(API_ENDPOINTS.getReports);
    },

    /**
     * Get report by ID
     * @param {string} reportId - Report ID
     * @returns {Promise} - Report details
     */
    getById: async (reportId) => {
        return await API.get(API_ENDPOINTS.getReportById(reportId));
    },

    /**
     * Update report
     * @param {string} reportId - Report ID
     * @param {object} updateData - Update data
     * @returns {Promise} - Updated report
     */
    update: async (reportId, updateData) => {
        return await API.put(API_ENDPOINTS.updateReport(reportId), updateData);
    },

    /**
     * Delete report (Admin only)
     * @param {string} reportId - Report ID
     * @returns {Promise} - Delete confirmation
     */
    delete: async (reportId) => {
        return await API.delete(API_ENDPOINTS.deleteReport(reportId));
    }
};

/**
 * Staff Management Functions
 */
const Staff = {
    /**
     * Create new staff/authority
     * @param {object} staffData - Staff data
     * @returns {Promise} - Created staff
     */
    create: async (staffData) => {
        return await API.post(API_ENDPOINTS.createStaff, staffData);
    },

    /**
     * Get all staff
     * @returns {Promise} - Array of staff
     */
    getAll: async () => {
        return await API.get(API_ENDPOINTS.getStaff);
    },

    /**
     * Update staff
     * @param {string} staffId - Staff ID
     * @param {object} updateData - Update data
     * @returns {Promise} - Updated staff
     */
    update: async (staffId, updateData) => {
        return await API.put(API_ENDPOINTS.updateStaff(staffId), updateData);
    },

    /**
     * Delete staff
     * @param {string} staffId - Staff ID
     * @returns {Promise} - Delete confirmation
     */
    delete: async (staffId) => {
        return await API.delete(API_ENDPOINTS.deleteStaff(staffId));
    }
};

/**
 * Analytics Functions
 */
const Analytics = {
    /**
     * Get system analytics
     * @returns {Promise} - Analytics data
     */
    getAnalytics: async () => {
        return await API.get(API_ENDPOINTS.getAnalytics);
    },

    /**
     * Get incident hotspots
     * @returns {Promise} - Hotspot data
     */
    getHotspots: async () => {
        return await API.get(API_ENDPOINTS.getHotspots);
    }
};

/**
 * Initialize application
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('Community Watch Crime Reporting System - Ready');
    console.log('Database Schema: schema.sql');
    console.log('API Documentation: See API_ENDPOINTS object');
});

/**
 * Export for use in modules
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        DB_CONFIG,
        API_ENDPOINTS,
        Validation,
        API,
        Auth,
        Reports,
        Staff,
        Analytics
    };
}
