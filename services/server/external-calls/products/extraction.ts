import { CustomError } from "@/utils/custom-error";
import axios from "axios";

interface Params {
  image: File;
}

export async function getSimilarProductsFromAIService({ image }: Params) {
  const formData = new FormData();

  formData.append("image", image);

  try {
    const res = await axios.post(
      `${process.env.AI_API_ADDRESS}/search` as string,
      formData
    );

    return {
      status: 200,
      productsIds: res.data.product_ids as string[],
    };
  } catch (error) {
    throw new CustomError(500, "Failed to create product on AI", "P5001");
  }
}
