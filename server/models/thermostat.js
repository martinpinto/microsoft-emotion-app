'use strict';

module.exports = function(Thermostat) {
    Thermostat.getByUser = function(userId, cb) {
        Thermostat.find({ where: { userId: userId } }, function(err, thermostats) {
            var response = thermostats;
            cb(null, response);
            console.log(response);
        });
    };
    
    Thermostat.remoteMethod(
        'getByUser',
        {
            http: { path: '/getByUser', verb: 'get' },
            accepts: { arg: 'id', type: 'number', http: { source: 'query' } },
            returns: { arg: 'thermostats', type: 'object' }
        }
    );

    Thermostat.getLatestByUser = function(userId, cb) {
        Thermostat.find({ where: { userId: userId}, limit: 1 }, function(err, thermostats) {
            if (typeof thermostats !== 'undefined') {
                var response = thermostats;
                cb(null, response);
                console.log(response);
            }
        });
    };
    
    Thermostat.remoteMethod(
        'getByUser',
        {
            http: { path: '/getLatestByUser', verb: 'get' },
            accepts: { arg: 'id', type: 'number', http: { source: 'query' } },
            returns: { arg: 'thermostat', type: 'object' }
        }
    );
};
