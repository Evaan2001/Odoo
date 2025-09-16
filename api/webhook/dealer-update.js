// api/webhook/dealer-update.js

// Simple in-memory storage for webhooks (resets when server restarts)
let webhookHistory = [];

export default function handler(req, res) {
    const timestamp = new Date().toISOString();

    // Handle GET requests to view stored webhooks
    if (req.method === 'GET') {
        return res.status(200).json({
            message: 'Webhook History',
            totalReceived: webhookHistory.length,
            webhooks: webhookHistory.slice(-10) // Show last 10 webhooks
        });
    }

    // Handle POST requests (actual webhooks from Odoo)
    if (req.method === 'POST') {
        // Capture everything about this webhook
        const webhookData = {
            timestamp,
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

        // Log to Vercel's console (visible in deployment logs)
        console.log('=== WEBHOOK RECEIVED ===');
        console.log('Time:', timestamp);
        console.log('Payload:', JSON.stringify(req.body, null, 2));
        console.log('========================');

        // Send success response back to Odoo
        return res.status(200).json({
            status: 'success',
            message: 'Webhook received and logged',
            timestamp,
            totalWebhooksReceived: webhookHistory.length
        });
    }

    // Handle other methods
    return res.status(405).json({
        error: `Method ${req.method} not allowed. Use POST to send webhook or GET to view history.`
    });
}
