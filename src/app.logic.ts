//Este archivo fue el primero que se creo, pero despues se creo el archivo app.ts
//en el cual se realizo un refactor de este código en diferentes carpetas/clases con una arquitectura limpia

import fs from 'fs';
import { yarg } from './config/plugins/args.plugin';

let outputMessage : string = '';
const { b:base, l:limit, s:showTable } = yarg;
const headerMessage = `
=================================
      Tabla del ${ base } 
=================================\n
`;

for ( let i = 1; i <= limit; i++ ) {
  outputMessage += `${ base } x ${i} = ${base * i}\n`;
}

// Save the message into output file
try {
  outputMessage = headerMessage + outputMessage;

  const outputPath = 'outputs/tables';

  // Create the output folder if it doesn't exist
  fs.mkdirSync(outputPath, { recursive: true });
  fs.writeFileSync(`${ outputPath }/tabla-${ base }.txt`, outputMessage);

  if( showTable ) console.log( outputMessage );

} catch (err) {
  console.error(err);
}