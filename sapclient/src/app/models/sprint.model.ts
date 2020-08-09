import { BaseResourceModel } from './../shared/models/base-resource.model';

export class Sprint extends BaseResourceModel {
    constructor(
        public id?: number,
        public nome?: string,
        public idOs?: number,
        public impedimento?: string,
        public prazo?: number,
        public dataInicio?: Date,
        public dataTermino?: Date,
        public idStatus?: number,
        public qtdPontosFuncao?: number
    ) {
        super();
    }

    static fromJson(jsonData: any): Sprint {
        return Object.assign(new Sprint(), jsonData);
    }
}
