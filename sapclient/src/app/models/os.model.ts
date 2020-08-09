import { BaseResourceModel } from './../shared/models/base-resource.model';

export class Os extends BaseResourceModel {
    constructor(
        public id?: number,
        public nome?: string,
        public idProjeto?: number,
        public idSituacao?: number,
        public dataProximaEntrega?: Date,
        public qtdDefeitosCliente?: number,
        public qtdDefeitosInterno?: number,
        public dataEntrega?: Date,
        public qtdPontosFuncao?: number,
        public fabricas?: string
    ) {
        super();
    }

    static fromJson(jsonData: any): Os {
        return Object.assign(new Os(), jsonData);
    }
}
