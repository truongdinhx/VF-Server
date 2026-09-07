import type { FastifyPluginAsync } from 'fastify';
import { createMilkrunMasterHandlers } from '../../../controllers/milkrun-master-data';
import { PERMISSION_CODE } from '../../../domain/permission-codes';
<<<<<<< HEAD
import { requirePermission, verifyToken } from '../../../middleware/auth';
=======
import {
  requirePermission,
  requireSystemAdmin,
  verifyToken,
} from '../../../middleware/auth';
>>>>>>> 651c96fbcbcdf824a3d8556b93a2b29598ec5231
import {
  milkrunMasterIdSchema,
  milkrunTripTypeCreateSchema,
  milkrunTripTypeListSchema,
  milkrunTripTypeUpdateSchema,
} from '../../../schemas/milkrun-master-data';

const routes: FastifyPluginAsync = async (fastify) => {
  const handlers = createMilkrunMasterHandlers('trip_types');
<<<<<<< HEAD
  const read = [verifyToken, requirePermission(PERMISSION_CODE.MILKRUN_TRIP_TYPE_READ)];
  const create = [verifyToken, requirePermission(PERMISSION_CODE.MILKRUN_TRIP_TYPE_CREATE)];
  const update = [verifyToken, requirePermission(PERMISSION_CODE.MILKRUN_TRIP_TYPE_UPDATE)];
  const deactivate = [
    verifyToken,
    requirePermission(PERMISSION_CODE.MILKRUN_TRIP_TYPE_DEACTIVATE),
=======
  const read = [
    verifyToken,
    requirePermission({ anyOf: [
      PERMISSION_CODE.MILKRUN_TRIP_READ_OWN,
      PERMISSION_CODE.MILKRUN_TRIP_READ_ALL,
      PERMISSION_CODE.MILKRUN_TRIP_CREATE,
    ] }),
  ];
  const mutate = [
    verifyToken,
    requirePermission(PERMISSION_CODE.MILKRUN_TRIP_CREATE),
    requireSystemAdmin,
>>>>>>> 651c96fbcbcdf824a3d8556b93a2b29598ec5231
  ];

  fastify.get('/', { preHandler: read, schema: milkrunTripTypeListSchema }, handlers.list);
  fastify.get('/:id', { preHandler: read, schema: milkrunMasterIdSchema }, handlers.get);
<<<<<<< HEAD
  fastify.post('/', { preHandler: create, schema: milkrunTripTypeCreateSchema }, handlers.create);
  fastify.patch('/:id', { preHandler: update, schema: milkrunTripTypeUpdateSchema }, handlers.update);
  fastify.patch(
    '/:id/deactivate',
    { preHandler: deactivate, schema: milkrunMasterIdSchema },
=======
  fastify.post('/', { preHandler: mutate, schema: milkrunTripTypeCreateSchema }, handlers.create);
  fastify.patch('/:id', { preHandler: mutate, schema: milkrunTripTypeUpdateSchema }, handlers.update);
  fastify.patch(
    '/:id/deactivate',
    { preHandler: mutate, schema: milkrunMasterIdSchema },
>>>>>>> 651c96fbcbcdf824a3d8556b93a2b29598ec5231
    handlers.deactivate,
  );
};

export default routes;
