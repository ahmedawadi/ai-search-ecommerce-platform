// /D:/Users/awedi/OneDrive/Desktop/FSS/I3Semestre1/mplops/project/E-commerce frontend/utils/custom-error.ts

export class CustomError extends Error {
  public status: number;
  public message: string;
  public code: string;

  constructor(status: number, message: string, code: string) {
    super(message);
    this.status = status;
    this.message = message;
    this.code = code;

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
