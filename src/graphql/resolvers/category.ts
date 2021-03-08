import { IResolvers } from 'graphql-tools';

const categoryResolver: IResolvers = {
    Query: {
        helloCat(): string {
            return "Works!"
        }
    }
}

export default categoryResolver;