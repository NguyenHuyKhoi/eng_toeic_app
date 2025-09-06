/* eslint-disable @typescript-eslint/no-namespace */
export namespace ApiRequest {
  export namespace exam {
    export interface index extends ListRequest {
      year?: number;
    }
  }

  export namespace question {
    export interface index extends ListRequest {
      exam?: string;
      part?: number;
      parts?: number[];
    }
  }
}

export interface ListRequest {
  page?: number;
  per_page?: number;
  all?: boolean;
}
