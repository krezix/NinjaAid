document.addEventListener('DOMContentLoaded', function() {
    const cookieConsentKey = 'user_cookie_consent';
    let userConsent = localStorage.getItem(cookieConsentKey);

    if (!userConsent) {
        showConsentBanner();
    } else {
        userConsent = JSON.parse(userConsent);
        applyUserConsents(userConsent);
    }

    function showConsentBanner() {
        const bannerHTML = `
            <div class="cookie-consent-container bg-dark text-white p-3" style="position: fixed; bottom: 0; left: 0; right: 0; display: flex; justify-content: center; align-items: center; z-index: 1000;">
                <div class="text-center mr-3">
                    <p>We use cookies to improve your experience, analyze site traffic, and for marketing purposes. You can choose your preferences below.</p>
                    <button class="btn btn-primary mr-2" id="acceptAllCookies">Accept All</button>
                    <button class="btn btn-warning mr-2" id="customizeCookies">Customize</button>
                    <button class="btn btn-secondary" id="denyAllCookies">Deny All</button>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', bannerHTML);
        document.getElementById('acceptAllCookies').addEventListener('click', () => setConsent({ necessary: true, analytics: true, ads: true }));
        document.getElementById('customizeCookies').addEventListener('click', customizeConsent);
        document.getElementById('denyAllCookies').addEventListener('click', () => setConsent({ necessary: true, analytics: false, ads: false }));
    }

    function setConsent(consents) {
        localStorage.setItem(cookieConsentKey, JSON.stringify(consents));
        document.querySelector('.cookie-consent-container').remove();
        applyUserConsents(consents);
    }

    function customizeConsent() {
        const modalHTML = `
            <div class="modal fade" id="cookieConsentModal" tabindex="-1" aria-labelledby="cookieConsentModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="cookieConsentModalLabel">Cookie Preferences</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p>Choose which cookies you want to accept. Necessary cookies are always enabled for the website to function properly.</p>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="necessaryCookiesModal" checked disabled>
                                <label class="form-check-label" for="necessaryCookiesModal">
                                    Necessary Cookies
                                </label>
                                <small class="form-text text-muted">Essential for the website to function. Cannot be disabled.</small>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="analyticsCookiesModal" checked>
                                <label class="form-check-label" for="analyticsCookiesModal">
                                    Analytics Cookies
                                </label>
                                <small class="form-text text-muted">Helps understand visitor interactions with the website.</small>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="adsCookiesModal" checked>
                                <label class="form-check-label" for="adsCookiesModal">
                                    Advertising Cookies
                                </label>
                                <small class="form-text text-muted">Used to deliver advertisements and track ad campaign performance.</small>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" id="saveCookiePreferences">Save Preferences</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    
        // Initialize the Bootstrap modal
        const cookieConsentModal = new bootstrap.Modal(document.getElementById('cookieConsentModal'), {
            keyboard: false,
            backdrop: 'static'
        });
    
        cookieConsentModal.show();
    
        document.getElementById('saveCookiePreferences').addEventListener('click', () => {
            const analyticsConsent = document.getElementById('analyticsCookiesModal').checked;
            const adsConsent = document.getElementById('adsCookiesModal').checked;
    
            setConsent({ necessary: true, analytics: analyticsConsent, ads: adsConsent });
            cookieConsentModal.hide();
        });
    }
    

    function applyUserConsents(consents) {
        console.log('Applying user consents:', consents);
        // Here, integrate with your analytics, ads scripts based on user consents
        // Example:
        if (consents.analytics) {
            console.log('Initialize analytics scripts');
        }
        if (consents.ads) {
            console.log('Initialize ads scripts');
        }
    }
});
