const https = require('https');
const parser = require('xml2js');

module.exports = {
    getMembers: (url, page = 1) => {
        let members = [];

        if (!url.includes('/memberslistxml/?xml=1')) {
            url += '/memberslistxml/?xml=1&p=' + page;
        }

        https.get(url, res => {
            let xml = '';

            if (res.statusCode >= 200 && res.statusCode < 400) {
                res.on('data', data => xml += data.toString());
                res.on('end', () => {
                    console.log('xml', xml);
                    parser.parseString(xml, (err, result) => {
                        console.log('FINISHED', err, result);


                    });
                });
            }
        });

        return [];
    },

    findMember: (url, steamId) => {

    }
};