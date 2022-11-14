import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Management,
  User,
} from '../models';
import {ManagementRepository} from '../repositories';

export class ManagementUserController {
  constructor(
    @repository(ManagementRepository)
    public managementRepository: ManagementRepository,
  ) { }

  @get('/managements/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Management',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.string('id') id: typeof Management.prototype.id,
  ): Promise<User> {
    return this.managementRepository.manager(id);
  }
}
