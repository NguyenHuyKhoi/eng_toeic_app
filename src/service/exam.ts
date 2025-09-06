import { IExam, IList } from "@model";
import apiClient from "./client";
import { ApiRequest } from "./interface";

const index = async (params: ApiRequest.exam.index): Promise<IList<IExam>> =>
  apiClient.get("/exams", { params });

const show = async (id: string): Promise<IExam> =>
  apiClient.get(`/exams/${id}`);

export default {
  index,
  show,
};
