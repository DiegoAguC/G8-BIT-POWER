import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {UsuariosXRoles, UsuariosXRolesRelations} from '../models';

export class UsuariosXRolesRepository extends DefaultCrudRepository<
  UsuariosXRoles,
  typeof UsuariosXRoles.prototype.id,
  UsuariosXRolesRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(UsuariosXRoles, dataSource);
  }
}
