chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var scannerURL = 'https://www.virustotal.com/vtapi/v2/url/scan';
    var apikey =
        '9f2c02a95739f1d86a34e4786f021e494cc0ec2063dc8ad88f1c28c60bac8c58';

    var warning = document.getElementById('warning');

    var tab = tabs[0];
    var url = tab.url;

    function checkForPhishing(link) {
        warning.innerHTML = `<a href=${link} target="_blank">Проверить!</a>`;
    }

    const options = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            apikey: apikey,
            url: url,
        }),
    };

    fetch(scannerURL, options)
        .then((response) => response.json())
        .then((response) => checkForPhishing(response.permalink))
        .catch((err) => console.error(err));
});
