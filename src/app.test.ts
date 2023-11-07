//Una opción sería está comentada y la otra sería realizar un mock del ServerApp
// process.argv = ['node', 'app.ts', '-b', '10'];
// import "./app";

import { ServerApp } from "./presentation/server-app";

describe('Testing app.ts', () => { 
    
    test('should call Server.run with values', async() => {
        
        const serverRunMock = jest.fn();
        ServerApp.run = serverRunMock;
        process.argv = ['node', 'app.ts', '-b', '10', '-l', '5', '-s', '-n', 'test-file', '-d', 'test-destination'];

        await import("./app");

        //Al importar el app se esta ejecutando la función main
        //y estamos utilizando el yarg que se encuentra en el app.ts
        //y se llama al run del ServerApp con los valores que se encuentran en el yarg

        expect( serverRunMock ).toHaveBeenCalledWith({
              base: 10,
              limit: 5,
              showTable: true,
              fileName: 'test-file',
              fileDestination: 'test-destination' 
            });
    });

 });