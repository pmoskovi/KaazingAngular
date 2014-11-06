var app = angular.module("StocksReader",[]);

// service
app.factory('JMSMessagingService', function($rootScope){
	var service = {}, connection, session, consumers = {};

	service.connect = function(url, callback) {
		var connectionFactory = new JmsConnectionFactory(url);
		var connectionFuture = connectionFactory.createConnection(function(){
	    	connection = connectionFuture.getValue();
	    	session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);
	    	connection.start(callback);
	     });
	};

	service.subscribe = function(channelName, messageListener) {
		// assuming connection has already been established and started
		// ideally we need to maintain the state of the connection and throw error
		// if the controller calls subscribe before connection is established
		// or after the connection is closed
		var topic = session.createTopic(channelName);
    var consumer = session.createConsumer(topic);
    consumers[channelName] = consumer;
    consumer.setMessageListener(messageListener);
	};

	service.unsubscribe = function(channelName, callback) {
		var consumer = consumers[channelName];
		if (consumer) {
			delete consumers[channelName];
			consumer.close(callback);
		}
	};

	return service;

});

// controller
function StocksController($scope, messagingService) {
	$scope.stockList = {};
	$scope.connected = false;
	$scope.canFetchStocks = false;
	$scope.canPause = false;
	$scope.url = "ws://localhost:8001/jms"; // default value
	$scope.channel = "/topic/stock"; // jms topic, queue, or any other abstraction
	var messageListener = function(message) {
		var stockData = message.getText();
		var tokens = stockData.split(":");
		var id = tokens[1];
		var existingRecord = $scope.stockList[id];
		if (!existingRecord) {
			existingRecord = {};
			existingRecord.name = tokens[0];
			existingRecord.id = tokens[1];
			existingRecord.value = tokens[2];
			$scope.stockList[existingRecord.id] = existingRecord;
		}
		else {
			existingRecord.value = tokens[2];
		}
	  	$scope.$apply();
	};

	$scope.connect = function() {
	  messagingService.connect($scope.url, function(){
	  	$scope.connected = true;
	  	$scope.canFetchStocks = true;

	  	// if we modify model outside of angular context, then
	  	// we need to call $scope.$apply
	  	$scope.$apply();
	  });
	};

	$scope.fetchStocks = function() {
		$scope.canPause = true;
		$scope.canFetchStocks = false;
		messagingService.subscribe($scope.channel, messageListener);
	};

	$scope.pause = function() {
		messagingService.unsubscribe($scope.channel, function() {
			$scope.canPause = false;
			$scope.canFetchStocks = true;
			$scope.$apply();
		});
	};

}

// inject service to controller
StocksController.$inject = ['$scope', 'JMSMessagingService'];
