KaazingAngular
==============

Simple sample to show Kaazing integration with angular.js, developed by Prashant Khanal (pkhanal), software engineer at Kaazing.

1. Download Kaazing WebSocket Gateway JMS Edition (tested with version 4.0.6.): http://developer.kaazing.com/downloads/ and extract its contents.
2. Copy (recursively) the JavaScript client libraries to a directory, accessible to the Web apps. Copy <code><GATEWAY_HOME>/lib/client/javascript</code> to <code><GATEWAY_HOME>web/extras/lib/client/javascript</code>
3. Create directory for Web app in <code><GATEWAY_HOME>/web/extras</code>, for example: <code>angular</code>, and clone repo into this directory.
4. Start up the server components (Kaazing WebSocket Gateway, message broker (e.g.: Apache ActiveMQ), and stock demo data feed):
   - <code>$> <GATEWAY_HOME>/bin/gateway.start</code>
   - <code>$> <ACTIVEMQ_HOME>/bin/activemq console</code>
   - <code>$> <GATEWAY_HOME>/bin/demo-services.start</code>
5. Point your browser to: http://localhost:8001/angular
6. Click the Connect button, then the Fetch Stocks button.
