import { IList, IQuestion } from "@model";
import { ApiRequest } from "./interface";
import apiClient from "./client";

const index = async (
  params: ApiRequest.question.index
): Promise<IList<IQuestion>> => apiClient.get("/questions", { params });

export default {
  index,
};
