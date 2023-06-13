import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { dojoValidationSchema } from 'validationSchema/dojos';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getDojos();
    case 'POST':
      return createDojo();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getDojos() {
    const data = await prisma.dojo
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'dojo'));
    return res.status(200).json(data);
  }

  async function createDojo() {
    await dojoValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.class_schedule?.length > 0) {
      const create_class_schedule = body.class_schedule;
      body.class_schedule = {
        create: create_class_schedule,
      };
    } else {
      delete body.class_schedule;
    }
    if (body?.membership_plan?.length > 0) {
      const create_membership_plan = body.membership_plan;
      body.membership_plan = {
        create: create_membership_plan,
      };
    } else {
      delete body.membership_plan;
    }
    if (body?.technique?.length > 0) {
      const create_technique = body.technique;
      body.technique = {
        create: create_technique,
      };
    } else {
      delete body.technique;
    }
    const data = await prisma.dojo.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
