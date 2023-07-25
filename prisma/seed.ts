import { hashPassword } from "./../lib/auth";
import { db } from "../lib/db";
// import { TASK_STATUS } from "@prisma/client";

const getRandomTaskStatus = () => {
  const statuses = [
    'NOT_STARTED',
    'STARTED',
    'COMPLETED'
  ];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

async function main() {
  const user = await db.user.create({
    data: {
      email: "user@email.com",
      firstName: "User",
      lastName: "Person",
      password: await hashPassword("password"),
      projects: {
        create: new Array(5).fill(1).map((_, i) => ({
          name: `Project ${i}`,
          due: new Date(2022, 11, 25),
        })),
      },
    },
    include: { projects: true },
  });

  const tasks = await Promise.all(
    user.projects.map((project: any) =>
      db.task.create({
        data: {
          name: `Task 1`,
          ownerId: user.id,
          projectId: project.id,
          description: `Everything that describes Task 1`,
          status: getRandomTaskStatus(),
        },
      })
    )
  );

  console.log({ user, tasks });
}
main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });