import { IResolvers } from 'graphql-tools';
import { prisma } from '../../prisma';

const taskResolver: IResolvers = {
    Query: {
        hello(): string {
            return "Works!"
        },
        async getTasks(): Promise<any> {
            try {
                const data = await prisma.task.findMany()

                if (!data) {
                    return "No Tasks"
                }

                return data
            } catch (error) {
                console.log(error);
                return "Error"
            }
        },
        async getTask(parent: void, args: any): Promise<any> {
            try {
                const data = await prisma.task.findUnique({
                    where: {
                        id: parseInt(args.id)    
                    }
                })

                if (!data) {
                    return "No Task With That Id"
                }

                return data
            } catch (error) {
                console.log(error);
                return "No Task With That Id"
            }
        }
    },
    Mutation: {
        async createTask(parent: void, args: any): Promise<any> {
            try {
                const { name, content, category } = args.data;
                await prisma.task.create({
                    data: {
                        name: name,
                        categoryId: category,
                        content: content
                    }
                });

                return "Task Created Successfully!"
            } catch (error) {
                console.log(error);
                return "Error"
            }
        },
    },
    Task: {
        async category(parent: any) {
            try {
                const data = await prisma.category.findUnique({
                    where: {
                        id: parent.categoryId
                    }
                })

                return data
            } catch (error) {
                return error
            }
        }
    }
}

export default taskResolver;