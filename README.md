KaazingAngular
==============

Simple sample to show Kaazing integration with angular.js, developed by Prashant Khanal (pkhanal), software engineer at Kaazing.

1. Download Kaazing WebSocket Gateway JMS Edition (tested with version 4.0.6.): http://developer.kaazing.com/downloads/ and extract its contents.
2. Copy (recursively) the JavaScript client libraries to a directory, accessible to the Web apps. Copy <GATEWAY_HOME>/lib/client/javascript to <GATEWAY_HOME>web/extras/lib/client/javascript
3. Create directory for Web app in <GATEWAY_HOME>/web/extras, for example: angular, and clone repo into this directory.
4. Start up the server components (Kaazing WebSocket Gateway, message broker (e.g.: Apache ActiveMQ), and stock demo data feed):
   - <code>$> <GATEWAY_HOME>/bin/gateway.start</code>
   - <code>$> <ACTIVEMQ_HOME>/bin/activemq console</code>
   - <code>$> <GATEWAY_HOME>/bin/demo-services.start</code>
5. Point your browser to: http://localhost:8001/angular
6. Click Connect > Fetch Stocks
