import { CustomError } from "@/utils/custom-error";
import axios from "axios";

interface Params {
  id: string;
}

export async function deleteProductOnAIService({ id }: Params) {
  try {
    const res = await axios.post(`${process.env.AI_API_ADDRESS}/delete`, {
      product_id: id,
    });

    return {
      status: 200,
    };
  } catch (error) {
    throw new CustomError(500, "Failed to delete product on AI", "P5002");
  }
}
