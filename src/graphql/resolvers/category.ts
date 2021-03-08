import { IResolvers } from 'graphql-tools';
import { prisma } from '../../prisma';

const categoryResolver: IResolvers = {
    Query: {
        helloCat(): string {
            return "Works!"
        },
        async getCategories(): Promise<any> {
            try {
                const data = await prisma.category.findMany()

                if (!data) {
                    return "No Categories"
                }

                return data
            } catch (error) {
                console.log(error);
                return "Error"
            }
        },
        async getCategory(parent: void, args: any): Promise<any> {
            try {
                const data = await prisma.category.findUnique({
                    where: {
                        id: parseInt(args.id)    
                    }
                })

                if (!data) {
                    return "No Category With That Id"
                }

                return data
            } catch (error) {
                console.log(error);
                return "No Category With That Id"
            }
        }
    },
    Mutation: {
        async createCategory(parent: void, args: any): Promise<string> {
            try {
                await prisma.category.create({
                    data: args.data
                });

                return "Created!";
            } catch (error) {
                console.log(error);
                return "Error";
            }
        }
    },
    Category: {
        async task(parent: any) {
            try {
                const data: any = await prisma.category.findUnique({
                    where: {
                        id: parent.id
                    },
                    include: {
                        Task: true
                    }
                })

                return data.Task;
            } catch (error) {
                console.log(error);
                return error
            }
        }
    }
}

export default categoryResolver;