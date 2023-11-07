import { CreateTable } from '../domain/use-cases/create-table.use-case';
import { SaveFile } from '../domain/use-cases/save-file.use-case';
import { ServerApp } from './server-app';

describe('Testing Server-App', () => { 
    
    const options = {
        base           : 5,
        limit          : 10,
        showTable      : true,
        fileDestination: 'test-destination',
        fileName       : 'test-fileName',
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should create ServerApp instance', () => { 

        const serverApp = new ServerApp();
        expect(serverApp).toBeInstanceOf(ServerApp);
        expect( typeof ServerApp.run ).toBe('function');
     });

     test('should run ServerApp with options', () => { 

        const logSpy = jest.spyOn(console, 'log');
        
        //Esta es una forma de mockear una función de una clase
        const createTableSpy = jest.spyOn( CreateTable.prototype, 'execute' );
        const saveFileSpy = jest.spyOn( SaveFile.prototype, 'execute' );

        ServerApp.run(options);

        expect( logSpy ).toHaveBeenCalledTimes(4);
        expect( logSpy ).toHaveBeenCalledWith("ServerApp running...");
        expect( logSpy ).toHaveBeenCalledWith("File created successfully");

        expect( createTableSpy ).toHaveBeenCalledTimes(1);
        expect( createTableSpy ).toHaveBeenCalledWith({
            base: options.base,
            limit: options.limit
        });

        expect( saveFileSpy ).toHaveBeenCalledTimes(1);
        expect( saveFileSpy ).toHaveBeenCalledWith({
            fileContent: expect.any(String),
            fileDestination: options.fileDestination,
            fileName: options.fileName
        });

      });

      test('should run with custom values mocked', () => { 
        
        //Está es otra forma de mockear una función de una clase
        const logMock = jest.fn();
        const logMockError = jest.fn();
        //con mockreturnvalue podemos indicar el valor que queremos que retorne la función
        const createMock = jest.fn().mockReturnValue('5 x 1 = 5');
        const saveFile = jest.fn().mockReturnValue(true);

        console.log = logMock; 
        console.error = logMockError;
        CreateTable.prototype.execute = createMock;
        SaveFile.prototype.execute = saveFile;
        
        ServerApp.run(options);

        expect ( logMock ).toHaveBeenCalledWith("ServerApp running...");
        expect( createMock ).toHaveBeenCalledWith({
            "base": 5,
            "limit": 10
        });

        expect( saveFile ).toHaveBeenCalledWith({
            "fileContent": "5 x 1 = 5",
            "fileDestination": "test-destination",
            "fileName": "test-fileName"
        });

        expect( logMock ).toHaveBeenCalledWith("File created successfully");
        expect ( logMockError ).not.toHaveBeenCalled();
        




      });

 });