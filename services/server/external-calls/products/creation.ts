import { CustomError } from "@/utils/custom-error";
import axios from "axios";

interface Params {
  data: { productId: string; image: File };
}

export async function createProductOnAIService({ data }: Params) {
  const formData = new FormData();

  formData.append("product_id", data.productId);
  formData.append("image", data.image);

  try {
    console.log(`server: ${`${process.env.AI_API_ADDRESS}/ingest`}`);
    const res = await axios.post(
      `${process.env.AI_API_ADDRESS}/ingest`,
      formData
    );

    return {
      status: 200,
    };
  } catch (error) {
    console.log(error);
    throw new CustomError(500, "Failed to create product on AI", "P5001");
  }
}
