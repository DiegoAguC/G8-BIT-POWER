import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  User,
  Management,
} from '../models';
import {UserRepository} from '../repositories';

export class UserManagementController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/management', {
    responses: {
      '200': {
        description: 'User has one Management',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Management),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Management>,
  ): Promise<Management> {
    return this.userRepository.management(id).get(filter);
  }

  @post('/users/{id}/management', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Management)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Management, {
            title: 'NewManagementInUser',
            exclude: ['id'],
            optional: ['managerId']
          }),
        },
      },
    }) management: Omit<Management, 'id'>,
  ): Promise<Management> {
    return this.userRepository.management(id).create(management);
  }

  @patch('/users/{id}/management', {
    responses: {
      '200': {
        description: 'User.Management PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Management, {partial: true}),
        },
      },
    })
    management: Partial<Management>,
    @param.query.object('where', getWhereSchemaFor(Management)) where?: Where<Management>,
  ): Promise<Count> {
    return this.userRepository.management(id).patch(management, where);
  }

  @del('/users/{id}/management', {
    responses: {
      '200': {
        description: 'User.Management DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Management)) where?: Where<Management>,
  ): Promise<Count> {
    return this.userRepository.management(id).delete(where);
  }
}
