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
  products: {
    creation: {
      message: "Successful Products Creation!",
      status: 200,
    },
    extraction: {
      message: "Successful Products Creation!",
      status: 200,
    },
    deletion: {
      message: "Successful Product Deletion!",
      status: 200,
    },
  },
  categories: {
    creation: {
      message: "Successful Categories Creation!",
      status: 200,
    },
    extraction: {
      message: "Successful Categories Creation!",
      status: 200,
    },
  },
};

export const ErrorMessage = {
  serverError: {
    status: 500,
    message: "Server Error!",
    code: "",
  },
  creationFailedOnAIService: {
    status: 500,
    message: "AI Service Failed to create Product",
    code: "",
  },
  deletionFailedOnAIService: {
    status: 500,
    message: "AI Service Failed to delete Product",
    code: "",
  },
};
