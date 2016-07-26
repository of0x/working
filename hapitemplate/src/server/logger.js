'use strict';

const Stringify = require('fast-safe-stringify');
const Moment = require('moment');

/* $lab:coverage:off$ */
module.exports.register = function( server, options, next ) {

	console.log( 'Plugin.Logger.register...' );

    server.on( 'log', _onLog );
    server.on( 'request', __log );
    server.on( 'request-internal', __log );
    server.on( 'request-error', _onRequestError );
    server.on( 'response', _onResponse );
    server.on( 'tail', _onTail );

	return next();
};

module.exports.register.attributes = {
	name: 'logger'
};

//
// http://hapijs.com/api#server-events
// http://hapijs.com/api#internal-events
// http://hapijs.com/api#request-logs
// http://hapijs.com/api#server-logs
// http://hapijs.com/api#request-object
//
/*
event = {
    timestamp,
    request,
    server,
    tags,
    data,
    internal
};
*/

function _onLog(event, tags) {

    //console.log( 'log \x1b[32m', event, tags, '\x1b[0m' );

    __log( null, event, tags );
}

function _onRequestError( request, error ) {
    //
    // emitted whenever an Internal Server Error (500) error response is sent.
    // Note that this event is emitted only if the error response is sent to the client.
    // If the error is replaced with a different response before it is sent to the client, no event is emitted.
    // Single event per request.
    //
    //console.log( 'request-error \x1b[33m', error, '\x1b[0m' );

    var event = {
        request: request.id,
        timestamp: Date.now(),
        tags: [ 'request-error' ],
        data: error,
        internal: true
    };

    __log( null, event, { 'request-error': true } );
}

function _onResponse( request ) {
    //
    // emitted after the response is sent back to the client (or when the client connection closed and no response sent, in which case request.response is null).
    // Single event per request.
    //
}

function _onTail( request ) {
    //
    // emitted when a request finished processing, including any registered tails. Single event per request.
    //
    var timestamp = Date.now();

    var event = {
        request: request.id,
        timestamp: timestamp,
        tags: [ 'tail' ],
        data: {
            statusCode: request.raw.res.statusCode,
            responseTime: timestamp - request.info.received
        },
        internal: true
    };

    __log( request, event, { tail: true } );
}

function __log( request, event, tags )  {
    if( tags.handler || tags.response )
        return;

   var buffer = [
       '[' + event.tags + ']',
       event.request || 0,
       Moment(parseInt(event.timestamp, 10)).utc().format('YYMMDD/HHmmss.SSS')    ];

    if( tags.received ) {
        var cookie = request.headers && request.headers.cookie ? request.headers.cookie : '';
        buffer.push(
            event.data.method,
            event.data.url,
            request.info.host,
            request.info.hostname,
            request.info.referrer,
            request.info.remoteAddress,
            request.info.remotePort,
            event.data.agent,
            cookie
        );
    }
    else if( tags.tail ) {
        buffer.push(
            event.data.statusCode,
            '(' + event.data.responseTime + 'ms)'
        );
    }
    else {
        buffer.push( Stringify(event.data) );
    }

    console.log( buffer.join('\t') );
}
/* $lab:coverage:on$ */
