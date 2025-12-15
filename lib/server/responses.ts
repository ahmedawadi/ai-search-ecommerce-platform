import { NextResponse } from "next/server";

interface Params {
  code?: string;
  message: string;
  status: number;
  data?: any;
}

export function getResponse(params: Params) {
  return NextResponse.json(
    {
      code: params.code || "",
      message: params.message,
      data: params.data || undefined,
    },
    { status: params.status }
  );
}

export const SuccessfulMessage = {
  creation: "Successful Creation!",
  extraction: "Successful Extraction!",
};

export const ErrorMessage = {
  serverError: "Server Error!",
};
