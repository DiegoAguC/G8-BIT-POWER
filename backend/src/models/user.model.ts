import {Entity, model, property, hasMany, hasOne} from '@loopback/repository';
import {Role} from './role.model';
import {Property} from './property.model';
import {Management} from './management.model';
import {UsuariosXRoles} from './usuarios-x-roles.model';

@model()
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  firstName: string;

  @property({
    type: 'string',
  })
  secondName?: string;

  @property({
    type: 'string',
    required: true,
  })
  firstSurname: string;

  @property({
    type: 'string',
  })
  secondSurname?: string;

  @property({
    type: 'string',
    required: true,
  })
  documentType: string;

  @property({
    type: 'string',
    required: true,
  })
  documentNumber: string;

  @property({
    type: 'boolean',
  })
  sex?: boolean;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  phone: string;

  @property({
    type: 'string',
    required: true,
  })
  username: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'boolean',
    required: true,
  })
  state: boolean;


  // @property({
  @hasMany(() => Property)
  properties: Property[];

  @property({
    type: 'string',
  })
  propertyId?: string;

  @hasMany(() => Role, {through: {model: () => UsuariosXRoles}})
  roles: Role[];
  @hasOne(() => Management, {keyTo: 'managerId'})
  management: Management;
  //   type: 'string',
  //   required: true,
  // })
  // propertyId: string;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
