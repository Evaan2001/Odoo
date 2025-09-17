// api/webhook/dealer-update.js

// Contact categories data
const contactCategories = [
    { "category_id": 1, "category_name": "Dealer" },
    { "category_id": 2, "category_name": "Distributor" },
    { "category_id": 3, "category_name": "Vendor" },
    { "category_id": 4, "category_name": "Customer" },
    { "category_id": 5, "category_name": "Supplier" },
    { "category_id": 6, "category_name": "Partner" },
    { "category_id": 7, "category_name": "Prospect" },
    { "category_id": 8, "category_name": "Lead" },
    { "category_id": 9, "category_name": "Competitor" },
    { "category_id": 10, "category_name": "Reseller" },
    { "category_id": 11, "category_name": "Consultant" },
    { "category_id": 12, "category_name": "Motor vehicles" }
];

// Odoo countries data
const odooCountries = [
    { "id": 1, "name": "Andorra" },
    { "id": 2, "name": "United Arab Emirates" },
    { "id": 3, "name": "Afghanistan" },
    { "id": 4, "name": "Antigua and Barbuda" },
    { "id": 5, "name": "Anguilla" },
    { "id": 6, "name": "Albania" },
    { "id": 7, "name": "Armenia" },
    { "id": 8, "name": "Angola" },
    { "id": 9, "name": "Antarctica" },
    { "id": 10, "name": "Argentina" },
    { "id": 11, "name": "American Samoa" },
    { "id": 12, "name": "Austria" },
    { "id": 13, "name": "Australia" },
    { "id": 14, "name": "Aruba" },
    { "id": 15, "name": "Åland Islands" },
    { "id": 16, "name": "Azerbaijan" },
    { "id": 17, "name": "Bosnia and Herzegovina" },
    { "id": 18, "name": "Barbados" },
    { "id": 19, "name": "Bangladesh" },
    { "id": 20, "name": "Belgium" },
    { "id": 21, "name": "Burkina Faso" },
    { "id": 22, "name": "Bulgaria" },
    { "id": 23, "name": "Bahrain" },
    { "id": 24, "name": "Burundi" },
    { "id": 25, "name": "Benin" },
    { "id": 26, "name": "Saint Barthélemy" },
    { "id": 27, "name": "Bermuda" },
    { "id": 28, "name": "Brunei Darussalam" },
    { "id": 29, "name": "Bolivia" },
    { "id": 30, "name": "Bonaire, Sint Eustatius and Saba" },
    { "id": 31, "name": "Brazil" },
    { "id": 32, "name": "Bahamas" },
    { "id": 33, "name": "Bhutan" },
    { "id": 34, "name": "Bouvet Island" },
    { "id": 35, "name": "Botswana" },
    { "id": 36, "name": "Belarus" },
    { "id": 37, "name": "Belize" },
    { "id": 38, "name": "Canada" },
    { "id": 39, "name": "Cocos (Keeling) Islands" },
    { "id": 40, "name": "Congo, Democratic Republic of the" },
    { "id": 41, "name": "Central African Republic" },
    { "id": 42, "name": "Congo" },
    { "id": 43, "name": "Switzerland" },
    { "id": 44, "name": "Côte d'Ivoire" },
    { "id": 45, "name": "Cook Islands" },
    { "id": 46, "name": "Chile" },
    { "id": 47, "name": "Cameroon" },
    { "id": 48, "name": "China" },
    { "id": 49, "name": "Colombia" },
    { "id": 50, "name": "Costa Rica" },
    { "id": 51, "name": "Cuba" },
    { "id": 52, "name": "Cabo Verde" },
    { "id": 53, "name": "Curaçao" },
    { "id": 54, "name": "Christmas Island" },
    { "id": 55, "name": "Cyprus" },
    { "id": 56, "name": "Czech Republic" },
    { "id": 57, "name": "Germany" },
    { "id": 58, "name": "Djibouti" },
    { "id": 59, "name": "Denmark" },
    { "id": 60, "name": "Dominica" },
    { "id": 61, "name": "Dominican Republic" },
    { "id": 62, "name": "Algeria" },
    { "id": 63, "name": "Ecuador" },
    { "id": 64, "name": "Estonia" },
    { "id": 65, "name": "Egypt" },
    { "id": 66, "name": "Western Sahara" },
    { "id": 67, "name": "Eritrea" },
    { "id": 68, "name": "Spain" },
    { "id": 69, "name": "Ethiopia" },
    { "id": 70, "name": "Finland" },
    { "id": 71, "name": "Fiji" },
    { "id": 72, "name": "Falkland Islands (Malvinas)" },
    { "id": 73, "name": "Micronesia" },
    { "id": 74, "name": "Faroe Islands" },
    { "id": 75, "name": "France" },
    { "id": 76, "name": "Gabon" },
    { "id": 77, "name": "United Kingdom" },
    { "id": 78, "name": "Grenada" },
    { "id": 79, "name": "Georgia" },
    { "id": 80, "name": "French Guiana" },
    { "id": 81, "name": "Guernsey" },
    { "id": 82, "name": "Ghana" },
    { "id": 83, "name": "Gibraltar" },
    { "id": 84, "name": "Greenland" },
    { "id": 85, "name": "Gambia" },
    { "id": 86, "name": "Guinea" },
    { "id": 87, "name": "Guadeloupe" },
    { "id": 88, "name": "Equatorial Guinea" },
    { "id": 89, "name": "Greece" },
    { "id": 90, "name": "South Georgia and the South Sandwich Islands" },
    { "id": 91, "name": "Guatemala" },
    { "id": 92, "name": "Guam" },
    { "id": 93, "name": "Guinea-Bissau" },
    { "id": 94, "name": "Guyana" },
    { "id": 95, "name": "Hong Kong" },
    { "id": 96, "name": "Heard Island and McDonald Islands" },
    { "id": 97, "name": "Honduras" },
    { "id": 98, "name": "Croatia" },
    { "id": 99, "name": "Haiti" },
    { "id": 100, "name": "Hungary" },
    { "id": 101, "name": "Indonesia" },
    { "id": 102, "name": "Ireland" },
    { "id": 103, "name": "Israel" },
    { "id": 104, "name": "Isle of Man" },
    { "id": 105, "name": "India" },
    { "id": 106, "name": "British Indian Ocean Territory" },
    { "id": 107, "name": "Iraq" },
    { "id": 108, "name": "Iran" },
    { "id": 109, "name": "Iceland" },
    { "id": 110, "name": "Italy" },
    { "id": 111, "name": "Jersey" },
    { "id": 112, "name": "Jamaica" },
    { "id": 113, "name": "Jordan" },
    { "id": 114, "name": "Japan" },
    { "id": 115, "name": "Kenya" },
    { "id": 116, "name": "Kyrgyzstan" },
    { "id": 117, "name": "Cambodia" },
    { "id": 118, "name": "Kiribati" },
    { "id": 119, "name": "Comoros" },
    { "id": 120, "name": "Saint Kitts and Nevis" },
    { "id": 121, "name": "Korea, Democratic People's Republic of" },
    { "id": 122, "name": "Korea, Republic of" },
    { "id": 123, "name": "Kuwait" },
    { "id": 124, "name": "Cayman Islands" },
    { "id": 125, "name": "Kazakhstan" },
    { "id": 126, "name": "Lao People's Democratic Republic" },
    { "id": 127, "name": "Lebanon" },
    { "id": 128, "name": "Saint Lucia" },
    { "id": 129, "name": "Liechtenstein" },
    { "id": 130, "name": "Sri Lanka" },
    { "id": 131, "name": "Liberia" },
    { "id": 132, "name": "Lesotho" },
    { "id": 133, "name": "Lithuania" },
    { "id": 134, "name": "Luxembourg" },
    { "id": 135, "name": "Latvia" },
    { "id": 136, "name": "Libya" },
    { "id": 137, "name": "Morocco" },
    { "id": 138, "name": "Monaco" },
    { "id": 139, "name": "Moldova" },
    { "id": 140, "name": "Montenegro" },
    { "id": 141, "name": "Saint Martin (French part)" },
    { "id": 142, "name": "Madagascar" },
    { "id": 143, "name": "Marshall Islands" },
    { "id": 144, "name": "North Macedonia" },
    { "id": 145, "name": "Mali" },
    { "id": 146, "name": "Myanmar" },
    { "id": 147, "name": "Mongolia" },
    { "id": 148, "name": "Macao" },
    { "id": 149, "name": "Northern Mariana Islands" },
    { "id": 150, "name": "Martinique" },
    { "id": 151, "name": "Mauritania" },
    { "id": 152, "name": "Montserrat" },
    { "id": 153, "name": "Malta" },
    { "id": 154, "name": "Mauritius" },
    { "id": 155, "name": "Maldives" },
    { "id": 156, "name": "Malawi" },
    { "id": 157, "name": "Mexico" },
    { "id": 158, "name": "Malaysia" },
    { "id": 159, "name": "Mozambique" },
    { "id": 160, "name": "Namibia" },
    { "id": 161, "name": "New Caledonia" },
    { "id": 162, "name": "Niger" },
    { "id": 163, "name": "Norfolk Island" },
    { "id": 164, "name": "Nigeria" },
    { "id": 165, "name": "Nicaragua" },
    { "id": 166, "name": "Netherlands" },
    { "id": 167, "name": "Norway" },
    { "id": 168, "name": "Nepal" },
    { "id": 169, "name": "Nauru" },
    { "id": 170, "name": "Niue" },
    { "id": 171, "name": "New Zealand" },
    { "id": 172, "name": "Oman" },
    { "id": 173, "name": "Panama" },
    { "id": 174, "name": "Peru" },
    { "id": 175, "name": "French Polynesia" },
    { "id": 176, "name": "Papua New Guinea" },
    { "id": 177, "name": "Philippines" },
    { "id": 178, "name": "Pakistan" },
    { "id": 179, "name": "Poland" },
    { "id": 180, "name": "Saint Pierre and Miquelon" },
    { "id": 181, "name": "Pitcairn" },
    { "id": 182, "name": "Puerto Rico" },
    { "id": 183, "name": "Palestine, State of" },
    { "id": 184, "name": "Portugal" },
    { "id": 185, "name": "Palau" },
    { "id": 186, "name": "Paraguay" },
    { "id": 187, "name": "Qatar" },
    { "id": 188, "name": "Réunion" },
    { "id": 189, "name": "Romania" },
    { "id": 190, "name": "Serbia" },
    { "id": 191, "name": "Russian Federation" },
    { "id": 192, "name": "Rwanda" },
    { "id": 193, "name": "Saudi Arabia" },
    { "id": 194, "name": "Solomon Islands" },
    { "id": 195, "name": "Seychelles" },
    { "id": 196, "name": "Sudan" },
    { "id": 197, "name": "Sweden" },
    { "id": 198, "name": "Singapore" },
    { "id": 199, "name": "Saint Helena, Ascension and Tristan da Cunha" },
    { "id": 200, "name": "Slovenia" },
    { "id": 201, "name": "Svalbard and Jan Mayen" },
    { "id": 202, "name": "Slovakia" },
    { "id": 203, "name": "Sierra Leone" },
    { "id": 204, "name": "San Marino" },
    { "id": 205, "name": "Senegal" },
    { "id": 206, "name": "Somalia" },
    { "id": 207, "name": "Suriname" },
    { "id": 208, "name": "South Sudan" },
    { "id": 209, "name": "Sao Tome and Principe" },
    { "id": 210, "name": "El Salvador" },
    { "id": 211, "name": "Sint Maarten (Dutch part)" },
    { "id": 212, "name": "Syrian Arab Republic" },
    { "id": 213, "name": "Eswatini" },
    { "id": 214, "name": "Turks and Caicos Islands" },
    { "id": 215, "name": "Chad" },
    { "id": 216, "name": "French Southern Territories" },
    { "id": 217, "name": "Togo" },
    { "id": 218, "name": "Thailand" },
    { "id": 219, "name": "Tajikistan" },
    { "id": 220, "name": "Tokelau" },
    { "id": 221, "name": "Timor-Leste" },
    { "id": 222, "name": "Turkmenistan" },
    { "id": 223, "name": "Tunisia" },
    { "id": 224, "name": "Tonga" },
    { "id": 225, "name": "Turkey" },
    { "id": 226, "name": "Trinidad and Tobago" },
    { "id": 227, "name": "Tuvalu" },
    { "id": 228, "name": "Taiwan" },
    { "id": 229, "name": "Tanzania" },
    { "id": 230, "name": "Ukraine" },
    { "id": 231, "name": "Uganda" },
    { "id": 232, "name": "United States Minor Outlying Islands" },
    { "id": 233, "name": "United States" },
    { "id": 234, "name": "Uruguay" },
    { "id": 235, "name": "Uzbekistan" },
    { "id": 236, "name": "Holy See (Vatican City State)" },
    { "id": 237, "name": "Saint Vincent and the Grenadines" },
    { "id": 238, "name": "Venezuela" },
    { "id": 239, "name": "Virgin Islands, British" },
    { "id": 240, "name": "Virgin Islands, U.S." },
    { "id": 241, "name": "Viet Nam" },
    { "id": 242, "name": "Vanuatu" },
    { "id": 243, "name": "Wallis and Futuna" },
    { "id": 244, "name": "Samoa" },
    { "id": 245, "name": "Yemen" },
    { "id": 246, "name": "Mayotte" },
    { "id": 247, "name": "South Africa" },
    { "id": 248, "name": "Zambia" },
    { "id": 249, "name": "Zimbabwe" },
    { "id": 250, "name": "Kosovo" }
];

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

