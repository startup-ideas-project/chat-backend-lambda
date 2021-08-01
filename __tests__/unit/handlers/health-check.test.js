// Import all functions from health-check.js 
const lambda = require('../../../src/handlers/health-check.js'); 


describe('Test healthCheckHandler', function () { 
    // let putSpy; 
 
    // // Test one-time setup and teardown, see more in https://jestjs.io/docs/en/setup-teardown 
    // beforeAll(() => { 
    //     // Mock dynamodb get and put methods 
    //     // https://jestjs.io/docs/en/jest-object.html#jestspyonobject-methodname 
    //     putSpy = jest.spyOn(dynamodb.DocumentClient.prototype, 'put'); 
    // }); 
 
    // // Clean up mocks 
    // afterAll(() => { 
    //     putSpy.mockRestore(); 
    // }); 
 
    // This test invokes putItemHandler() and compare the result  
    it('should return 200', async () => {      

        const event = { 
            httpMethod: 'GET'
        }; 
        // Invoke putItemHandler() 
        const result = await lambda.healthCheckHandler(event); 
        const expectedResult = { 
            statusCode: 200
        }; 
 
        // Compare the result with the expected result 
        expect(result).toEqual(expectedResult); 
    }); 
}); 
 