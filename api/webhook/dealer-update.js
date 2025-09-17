// api/webhook/dealer-update.js
import { contactCategories } from './ContactCategories.js';
import { odooCountries } from './OdooCountries.js';

// Simple in-memory storage for webhooks (resets when server restarts)
let webhookHistory = [];

function validatePayload(body) {
    const validations = {
        hasId: false,
        isPartnerModel: false,
        isDealerCategory: false,
        hasValidCity: false,
        hasValidCountry: false,
        hasValidStreet: false,
        hasValidZip: false
    };

    const errors = [];

    // Check _id
    if (body._id && typeof body._id === 'number') {
        validations.hasId = true;
    } else {
        errors.push('Missing or invalid _id');
    }

    // Check _model
    if (body._model === 'res.partner') {
        validations.isPartnerModel = true;
    } else {
        errors.push('_model is not res.partner');
    }

    // Check category_id for "Dealer"
    if (body.category_id && Array.isArray(body.category_id)) {
        const dealerCategory = contactCategories.find(cat => cat.category_name === 'Dealer');
        if (dealerCategory && body.category_id.includes(dealerCategory.category_id)) {
            validations.isDealerCategory = true;
        } else {
            errors.push('Contact is not categorized as Dealer');
        }
    } else {
        errors.push('Missing or invalid category_id');
    }

    // Check city
    if (body.city && typeof body.city === 'string' && body.city.trim().length > 0) {
        validations.hasValidCity = true;
    } else {
        errors.push('Missing or empty city');
    }

    // Check country_id
    if (body.country_id && typeof body.country_id === 'number') {
        const country = odooCountries.find(c => c.id === body.country_id);
        if (country) {
            validations.hasValidCountry = true;
        } else {
            errors.push(`Unknown country_id: ${body.country_id}`);
        }
    } else {
        errors.push('Missing or invalid country_id');
    }

    // Check street
    if (body.street && typeof body.street === 'string' && body.street.trim().length > 0) {
        validations.hasValidStreet = true;
    } else {
        errors.push('Missing or empty street');
    }

    // Check zip (5 digits, optional dash, optional additional digits)
    if (body.zip && typeof body.zip === 'string') {
        const zipRegex = /^\d{5}(-\d+)?$/;
        if (zipRegex.test(body.zip.trim())) {
            validations.hasValidZip = true;
        } else {
            errors.push('Invalid zip format (should be 5 digits, optionally followed by dash and more digits)');
        }
    } else {
        errors.push('Missing or invalid zip');
    }

    const isValid = Object.values(validations).every(v => v === true);

    return {
        isValid,
        validations,
        errors,
        summary: {
            passed: Object.values(validations).filter(v => v === true).length,
            total: Object.keys(validations).length
        }
    };
}

export default function handler(req, res) {
    const timestamp = new Date().toISOString();

    // Handle GET requests to view stored webhooks
    if (req.method === 'GET') {
        return res.status(200).json({
            message: 'Webhook History',
            totalReceived: webhookHistory.length,
            dataStats: {
                categoriesLoaded: contactCategories.length,
                countriesLoaded: odooCountries.length
            },
            webhooks: webhookHistory.slice(-10) // Show last 10 webhooks
        });
    }

    // Handle POST requests (actual webhooks from Odoo)
    if (req.method === 'POST') {
        // Validate the payload
        const validation = validatePayload(req.body);

        // Get country name for logging
        const countryName = req.body.country_id ?
            odooCountries.find(c => c.id === req.body.country_id)?.name || 'Unknown' :
            'Not provided';

        // Capture everything about this webhook
        const webhookData = {
            timestamp,
            validation,
            contactInfo: {
                id: req.body._id,
                city: req.body.city,
                country: countryName,
                street: req.body.street,
                zip: req.body.zip
            },
            headers: req.headers,
            body: req.body,
            method: req.method,
            url: req.url
        };

        // Store it in memory
        webhookHistory.push(webhookData);

        // Keep only the last 50 webhooks to avoid memory issues
        if (webhookHistory.length > 50) {
            webhookHistory = webhookHistory.slice(-50);
        }

        // Log to Vercel's console
        console.log('=== WEBHOOK RECEIVED ===');
        console.log('Time:', timestamp);
        console.log('Contact ID:', req.body._id);
        console.log('Address:', `${req.body.street}, ${req.body.city}, ${countryName} ${req.body.zip}`);
        console.log('Validation Result:', validation.isValid ? 'PASS' : 'FAIL');
        console.log('Validation Summary:', `${validation.summary.passed}/${validation.summary.total} checks passed`);

        if (!validation.isValid) {
            console.log('Validation Errors:', validation.errors);
        }

        console.log('Full Payload:', JSON.stringify(req.body, null, 2));
        console.log('========================');

        // Send response back to Odoo
        return res.status(200).json({
            status: validation.isValid ? 'success' : 'validation_failed',
            message: validation.isValid ?
                'Webhook received and validated successfully' :
                'Webhook received but validation failed',
            timestamp,
            validation: validation,
            contactInfo: webhookData.contactInfo,
            totalWebhooksReceived: webhookHistory.length
        });
    }

    // Handle other methods
    return res.status(405).json({
        error: `Method ${req.method} not allowed. Use POST to send webhook or GET to view history.`
    });
}
