import { BaseResourceModel } from './../shared/models/base-resource.model';

export class Sprint extends BaseResourceModel {
    constructor(
        public id?: number,
        public nome?: string,
        public idOs?: number,
        public impedimento?: string,
        public prazo?: number,
        public dataInicio?: any,
        public dataTermino?: any,
        public idStatus?: number,
        public qtdPontosFuncao?: number
    ) {
        super();
        this.idStatus = 2;
    }

    static fromJson(jsonData: any): Sprint {
        return Object.assign(new Sprint(), jsonData);
    }
}