async function geocodeAddress(GOOGLE_MAPS_API_KEY, street, city, country, zip) {
    if (!GOOGLE_MAPS_API_KEY) {
        throw new Error('Google Maps API key not configured');
    }

    const address = `${street}, ${city}, ${country} ${zip}`;
    const encodedAddress = encodeURIComponent(address);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${GOOGLE_MAPS_API_KEY}`;

    console.log('Geocoding address:', address);

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === 'OK' && data.results && data.results.length > 0) {
            const location = data.results[0].geometry.location;
            console.log('Geocoding successful:', location);
            return {
                latitude: location.lat,
                longitude: location.lng,
                formatted_address: data.results[0].formatted_address
            };
        } else {
            throw new Error(`Geocoding failed: ${data.status} - ${data.error_message || 'Unknown error'}`);
        }
    } catch (error) {
        console.error('Geocoding error:', error.message);
        throw error;
    }
}

export default async function handler(req, res) {
    const timestamp = new Date().toISOString();
    const startTime = Date.now();

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

        // If validation passes, send POST request to secret endpoint
        let odooWebhookResult = null;
        let geocodingResult = null;
        if (validation.isValid) {
            const GOOGLE_MAPS_API_KEY = 'AIzaSyBez7bMMNmEmyK8Om2hIeirvDl0WYcP0Wo';
            const secretUrl = 'https://mid-city-engineering.odoo.com/web/hook/1714b37e-97c4-44bc-8796-8cc4f7938950'; // Replace with your actual URL
            try {
                // Geocode the address
                const countryName = odooCountries.find(c => c.id === req.body.country_id)?.name || '';
                geocodingResult = await geocodeAddress(
                    GOOGLE_MAPS_API_KEY,
                    req.body.street,
                    req.body.city,
                    countryName,
                    req.body.zip
                );

                // Calculate remaining wait time to ensure minimum 2 seconds total
                const elapsedTime = Date.now() - startTime;
                const remainingWaitTime = Math.max(0, 2000 - elapsedTime);

                if (remainingWaitTime > 0) {
                    console.log(`Waiting additional ${remainingWaitTime}ms to meet 2-second minimum`);
                    await new Promise(resolve => setTimeout(resolve, remainingWaitTime));
                }

                const postData = {
                    model: "res.partner",
                    id: req.body._id,
                    new_latitude: geocodingResult.latitude,
                    new_longitude: geocodingResult.longitude
                };

                console.log('Sending POST to Odoo web hook:', secretUrl);
                console.log('POST data:', JSON.stringify(postData, null, 2));

                const response = await fetch(secretUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(postData)
                });

                const responseText = await response.text();
                odooWebhookResult = {
                    status: response.status,
                    statusText: response.statusText,
                    body: responseText
                };

                console.log('Odoo webhook full response:', {
                    status: response.status,
                    headers: Object.fromEntries(response.headers.entries()),
                    body: responseText
                });

            } catch (error) {
                console.error('Failed to geocode or send POST to external API:', error.message);
                odooWebhookResult = {
                    error: error.message
                };

                // If geocoding failed, we might still want to wait the full 2 seconds
                const elapsedTime = Date.now() - startTime;
                const remainingWaitTime = Math.max(0, 2000 - elapsedTime);
                if (remainingWaitTime > 0) {
                    await new Promise(resolve => setTimeout(resolve, remainingWaitTime));
                }
            }
        }

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
            geocodingResult: geocodingResult, // Add this line
            odooWebhookResult: odooWebhookResult,
            totalWebhooksReceived: webhookHistory.length
        });
    }

    // Handle other methods
    return res.status(405).json({
        error: `Method ${req.method} not allowed. Use POST to send webhook or GET to view history.`
    });
}
