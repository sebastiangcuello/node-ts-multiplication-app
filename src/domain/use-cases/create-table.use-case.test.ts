import { CreateTable, CreateTableOptions } from './create-table.use-case';


describe('Testing create-table.use-case.test', () => { 
    
    //Create test than should create table with default values
    test('should create table with default values', () => {
        
        const options: CreateTableOptions = {
            base: 2
        };

        const base:number = options.base;
        const limit:number = options.limit??10;

        const createTable = new CreateTable();

        const table = createTable.execute( options );
        const rows = table.split('\n').length;
        
        expect( createTable ).toBeInstanceOf( CreateTable );

        for ( let i = 1; i <= limit; i++ ) {
            expect( table ).toContain(`${base} x ${i} = ${base * i}`);
        }
        expect( rows ).toBe(limit);       
    });

    test('should create table with custom values', () => {

        const options: CreateTableOptions = {
            base: 3,
            limit: 20
        };

        const base:number = options.base;
        const limit:number = options.limit??10;

        const createTable = new CreateTable();

        const table = createTable.execute( options );
        const rows = table.split('\n').length;
        
        for ( let i = 1; i <= limit; i++ ) {
            expect( table ).toContain(`${base} x ${i} = ${base * i}`);
        }
        expect( rows ).toBe(limit);   

    });

 });