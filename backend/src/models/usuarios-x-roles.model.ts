import {Entity, model, property} from '@loopback/repository';

@model()
export class UsuariosXRoles extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  userId?: string;

  @property({
    type: 'string',
  })
  roleId?: string;

  constructor(data?: Partial<UsuariosXRoles>) {
    super(data);
  }
}

export interface UsuariosXRolesRelations {
  // describe navigational properties here
}

export type UsuariosXRolesWithRelations = UsuariosXRoles & UsuariosXRolesRelations;
