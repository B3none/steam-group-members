const https = require('https');
const parser = require('xml2js');

module.exports.getPageMembers = (url, page = 1) =>
    new Promise((resolve, reject) => {
        if (!url.includes('/memberslistxml/?xml=1')) {
            url += '/memberslistxml/?xml=1&p=' + page;
        }

        https.get(url, res => {
            let xml = '';

            if (res.statusCode >= 200 && res.statusCode < 400) {
                res.on('data', data => xml += data.toString());
                res.on('end', () => {
                    parser.parseString(xml, (err, result) => {
                        if (err === null) {
                            result = result.memberList;

                            resolve({
                                members: result.members.pop().steamID64,
                                meta: {
                                    totalPages: parseInt(result.totalPages.pop()),
                                    currentPage: parseInt(result.currentPage.pop())
                                }
                            });
                        }

                        reject(err);
                    });
                });
            }
        });
    });

module.exports.getMembers = url =>
    new Promise(async resolve => {
        let response = await this.getPageMembers(url, 1);
        let members = response.members;

        if (response.meta.totalPages >= 2) {
            for (let i = 2; i <= response.meta.totalPages; i++) {
                response = await this.getPageMembers(url, i);
                members = [...members, ...response.members]
            }
        }

        resolve(members);
    });

module.exports.findMember = (url, steamId) =>
    new Promise(async resolve => {
        let response = await this.getPageMembers(url, 1);

        if (response.members.includes(steamId)) {
            resolve(true);
        }

        if (response.meta.totalPages >= 2) {
            for (let i = 2; i <= response.meta.totalPages; i++) {
                response = await this.getPageMembers(url, i);
                if (response.members.includes(steamId)) {
                    resolve(true);
                }
            }
        }

        resolve(false);
    });