import { Options, SaveFile } from './save-file.use-case';
import fs from 'fs';

describe('Testing save-file.use-case.ts', () => { 
    
    const customOptions: Options = {
        fileContent: 'custom content',
        fileDestination: 'custom-outputs',
        fileName: 'custon-table'
    };

    const customFilePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`;

    beforeEach( () => {
        jest.clearAllMocks(); //Este no limpia los mock implementation como el jest.spyOn

        //En ese caso hay que hacerlo manualmente en cada test luego de llamar al mockImplementation
        
    });

    afterEach( () => {
        //clean up     
        fs.existsSync('outputs') && fs.rmSync('outputs', { recursive: true });
        fs.existsSync('custom-outputs') && fs.rmSync('custom-outputs', { recursive: true });
    });

    test('Should save the file with default values', () => {

        const saveFile = new SaveFile();
        const options: Options = {
            fileContent: 'test',
            fileDestination: 'outputs',
            fileName: 'table'
        };
        const filePath = `${options.fileDestination}/${options.fileName}.txt`;

        const result = saveFile.execute(options);        
        const fileExists = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });

        expect(result).toBeTruthy();
        expect(fileExists).toBeTruthy();
        expect(fileContent).toBe(options.fileContent);
    });

    test('Should save the file with custom values', () => {

        const saveFile = new SaveFile();

        const result = saveFile.execute(customOptions);        
        const fileExists = fs.existsSync(customFilePath);
        const fileContent = fs.readFileSync(customFilePath, { encoding: 'utf-8' });

        expect(result).toBeTruthy();
        expect(fileExists).toBeTruthy();
        expect(fileContent).toBe(customOptions.fileContent);
    });

    test('should return false if directory could not be created', () => { 
        
        const saveFile = new SaveFile();
        const mkDirMock = jest.spyOn(fs, 'mkdirSync').mockImplementationOnce(
            () => { throw new Error('This is a custom error mkdirSync');
         });

         const result = saveFile.execute(customOptions);

         expect( result ).toBeFalsy();

         mkDirMock.mockRestore(); //Restauramos la implementacion original
         //Por lo que pude ver si en vez de utilizar mockImplementation utilizamos mockImplementationOnce
         //No es necesario restaurar la implementacion original ya que solo se ejecuta una vez

     });

     test('should return false if directory could not be created', () => { 
        
        const saveFile = new SaveFile();
        const writeFileMock = jest.spyOn(fs, 'writeFileSync').mockImplementationOnce(
            () => { throw new Error('This is a custom error writeFileSync');
         });

         const result = saveFile.execute({ fileContent: 'Test' });

         expect( result ).toBeFalsy();

         writeFileMock.mockRestore(); //Restauramos la implementacion original
     });

 });