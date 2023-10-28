export class ErrorBase<T extends string> extends Error {
    name: T;
    message: string;
    cause: any;

    constructor({
        name,
        message,
        cause
    }: {
        name:T;
        message: string;
        cause?: any;
    }) {
        super();
        this.name = name;
        this.message = message;
        this.cause = cause;
    }

}

export class NotFoundError extends ErrorBase<string> {
    constructor(message: string){
      super(
        {name:'NOT_FOUND_ERROR', message}
      )
    }
}
  
export class EmptyInputError extends ErrorBase<string>{
    constructor(message:string){
        super(
            {name:'EMPTY_INPUT_ERROR',message}
        )
    }
}