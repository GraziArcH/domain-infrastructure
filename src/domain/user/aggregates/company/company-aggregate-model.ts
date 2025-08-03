import { type IEntityModel, IdValueObject } from '@/domain/shared'
import { CNPJValueObject, CompanyLegalNameValueObject, CompanyNameValueObject, CompanyUrlValueObject } from '@/domain/user'
import { type CompanyDTO } from './company-dtos'

export class CompanyAggregateModel implements IEntityModel<CompanyDTO> {
  private constructor (
    public readonly companyId: IdValueObject,
    public readonly agentTypeId: IdValueObject,
    public readonly companyName: CompanyNameValueObject,
    public readonly companyLegalName: CompanyLegalNameValueObject,
    public readonly companyUrlName: CompanyUrlValueObject,
    public readonly cnpj: CNPJValueObject,
    public readonly active: boolean
  ) { }

  static create (
    {
      companyId,
      agentTypeId,
      companyName,
      companyLegalName,
      companyUrl,
      cnpj,
      active
    }: CompanyDTO
  ): CompanyAggregateModel {
    const companyIdOrError = IdValueObject.create(companyId)
    const agentTypeIdOrError = IdValueObject.create(agentTypeId)
    const companyNameOrError = CompanyNameValueObject.create(companyName)
    const companyLegalNameOrError = CompanyLegalNameValueObject.create(companyLegalName)
    const companyUrlOrError = CompanyUrlValueObject.create(companyUrl)
    const cnpjOrError = CNPJValueObject.create(cnpj)

    return new CompanyAggregateModel(
      companyIdOrError,
      agentTypeIdOrError,
      companyNameOrError,
      companyLegalNameOrError,
      companyUrlOrError,
      cnpjOrError,
      active
    )
  }

  getValues (): CompanyDTO {
    return {
      companyId: this.companyId.value,
      agentTypeId: this.agentTypeId.value,
      companyName: this.companyName.value,
      companyLegalName: this.companyLegalName.value,
      companyUrl: this.companyUrlName.value,
      cnpj: this.cnpj.value,
      active: this.active
    }
  }
}
