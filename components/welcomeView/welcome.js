'use strict';

angular.module('welcome.page', ['ngRoute'])
    
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/welcome', {
            templateUrl: 'components/welcomeView/welcome.html',
            controller: 'WelcomePageCtrl',
            controllerAs: 'welcome'
        });
    }])
    
    .factory('allCurrencies', ['$http', function($http) {
        return {
            get: function() {
                return $http.get('http://api.fixer.io/latest?base=PLN');
            }
        }
    }])
    
    .factory('prettyCurrencies', [function() {
        return {
            'AUD': 'AUD Australian Dollar',
            'BGN': 'BGN Bulgarian Lev',
            'BRL': 'BRL Brazilian Real',
            'CAD': 'CAD Canadian Dollar',
            'CHF': 'CHF Swiss Francs',
            'CNY': 'CNY Chinese Yuan',
            'ZK': 'ZK Zambian Kwacha',
            'DKK': 'DKK Danish Krone',
            'EUR': 'EUR Euro',
            'GBP': 'GBP British Pound',
            'HKD': 'HKD Hong Kong Dollar',
            'HRK': 'HRK Croatina Kuna',
            'HUF': 'HUF Hungarian Forint',
            'IDR': 'IDR Indonesian Rupiah',
            'ILS': 'ILS Israeli Shekel',
            'INR': 'INR Indian Rupee',
            'JPY': 'JPY Japanese Yen',
            'KRW': 'KRW South Korean Won',
            'MXN': 'MXN Mexican Peso',
            'MYR': 'MYR Malaysian Ringgit',
            'NOK': 'NOK Norwegian Krone',
            'NZD': 'NZD New Zealand Dollar',
            'PHP': 'PHP Philippine Peso',
            'RON': 'RON Romanian New Leu',
            'RUB': 'RUB Russian Ruble',
            'SEK': 'SEK Swedish Krona',
            'SGD': 'SGD Singapore Dollar',
            'THB': 'THB Thai Baht',
            'TRY': 'TRY Turkish Lira',
            'USD': 'USD US Dollar',
            'ZAR': 'ZAR South African Rand',
            'PLN': 'PLN Polish Zloty'
        }
    }])
    
    .controller('WelcomePageCtrl', ['$http', '$scope', 'allCurrencies', 'prettyCurrencies', function($http, $scope, allCurrencies, prettyCurrencies) {
        var self = this;
        self.conversionCurrencies = null;
        
        $scope.currencies = null, // all available currencies
            $scope.prettyCurrencies = prettyCurrencies, // show full name of a currency
            $scope.pretty = '',
            $scope.isPretty = false,
            $scope.amount = 1,
            $scope.result = 0,
            $scope.baseCurrency = '',
            $scope.targetCurrency = '';
        
        
        allCurrencies.get().then(function(response) {
            $scope.currencies = response.data.rates;
            $scope.currencies['PLN'] = 0; // add PLN convert option (not included automatically when base is set to PLN in the factory)
        });
        
        // handle conversion
        self.getConversion = function(base, target, amount) {
            if ($scope.pretty === 1) {
                base = base.substring(0,3);
                target = target.substring(0,3);
            }
            
            $http.get('http://api.fixer.io/latest?base=' + base).then(function(response) {
                self.conversionCurrencies = response.data.rates;
                $scope.result = (self.conversionCurrencies[target] * amount).toFixed(2);
            });
        }
        
        // display conversion
        self.convertCurrency = function() {
            if ($scope.baseCurrency.length > 0 && $scope.targetCurrency.length > 0) {
                if ($scope.baseCurrency === $scope.targetCurrency) {
                    $scope.result = $scope.amount;
                } else {
                    self.getConversion($scope.baseCurrency, $scope.targetCurrency, $scope.amount);
                }
            }
        };
        
        // switch between showing full name of a currency
        self.togglePretty = function() {
            if ($scope.pretty === 1) {
                $scope.isPretty = true;
            } else {
                $scope.isPretty = false;
            }
        }
    }]);



