var should = require('should');

var scenarioDocs = require('../lib/scenario_docs');


describe("Scenario Docs Test", function () {
    function givenFullScenario() {
        return {
            "scenario": "scenarioName",
            "description": "scenarioDescription",
            "request": {
                "method": "scenarioMethod",
                "urlPath": "scenarioUrlPath",
                "queryParameters": {
                    "queryParameterOne": "queryOne",
                    "queryParameterTwo": "queryTwo"
                },
                "headers": {
                    "headerOne": "headerValueOne",
                    "headerTwo": "headerValueTwo"
                },
                "body": {
                    "someReqBody": "someReqValueBody"
                }
            },
            "response": {
                "status": 9999,
                "statusMessage": "statusMessageValue",
                "jsonBody": {
                    "someRespBody": "someRespValueBody"
                }
            }
        }
    }

    function givenMinimalScenario() {
        return {
            "scenario": "scenarioName",
            "description": "scenarioDescription",
            "request": {
                "method": "scenarioMethod",
                "urlPath": "scenarioUrlPath"
            },
            "response": {
                "status": 9999,
                "statusMessage": "statusMessageValue",
                "jsonBody": {
                    "someRespBody": "someRespValueBody"
                }
            }
        }
    }
    
    describe("#buildScenariosDocs", function () {
        function givenFullScenarios(numScenarios) {
            var scenarios = [];
            for (var i = 0; i < numScenarios; i++) {
                var scenario = givenFullScenario();
                scenario.scenario = scenario.scenario + i;
                scenarios.push(scenario);
            }
            
            return scenarios;
        }
        
        it("documents each scenario", function() {
            var scenarios = givenFullScenarios(10);
            
            var docs = scenarioDocs.buildScenariosDocs(scenarios);
            
            for(var i = 0; i < 10; i++) {
                assertContainsSubstring(docs, "scenarioName" + i);
            }
        });
    });
    
    describe("#buildScenarioDoc", function() {
        it("contains scenario name", function() {
            var scenario = givenFullScenario();
            
            var doc = scenarioDocs.buildScenarioDoc(scenario);
            
            assertContainsSubstring(doc, 'scenarioName');
        });

        it("contains description", function() {
            var scenario = givenFullScenario();
            
            var doc = scenarioDocs.buildScenarioDoc(scenario);
            
            assertContainsSubstring(doc, 'scenarioDescription');
        });

        it("contains request method", function() {
            var scenario = givenFullScenario();
            
            var doc = scenarioDocs.buildScenarioDoc(scenario);
            
            assertContainsSubstring(doc, 'scenarioMethod');
        });

        it("contains request url path", function() {
            var scenario = givenFullScenario();
            
            var doc = scenarioDocs.buildScenarioDoc(scenario);
            
            assertContainsSubstring(doc, 'scenarioUrlPath');
        });

        it("contains headers when supplied", function() {
            var scenario = givenFullScenario();
            
            var doc = scenarioDocs.buildScenarioDoc(scenario);
            
            assertContainsSubstring(doc, '# Headers');
            assertContainsSubstring(doc, 'headerOne');
            assertContainsSubstring(doc, 'headerValueOne');
            assertContainsSubstring(doc, 'headerTwo');
            assertContainsSubstring(doc, 'headerValueTwo');
        });

        it("doesn't contain header title when not supplied", function() {
            var scenario = givenMinimalScenario();
            
            var doc = scenarioDocs.buildScenarioDoc(scenario);
            
            assertNotContainsSubstring(doc, '# Headers');
        });

        it("contains query parameters when supplied", function() {
            var scenario = givenFullScenario();
            
            var doc = scenarioDocs.buildScenarioDoc(scenario);
            
            assertContainsSubstring(doc, '# Query Parameters');
            assertContainsSubstring(doc, 'queryParameterOne');
            assertContainsSubstring(doc, 'queryOne');
            assertContainsSubstring(doc, 'queryParameterTwo');
            assertContainsSubstring(doc, 'queryTwo');
        });

        it("doesn't contain query parameter title when not supplied", function() {
            var scenario = givenMinimalScenario();
            
            var doc = scenarioDocs.buildScenarioDoc(scenario);
            
            assertNotContainsSubstring(doc, '# Query Parameters');
        });

        it("contains request body", function() {
            var scenario = givenFullScenario();
            
            var doc = scenarioDocs.buildScenarioDoc(scenario);
            
            assertContainsSubstring(doc, "someReqBody");
            assertContainsSubstring(doc, "someReqValueBody");
        });

        it("contains response status code", function() {
            var scenario = givenFullScenario();
            
            var doc = scenarioDocs.buildScenarioDoc(scenario);
            
            assertContainsSubstring(doc, '9999');
        });

        it("contains response status message", function() {
            var scenario = givenFullScenario();
            
            var doc = scenarioDocs.buildScenarioDoc(scenario);
            
            assertContainsSubstring(doc, 'statusMessageValue');
        });

        it("contains response body", function() {
            var scenario = givenFullScenario();
            
            var doc = scenarioDocs.buildScenarioDoc(scenario);
            
            assertContainsSubstring(doc, 'someRespBody');
            assertContainsSubstring(doc, 'someRespValueBody');
        });
    });

    function assertContainsSubstring(str, substr) {
        str.indexOf(substr).should.not.equal(-1, "expected '" + str + "' to contain '" + substr + "'");
    }

    function assertNotContainsSubstring(str, substr) {
        str.indexOf(substr).should.equal(-1, "expected '" + str + "' to not contain '" + substr + "'");
    }
});