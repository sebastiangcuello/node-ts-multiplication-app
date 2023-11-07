

const runCommand = async ( args: string[] ) => {

    process.argv = [ ...process.argv, ...args ];

    const { yarg } = await import('./args.plugin');

    return yarg;
};

describe('Testing args.plugin.ts', () => { 

    const originalProcessArgv = process.argv;

    beforeEach(() => {
        process.argv = originalProcessArgv;
        jest.resetModules();
    });
    
    test('should return configuration with default values', async() => { 
        
        const argv = await runCommand(["-b", "5"]);
        
        // console.log(argv);

        //Con objectContaining podemos verificar que el objeto contenga las propiedades que le pasamos en el objeto
        expect(argv).toEqual( expect.objectContaining({
            b: 5,
            l: 10,
            s: false,
            d: './outputs',
            n: 'multiplication-table',
          }));
     });

         
    test('should return configuration with custom values', async() => { 
        
        const argv = await runCommand(["-b", "8", "-l", "20", "-s", "-n", "custom-name", "-d", "custom-dir"]);
        
        expect(argv).toEqual( expect.objectContaining({
            b: 8,
            l: 20,
            s: true,
            d: 'custom-dir',
            n: 'custom-name',
          }));
     });

 });