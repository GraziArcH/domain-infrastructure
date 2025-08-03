import {
  AgentTypeEntity,
  CompanyAggregate,
  InviteEntity,
  UserAggregate,
  UserEmailEntity,
  UserPhoneEntity,
  UserTypeEntity
} from '@/domain/user'
import { AuditEntity } from '@/domain/security'
import {
  DatabaseHelper,
  AgentTypeRepository,
  CompanyRepository,
  UserRepository,
  UnitOfWork,
  UserEmailRepository,
  UserPhoneRepository,
  AuditRepository,
  UserTypeRepository,
  InviteRepository
} from '../framework'
import { CompanyFacade, SecurityFacade, UserFacade } from '../facade'

// Framework
export const databaseUserHelper = new DatabaseHelper('user')
export const databaseProfileHelper = new DatabaseHelper('profile')
export const databaseSecurityHelper = new DatabaseHelper('security')
export const unitOfWork = (): UnitOfWork => new UnitOfWork(databaseUserHelper)

// User Domain
const agentRepository = new AgentTypeRepository(databaseUserHelper)
const companyRepository = new CompanyRepository(databaseUserHelper)
const userRepository = new UserRepository(databaseUserHelper)
const userEmailRepository = new UserEmailRepository(databaseUserHelper)
const userPhoneRepository = new UserPhoneRepository(databaseUserHelper)
const userTypeRepository = new UserTypeRepository(databaseUserHelper)
const inviteRepository = new InviteRepository(databaseUserHelper)

const agentTypeEntity = new AgentTypeEntity(agentRepository)
const userEmailEntity = new UserEmailEntity(userEmailRepository)
const userPhoneEntity = new UserPhoneEntity(userPhoneRepository)
const userTypeEntity = new UserTypeEntity(userTypeRepository)
const inviteEntity = new InviteEntity(inviteRepository)

const userAggregate = new UserAggregate(userEmailEntity, userPhoneEntity, userTypeEntity, inviteEntity, userRepository)
const companyAggregate = new CompanyAggregate(
  userAggregate,
  companyRepository,
  userRepository,
  agentTypeEntity,
  userEmailEntity,
  userPhoneEntity
)

export const userFacade = new UserFacade(
  userEmailEntity,
  userPhoneEntity,
  userRepository,
  userAggregate,
  userTypeEntity,
  inviteEntity,
  unitOfWork()
)
export const companyFacade = new CompanyFacade(
  companyAggregate,
  userAggregate,
  companyRepository,
  userRepository,
  agentTypeEntity,
  userEmailEntity,
  userPhoneEntity,
  unitOfWork()
)

// Security Domain
const auditRepository = new AuditRepository(databaseSecurityHelper)

const auditEntity = new AuditEntity(auditRepository)

export const securityFacade = new SecurityFacade(auditEntity)
