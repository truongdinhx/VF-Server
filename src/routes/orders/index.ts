import type { FastifyPluginAsync } from 'fastify';
import {
  allocateOrder,
  approveOrder,
  cancelOrder,
  completeOrder,
  createOrder,
  getOrder,
  issueOrder,
  listOrders,
  patchOrder,
  receiveOrder,
  rejectOrder,
  submitOrder,
  confirmOrderAllocation,
} from '../../controllers/orders';
import { PERMISSION_CODE } from '../../domain/permission-codes';
<<<<<<< HEAD
import { ORDER_READ_PERMISSIONS } from '../../domain/order-access';
=======
>>>>>>> 651c96fbcbcdf824a3d8556b93a2b29598ec5231
import { requirePermission, verifyToken } from '../../middleware/auth';
import {
  orderCreateSchema,
  orderListSchema,
  orderPatchSchema,
  allocationConfirmSchema,
  orderIssueSchema,
  orderSubmitSchema,
} from '../../schemas/orders';

const orderRoutes: FastifyPluginAsync = async (fastify) => {
  const ownerPermission = [
    verifyToken,
    requirePermission(PERMISSION_CODE.SUPPLY_ORDER_CREATE),
  ];
  const orderReadPermission = [
    verifyToken,
    requirePermission({
      anyOf: [
<<<<<<< HEAD
        ...ORDER_READ_PERMISSIONS,
=======
        PERMISSION_CODE.SUPPLY_ORDER_CREATE,
        PERMISSION_CODE.SUPPLY_ORDER_APPROVE,
>>>>>>> 651c96fbcbcdf824a3d8556b93a2b29598ec5231
      ],
    }),
  ];
  const orderReviewPermission = [
    verifyToken,
    requirePermission(PERMISSION_CODE.SUPPLY_ORDER_APPROVE),
  ];
  const orderIssuePermission = [
    verifyToken,
    requirePermission(PERMISSION_CODE.SUPPLY_ORDER_ISSUE),
  ];
<<<<<<< HEAD
  const orderAllocatePermission = [
    verifyToken,
    requirePermission(PERMISSION_CODE.SUPPLY_ORDER_ALLOCATE),
  ];
  const orderConfirmAllocationPermission = [
    verifyToken,
    requirePermission(PERMISSION_CODE.SUPPLY_ORDER_CONFIRM_ALLOCATION),
  ];
=======
>>>>>>> 651c96fbcbcdf824a3d8556b93a2b29598ec5231
  fastify.post(
    '/',
    { preHandler: ownerPermission, schema: orderCreateSchema },
    createOrder,
  );
  fastify.patch(
    '/:id',
    { preHandler: ownerPermission, schema: orderPatchSchema },
    patchOrder,
  );
  fastify.post(
    '/:id/submit',
<<<<<<< HEAD
    { preHandler: ownerPermission, schema: orderSubmitSchema },
=======
    { preHandler: ownerPermission },
>>>>>>> 651c96fbcbcdf824a3d8556b93a2b29598ec5231
    submitOrder,
  );
  fastify.get(
    '/',
    { preHandler: orderReadPermission, schema: orderListSchema },
    listOrders,
  );
  fastify.get('/:id', { preHandler: orderReadPermission }, getOrder);
  fastify.post(
    '/:id/approve',
    { preHandler: orderReviewPermission },
    approveOrder,
  );
  fastify.post(
    '/:id/reject',
    { preHandler: orderReviewPermission },
    rejectOrder,
  );
  fastify.post(
    '/:id/allocate',
    { preHandler: orderAllocatePermission },
    allocateOrder,
  );
  fastify.post(
    '/:id/allocations/:allocationId/confirm',
    {
      preHandler: orderConfirmAllocationPermission,
      schema: allocationConfirmSchema,
    },
    confirmOrderAllocation,
  );
  fastify.post(
    '/:id/issue',
<<<<<<< HEAD
    { preHandler: orderIssuePermission, schema: orderIssueSchema },
=======
    { preHandler: orderIssuePermission },
>>>>>>> 651c96fbcbcdf824a3d8556b93a2b29598ec5231
    issueOrder,
  );
  fastify.post(
    '/:id/receive',
    { preHandler: ownerPermission },
    receiveOrder,
  );
  fastify.post(
    '/:id/complete',
    { preHandler: orderIssuePermission },
    completeOrder,
  );
  fastify.post(
    '/:id/cancel',
    { preHandler: ownerPermission },
    cancelOrder,
  );
};

export default orderRoutes;
