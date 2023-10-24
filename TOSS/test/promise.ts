import {readFile} from 'fs'

readFile('./package.json', (err: Error | null, buffer: Buffer): void => {
    if(err) throw err
    else {
        const content: string = buffer.toString()
        console.log(content,13);
    }
})
console.log(12);