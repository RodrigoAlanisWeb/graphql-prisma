import { IResolvers } from 'graphql-tools';

const taskResolver: IResolvers = {
    Query: {
        hello(): string {
            return "Works!"
        }
    }
}

export default taskResolver;